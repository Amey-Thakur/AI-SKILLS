---
name: checkpointing-large-training
description: Checkpoint multi-node training runs so a save costs seconds instead of minutes and a resume reproduces the run exactly. Use when a job is large enough that a crash without a recent, verified checkpoint means losing hours of GPU time.
---

# Checkpointing large training

A checkpoint for a 70-billion-parameter run is hundreds of gigabytes spread
across every rank. Save it naively and each write stalls all GPUs for minutes
while they push through a shared filesystem, so people checkpoint rarely and
lose a whole shift of compute when one node dies. The method makes saves cheap
and resumes trustworthy.

## Method

1. **Shard the checkpoint, do not gather it.** Use PyTorch Distributed
   Checkpoint (DCP) or FSDP/DeepSpeed sharded save so each rank writes only its
   own parameter and optimizer shard. Gathering a 70B model to rank 0 needs
   over a terabyte of host RAM for fp32 weights plus Adam moments and serializes
   the write; sharded save spreads it across every rank and the full filesystem
   bandwidth at once.
2. **Flush asynchronously.** Copy each shard to pinned host memory on the GPU
   stream, then let a background thread write to storage while training resumes.
   torch DCP `async_save` and NeMo async checkpointing cut the GPU stall from
   minutes to a few seconds. Block the next save only until the previous flush
   completes.
3. **Set the cadence from the failure rate, not epochs.** Pick an interval where
   the expected lost work stays small: on a 512-GPU job, save every 15 to 30
   minutes. Persist step number, RNG state, dataloader position, and LR
   scheduler state, not just weights, or resume silently replays or skips data.
4. **Write atomically and keep a rolling window.** Write to a temp path and
   rename only after every rank reports success, so a crash mid-write never
   leaves a half-checkpoint that resume trusts. Retain the last two or three
   checkpoints plus periodic milestones and delete older shards before they
   fill the filesystem.
5. **Verify resume, do not assume it.** After a save, load into a fresh process
   and assert the loss on one fixed batch matches the pre-save value within
   floating-point tolerance. A resume that runs but diverges almost always means
   missing RNG or optimizer state.
6. **Separate the storage tiers.** Stage hot checkpoints to node-local NVMe or a
   parallel filesystem (Lustre, GPFS), then async-copy milestones to object
   storage (S3) for durability. Do not checkpoint straight to S3 on the hot
   path: its latency spikes stall the save.

## Checks

- Does a save stall the training step by under five seconds at your model size?
- Does resuming reproduce the loss curve, not merely start running again?
- If you `kill -9` a rank mid-save, does the previous checkpoint still load clean?
- Do checkpoints include RNG, dataloader offset, optimizer moments, and scheduler state?

## Boundaries

This covers saving and resuming the state of one run. It does not decide when to
abandon a run, nor orchestrate the relaunch after a node dies (see
fault-tolerant-training). Shard layout must match your parallelism: a checkpoint
saved under one FSDP or tensor-parallel topology needs a resharding pass to load
under another.

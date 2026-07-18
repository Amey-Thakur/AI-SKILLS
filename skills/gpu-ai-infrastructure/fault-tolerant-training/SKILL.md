---
name: fault-tolerant-training
description: Keep a long training job alive across GPU failures, node evictions, and stragglers so one bad host costs minutes, not the whole run. Use when a run spans enough GPUs and hours that hardware failure during the job is expected, not hypothetical.
---

# Fault-tolerant training

On a thousand GPUs for a week, something fails: an uncorrectable ECC error, an
NVLink drop, a preempted spot node. A rigid job treats any missing rank as fatal
and dies, and a human notices hours later. Fault tolerance turns most failures
into a short reconfigure-and-continue instead of a lost run.

## Method

1. **Run under an elastic launcher.** Use `torchrun` with `--max-restarts` and a
   c10d rendezvous, or TorchElastic or Ray Train, so when a worker dies the
   surviving ranks re-form the process group and resume from the last checkpoint
   instead of hanging. Set a rendezvous timeout near 600 seconds so a dead node
   is declared, not waited on forever.
2. **Detect hangs, do not block on them.** A stuck NCCL collective freezes every
   rank silently. Set `TORCH_NCCL_ASYNC_ERROR_HANDLING=1` and a collective
   timeout so a stall past the deadline raises instead of deadlocking, and run a
   heartbeat that kills the job if a rank goes quiet for several minutes.
3. **Handle stragglers before they dominate.** One GPU thermal-throttling to 70
   percent drags every all-reduce to its pace. Log per-rank step time and flag
   any rank more than 20 percent slower than the median. Cordon that node and
   let elastic training re-form without it rather than paying the tax each step.
4. **Keep spares warm for a fast reconfigure.** Hold a few idle nodes in the same
   rendezvous so a failed rank is replaced in seconds and the world size stays
   constant. Without spares, dropping ranks shrinks the global batch and quietly
   shifts the learning-rate schedule.
5. **Resume from a verified checkpoint, not the crash point.** On restart, load
   the latest checkpoint that passed its resume check (see
   checkpointing-large-training), restore dataloader offset and RNG, and reseed
   so you neither replay nor skip samples. Cap `--max-restarts` near five so a
   crash-looping job stops instead of burning GPU-hours.
6. **Quarantine bad hardware.** After a failure, read the DCGM or Xid error and
   drain the node from the scheduler pool. A GPU that threw an uncorrectable ECC
   fault or fell off the bus will fail again; keep a denylist so the launcher
   does not place ranks back onto it.

## Signals

- Does killing one node mid-run trigger an automatic resume within minutes, no one paged?
- Is per-rank step time logged, so you can name the straggler rather than just feel it?
- Does the run cap restarts and denylist hardware, so a flapping node cannot loop forever?
- After a reconfigure, are the global batch size and LR schedule unchanged?

## Boundaries

This keeps one run going across failures. It leans on a working checkpoint
system for the actual state (checkpointing-large-training) and on the cluster
scheduler for node allocation and eviction (gpu-cluster-scheduling). It does not
repair the failed hardware or tune the model itself.

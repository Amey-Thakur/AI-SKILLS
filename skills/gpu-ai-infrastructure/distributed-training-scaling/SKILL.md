---
name: distributed-training-scaling
description: Scale training from one GPU to many by moving through data parallel and sharded FSDP modes, overlapping communication with compute, and reading the efficiency curve to find the ceiling. Use when adding GPUs stops making training proportionally faster and you need to locate where the scaling leaks.
---

# Distributed training scaling

Adding GPUs is supposed to make training faster in proportion, and for a while it
does, until an all-reduce or a memory wall eats the gain and the eighth GPU buys
almost nothing. Scaling well means picking the right parallel mode for what does
not fit, hiding communication behind computation, and reading the efficiency
curve so you stop before you are paying for idle silicon.

## Method

1. **Begin with DistributedDataParallel and know its bill.** DDP replicates the
   model and all-reduces gradients each step; a ring all-reduce moves about
   2 x (N-1)/N times the gradient bytes per GPU. Bucketing gradients
   (`bucket_cap_mb` near 25) lets that traffic overlap the backward pass instead
   of waiting until it finishes.
2. **Shard state with FSDP once the replica stops fitting.** When parameters,
   gradients, and optimizer state no longer fit per GPU, move to sharding. ZeRO-1
   shards optimizer state, ZeRO-2 adds gradients, and ZeRO-3 or PyTorch FSDP
   shards parameters too, cutting per-GPU memory toward one over the world size at
   the cost of gathering weights on the fly.
3. **Overlap the gathers with compute, do not serialize them.** Turn on FSDP
   `forward_prefetch` and `backward_prefetch=BACKWARD_PRE` so the next layer's
   all-gather issues while the current layer computes. Without prefetch the GPU
   stalls on communication and the sharding saving turns into a slowdown.
4. **Raise the compute-to-communication ratio.** Communication scales with model
   size while compute scales with tokens per step, so grow the local batch or use
   gradient accumulation to do more math between syncs. Watch the global batch
   size, since enlarging it changes convergence and usually needs learning-rate
   scaling and warmup.
5. **Fit a bigger local batch with BF16 and activation checkpointing.** Mixed
   precision in BF16 halves activation and gradient bytes with a stable exponent
   range, and activation checkpointing trades recompute for memory. Both free room
   to push the local batch up, which refills the compute you use to hide comms.
6. **Read the scaling efficiency curve, not just total throughput.** Plot tokens
   per second per GPU against GPU count. Ideal is flat; a slide toward 0.8 or 0.7
   of the single-GPU rate means you have gone communication-bound. Chase the
   largest scale that still holds roughly 90 percent efficiency.
7. **Tune NCCL and confirm the fabric.** Run a bandwidth test, check that NVLink
   and InfiniBand deliver expected GB/s, and set NCCL knobs (`NCCL_ALGO`, buffer
   and channel counts) when the default underperforms. An all-reduce silently
   routed over PCIe is a common reason the curve sags early.

## Signals

- Does tokens/sec/GPU stay near 90 percent of the single-GPU rate at target scale?
- Is gradient or parameter traffic overlapping compute, not serialized after it?
- Did you switch to FSDP only after the replicated model actually stopped fitting?
- Was the learning rate rescaled when the global batch grew, so convergence held?

## Boundaries

This scales a model that fits on one GPU out to many. Splitting a model too large
for a single card with tensor, pipeline, or expert parallelism is
model-parallelism; surviving node failures and resuming long runs is
checkpointing-large-training and fault-tolerant-training. The numerically safe use
of BF16 and FP8 belongs to mixed-precision-deployment.

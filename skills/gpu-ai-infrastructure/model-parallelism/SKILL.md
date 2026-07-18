---
name: model-parallelism
description: Split a model that will not fit on one GPU across devices with tensor, pipeline, and expert parallelism, choosing each split by its communication cost. Use when weights or activations exceed a single card and you must shard without stalling on the interconnect.
---

# Model parallelism

When a model is too large for one GPU, you cut it apart, and every cut buys
communication. Tensor, pipeline, and expert parallelism split along different
axes, each with its own network cost and its own way of leaving GPUs idle. Choose
badly and the cards wait on an all-reduce or sit in a pipeline bubble, so the
decision is really about matching the split to your interconnect and batch shape.

## Method

1. **Compute the memory shortfall before choosing anything.** Weight bytes are
   roughly parameters times dtype bytes: a 70B model in FP16 wants about 140 GB
   and will not fit one 80 GB H100. For training, add optimizer state and
   activations. The gap sets the minimum GPU count ahead of any strategy.
2. **Keep tensor parallelism inside one fast domain.** Tensor parallelism
   (Megatron style) splits each matrix multiply across GPUs and all-reduces twice
   per layer, so it demands high bandwidth. Hold the tensor-parallel group within
   a single NVLink node, usually 8 GPUs, and never stretch it over InfiniBand.
3. **Use pipeline parallelism to cross node boundaries.** Pipeline parallelism
   assigns whole layer ranges to different GPUs and passes activations point to
   point, cheap enough for inter-node links. Its cost is the pipeline bubble: the
   idle time at the head and tail of every batch.
4. **Cut the bubble with more microbatches.** The bubble fraction is about
   (stages - 1) / microbatches. Four stages with four microbatches waste near 43
   percent; sixteen microbatches bring that under 20 percent. Raise the count
   until the bubble is small or activation memory runs out.
5. **Reach for expert parallelism only in a mixture-of-experts model.** MoE
   routes each token to a few experts, so you scatter experts across GPUs and pay
   an all-to-all to shuffle tokens. It grows parameter count without growing
   per-token compute, but the all-to-all is bursty and punishes routing
   imbalance.
6. **Factor the strategies as a grid, not a heap.** Real runs combine them:
   tensor parallel within a node, pipeline parallel across nodes, data parallel
   over the whole. Write the factorization out, for example TP=8, PP=4, DP=2 for
   64 GPUs, so the product equals your total device count exactly.
7. **Measure the interconnect before you trust the plan.** Run an NCCL bandwidth
   test and confirm NVLink and InfiniBand hit their expected GB/s. A tensor
   parallel group that accidentally crosses a PCIe hop instead of NVLink can halve
   throughput while looking correctly configured on paper.

## Litmus tests

- Does the tensor-parallel group stay inside one NVLink node?
- Is the microbatch count high enough to keep the pipeline bubble under 20 percent?
- Does TP times PP times DP equal your total GPU count exactly?
- Did an NCCL bandwidth test confirm each group runs over the link you assumed?

## Boundaries

This is about splitting one model across devices. Replicating a model that does
fit and overlapping gradient communication is distributed-training-scaling; sizing
and running a single serving replica is vllm-serving. The partition that is
optimal depends on your model shape and cluster topology, which is a matter of
measurement, not doctrine.

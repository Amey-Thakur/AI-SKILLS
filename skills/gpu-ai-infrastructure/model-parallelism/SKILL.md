---
name: model-parallelism
description: Split a model that will not fit on one GPU across devices using tensor, pipeline, and expert parallelism, and pick the split by its communication cost. Use when weights or activations exceed a single card and you must choose how to shard without stalling on interconnect.
---

# Model parallelism

When a model is too big for one GPU, you cut it apart, and every cut adds
communication. Tensor, pipeline, and expert parallelism each split along a
different axis with a different network cost and failure mode. Choosing badly
leaves GPUs idle waiting on an all-reduce or a pipeline bubble, so the decision
is really about matching the split to your interconnect and your batch shape.

## Method

1. **Compute the memory shortfall first.** Weights in bytes are roughly
   parameters times dtype bytes: a 70B model in FP16 needs about 140 GB, so it
   will not fit one 80 GB H100. Add optimizer state and activations for
   training. The gap tells you the minimum number of GPUs, before any strategy.
2. **Use tensor parallelism inside a fast domain.** Tensor parallelism (Megatron
   style) splits each matrix multiply across GPUs and all-reduces twice per
   layer, so it demands high bandwidth. Keep the tensor-parallel group inside
   one NVLink node (typically 8 GPUs); do not span it across slower InfiniBand
   between nodes.
3. **Use pipeline parallelism to cross node boundaries.** Pipeline parallelism
   assigns whole layer ranges to different GPUs and passes activations point to
   point, which is cheap enough for inter-node links. The cost is the pipeline
   bubble: idle time at the start and end of each batch.
4. **Shrink the pipeline bubble with more microbatches.** Bubble fraction is
   about (stages - 1) / microbatches. With 4 stages, 4 microbatches waste
   roughly 43 percent; 16 microbatches cut that near 16 percent. Raise
   microbatch count until the bubble is small or memory runs out.
5. **Reach for expert parallelism only with a mixture-of-experts model.** MoE
   routes each token to a few experts, so you place different experts on
   different GPUs and pay an all-to-all to shuffle tokens. It scales parameter
   count without scaling per-token compute, but the all-to-all is bursty and
   sensitive to routing imbalance.
6. **Compose the strategies as a grid, not a pile.** Real deployments combine
   them: tensor parallel within a node, pipeline parallel across nodes, data
   parallel over the whole thing. Write the factorization explicitly, for
   example TP=8, PP=4, DP=2 for 64 GPUs, so total GPUs equal the product.
7. **Profile the interconnect before trusting the plan.** Run an NCCL bandwidth
   test and confirm NVLink and InfiniBand deliver expected GB/s. A tensor
   parallel group accidentally crossing a PCIe hop, not NVLink, can halve
   throughput while looking correctly configured.

## Litmus tests

- Does the tensor-parallel group stay within one NVLink node?
- Is your microbatch count high enough that the pipeline bubble is under 20 percent?
- Do TP times PP times DP equal your total GPU count exactly?
- Did an NCCL bandwidth test confirm each parallel group runs over the link you assumed?

## Boundaries

This is about how to split one model across devices. Scaling replicas of a
fitting model and overlapping gradient communication is distributed-training-scaling;
sizing and running a single serving replica is vllm-serving. The exact
partition that is optimal depends on your model shape and cluster topology, which
is measurement, not doctrine.

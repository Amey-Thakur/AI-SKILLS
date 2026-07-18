---
name: inference-serving-optimization
description: Raise GPU throughput and hold tail latency for LLM serving by tuning batching, the KV cache, and paged attention against explicit SLOs. Use when a serving deployment misses its latency target or wastes GPU memory and you need to find the lever.
---

# Inference serving optimization

An idle GPU and a violated latency budget usually share one root cause: the
serving loop batches badly or spends its memory on the wrong thing. Optimizing
inference means trading throughput against tail latency deliberately, with the
key-value (KV) cache and the batch scheduler as your two main dials. Without a
method you tune one number, break another SLO, and never see the frontier.

## Method

1. **Write the SLO as two numbers before touching anything.** Fix a
   time-to-first-token (TTFT) target and a per-token latency target at a named
   percentile: for example TTFT p99 under 500 ms, inter-token p99 under 40 ms.
   Throughput is what you maximize subject to both, not a goal on its own.
2. **Separate prefill from decode.** Prefill is compute-bound and scales with
   prompt length; decode is memory-bandwidth-bound and scales with the KV cache.
   Measure them apart, because a fix for one often hurts the other. Chunked
   prefill caps how much prompt work preempts in-flight decodes.
3. **Size the KV cache in bytes, not tokens.** Per token, KV bytes equal
   2 x layers x kv_heads x head_dim x dtype_bytes. Multiply by max sequence
   length and concurrent sequences: that product, not the weights, is what
   fills a 80 GB H100 first at long context.
4. **Turn on paged attention so batches do not fragment memory.** Paged KV
   allocation in fixed blocks (vLLM's PagedAttention, typically 16 tokens per
   block) lets sequences of uneven length share the pool without reserving the
   worst case per slot. This is what makes large continuous batches fit.
5. **Prefer continuous batching over static batching.** Admit and evict
   sequences every decode step instead of waiting for a fixed batch to drain.
   This keeps the GPU full when requests have wildly different output lengths,
   which is the normal case for chat.
6. **Quantize the cache and weights only after profiling.** FP8 or INT8 KV
   cache roughly halves decode memory and lifts the concurrency ceiling; weight
   quantization (AWQ, GPTQ) frees room for more KV. Confirm quality on your eval
   set, since these trade accuracy for headroom.
7. **Push batch size up until the p99 SLO bends, then stop.** Plot latency
   percentiles against concurrency. Throughput rises then flattens while p99
   climbs: the last batch size that still meets both SLOs is your operating
   point.

## Litmus tests

- Can you state your TTFT and inter-token targets with a percentile attached?
- Do you know how many concurrent sequences your KV cache holds at max context?
- Under load, is GPU utilization above 80 percent while p99 stays in budget?
- Did a percentile-versus-concurrency plot, not a guess, pick your batch size?

## Boundaries

This is engine-level and scheduler-level tuning for a single serving replica.
Choosing vLLM versus another runtime and configuring it belongs to vllm-serving;
kernel and precision work on the model itself belongs to tensorrt-optimization.
Autoscaling replicas and routing across them is a cluster concern, not this one.

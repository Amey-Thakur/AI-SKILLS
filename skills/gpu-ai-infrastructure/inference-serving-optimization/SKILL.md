---
name: inference-serving-optimization
description: Tune LLM serving to hold latency SLOs while raising GPU throughput, working the batch scheduler, KV cache, and paged attention together. Use when a serving replica misses its latency target or leaves memory and utilization on the table.
---

# Inference serving optimization

A serving replica has two failure modes that trace back to the same place: the
GPU sits half idle, or tail latency blows past budget. Both come from how the
loop forms batches and how it spends memory on the key-value (KV) cache. The work
is to trade throughput against tail latency on purpose, one dial at a time,
instead of guessing and breaking a second target while fixing the first.

## Method

1. **Pin the SLO to two numbered percentiles.** State a time-to-first-token
   (TTFT) target and an inter-token latency target, each at a percentile: for
   example TTFT p99 under 500 ms, inter-token p99 under 40 ms. Throughput is the
   quantity you maximize under those two constraints, never a target on its own.
2. **Profile prefill and decode as separate phases.** Prefill is compute-bound
   and grows with prompt length; decode is memory-bandwidth-bound and grows with
   KV cache size. A change that helps one often hurts the other, so measure them
   apart. Chunked prefill caps how much a long prompt preempts live decodes.
3. **Budget the KV cache in bytes.** Per token, KV bytes are
   2 x layers x kv_heads x head_dim x dtype_bytes. Multiply by max sequence
   length and by concurrent sequences: at long context that product, not the
   weights, is what fills an 80 GB H100 and sets how many requests fit.
4. **Enable paged attention so uneven sequences share the pool.** Allocating the
   KV cache in fixed blocks (vLLM PagedAttention, commonly 16 tokens per block)
   removes the per-slot worst-case reservation that fragments memory. That is
   what lets a large continuous batch actually reside on the card.
5. **Run continuous batching, not static batches.** Admit and retire sequences
   every decode step rather than waiting for a fixed batch to drain. When output
   lengths vary widely, which is the normal case for chat, this keeps the GPU fed
   instead of stalling on the one request still generating.
6. **Quantize the cache only after you have profiled.** An FP8 or INT8 KV cache
   roughly halves decode memory and lifts the concurrency ceiling; AWQ or GPTQ
   weights free more room for KV. Confirm quality on your eval set first, since
   each trades a little accuracy for headroom.
7. **Ramp concurrency until p99 bends, then back off one step.** Plot latency
   percentiles against in-flight requests. Throughput climbs then flattens while
   p99 rises: the largest concurrency that still meets both SLOs is your
   operating point, and it came from the curve, not intuition.

## Litmus tests

- Can you name your TTFT and inter-token targets with a percentile attached?
- Do you know how many concurrent sequences the KV cache holds at max context?
- Under load, does GPU utilization clear 80 percent while p99 stays in budget?
- Did a percentile-versus-concurrency curve, not a hunch, set the batch size?

## Boundaries

This is scheduler-level and memory-level tuning of one serving replica. Picking
and configuring a specific runtime is vllm-serving; graph compilation and kernel
precision on the model itself is tensorrt-optimization. Autoscaling replicas and
routing traffic across them is a cluster concern this skill does not cover.

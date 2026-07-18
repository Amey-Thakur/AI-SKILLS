---
name: vllm-serving
description: Stand up an LLM behind vLLM with continuous batching, deliberate GPU memory planning, and multi-model hosting that stays within VRAM. Use when deploying a model on vLLM and deciding memory fraction, context length, parallelism, and how many models share a card.
---

# vLLM serving

vLLM gives you high throughput almost for free through PagedAttention and
continuous batching, but its defaults assume you want one model to eat the whole
GPU. The real work is memory planning: deciding how much VRAM goes to weights,
how much to the KV cache, and whether a second model can coexist. Get that wrong
and you either leave throughput on the table or crash on an out-of-memory error
mid-serve.

## Method

1. **Launch with the server, not the offline class, for production.** Run
   `vllm serve <model>` to get the OpenAI-compatible endpoint. Reserve the
   `LLM` Python class for batch scoring jobs where you control the whole input
   set up front.
2. **Set `--gpu-memory-utilization` on purpose.** The default 0.90 hands 90
   percent of the card to vLLM for weights plus KV cache. Lower it to 0.80 when
   another process shares the GPU; raise it toward 0.95 only on a dedicated card
   where nothing else allocates.
3. **Cap `--max-model-len` to what you actually serve.** vLLM pre-reserves KV
   space for the declared context. Declaring 128k when your traffic is 8k
   prompts starves the batch of concurrent slots. Set it to the real p99 of
   prompt plus completion length.
4. **Read the KV cache blocks that vLLM prints at startup.** The log reports GPU
   KV cache size and the number of blocks. That block count times the block size
   is your true concurrency budget: if it is small, cut context length or
   quantize before blaming the scheduler.
5. **Shard with tensor parallelism when weights do not fit one card.** Set
   `--tensor-parallel-size` to the GPU count (2, 4, 8) for a model larger than a
   single card's VRAM. Keep it at 1 when the model fits, since cross-GPU
   all-reduce adds latency you do not need.
6. **Host multiple small models by partitioning, not overcommitting.** Give each
   model its own process with a fixed `--gpu-memory-utilization` that sums under
   1.0 across the card, or route to separate cards. vLLM does not time-slice one
   process across unrelated models, so plan the split explicitly.
7. **Quantize to reclaim room for concurrency.** Load AWQ or GPTQ weights, or
   run FP8 on Hopper, to shrink the weight footprint and hand those bytes to the
   KV cache. Verify output quality on a held-out set before shipping.

## Checks

- Does the startup log show enough KV blocks for your target concurrency?
- Does declared `--max-model-len` match real traffic, not the model maximum?
- Across co-hosted models, do the memory-utilization fractions sum under 1.0?
- With tensor parallelism on, did throughput actually rise, not just spread?

## Boundaries

This covers running and sizing vLLM itself. Choosing batch size against a
latency SLO and the theory of KV sizing is inference-serving-optimization;
multi-node model sharding strategy is model-parallelism. For non-vLLM runtimes
or graph-compiled engines, see tensorrt-optimization and triton-inference-server.

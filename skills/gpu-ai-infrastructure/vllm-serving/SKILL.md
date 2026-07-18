---
name: vllm-serving
description: Deploy an LLM on vLLM with continuous batching, deliberate VRAM planning, and multi-model hosting that never overcommits the card. Use when serving on vLLM and deciding memory fraction, context length, tensor parallel size, and how many models share a GPU.
---

# vLLM serving

vLLM hands you high throughput almost for free through PagedAttention and
continuous batching, but its defaults assume one model owns the entire GPU. The
real decision is memory planning: how much VRAM goes to weights, how much to the
KV cache, and whether a second model can fit beside the first. Guess wrong and
you either strand throughput or hit an out-of-memory kill in the middle of
serving traffic.

## Method

1. **Serve through the OpenAI-compatible server for production.** Launch
   `vllm serve <model>` to expose the HTTP endpoint with continuous batching
   built in. Reserve the offline `LLM` class for batch scoring jobs where you
   hold the whole input set up front and need no always-on server.
2. **Choose `--gpu-memory-utilization` deliberately.** The 0.90 default gives
   vLLM 90 percent of the card for weights plus KV cache. Drop it to 0.80 when a
   sidecar process shares the GPU; push toward 0.95 only on a dedicated card
   where nothing else allocates, or the next allocation crashes the server.
3. **Cap `--max-model-len` to real traffic.** vLLM reserves KV space for the
   declared context up front. Declaring 128k when your p99 prompt-plus-completion
   is 8k starves the batch of concurrent slots. Set the length to what requests
   actually use, not the model's architectural maximum.
4. **Read the KV block count vLLM prints at startup.** The log reports GPU KV
   cache size and a number of blocks. Block count times block size is your true
   concurrency budget. If it is small, shorten context or quantize before you
   suspect the scheduler of the shortfall.
5. **Add tensor parallelism only when weights exceed one card.** Set
   `--tensor-parallel-size` to 2, 4, or 8 for a model too large for a single
   GPU's VRAM. Leave it at 1 when the model fits, since the per-layer all-reduce
   adds latency you gain nothing from paying.
6. **Host several small models by partition, not overcommit.** Give each model
   its own process with a fixed `--gpu-memory-utilization`, and make the
   fractions sum under 1.0 on a shared card, or route models to separate cards.
   One vLLM process does not time-slice across unrelated models, so split it up
   front.
7. **Quantize to buy back concurrency.** Load AWQ or GPTQ weights, or run FP8 on
   Hopper, to shrink the weight footprint and hand the reclaimed bytes to the KV
   cache. Verify output quality on a held-out set before the change ships.

## Checks

- Does the startup log show enough KV blocks for your target concurrency?
- Does `--max-model-len` track real traffic rather than the model maximum?
- Across co-hosted models, do the memory fractions sum to under 1.0?
- With tensor parallelism on, did throughput actually rise, not merely spread?

## Boundaries

This covers running and sizing vLLM itself. Setting batch size against a latency
SLO and the theory behind KV sizing is inference-serving-optimization; sharding a
model across nodes is model-parallelism. For graph-compiled engines or non-vLLM
runtimes, see tensorrt-optimization and triton-inference-server.

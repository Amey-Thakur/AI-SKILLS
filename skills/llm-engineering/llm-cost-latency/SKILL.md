---
name: llm-cost-latency
description: Cut LLM cost and latency with caching, model tiering, prompt diet, batching, and streaming UX. Use when the inference bill or response time needs engineering down.
---

# LLM cost latency

LLM cost is tokens times model price; latency is time-to-first-token
plus tokens times generation speed. Every optimization attacks one of
those four factors: send fewer tokens, generate fewer tokens, use a
cheaper model, or start visibly sooner.

## Method

1. **Measure per feature before optimizing.** Token counts
   (in/out separately: output usually costs several times
   input), cost and p50/p95 latency per feature and per
   request class (see llm-observability): the bill
   concentrates: one verbose feature is typically 60% of
   spend, and that is where the week of work goes (see
   cloud-cost-optimization's attribution ethic).
2. **Exploit prompt caching deliberately.** Stable prefixes
   (system prompt, tool definitions, few-shot examples)
   cached at the provider cut cost and time-to-first-token
   dramatically on the majors: structure prompts
   stable-first, variable-last (see
   context-window-management's partition: caching rewards
   the same layout), and verify cache hit rates in
   telemetry rather than assuming.
3. **Tier models by task difficulty.** Route each feature to
   the cheapest model that passes its eval bar (see
   llm-eval-design: the eval suite is what makes tiering
   safe): classification, extraction, and routing on small/
   fast models; generation and reasoning on the big ones;
   with an escalation path (small model's low-confidence or
   failed-validation cases retry on the larger: see
   ml-baselines' ladder logic). Re-run the tier decision at
   every provider price/model refresh: the frontier moves
   quarterly.
4. **Put every prompt on a diet.** Trim boilerplate and
   redundant instructions (each competes for attention
   anyway), cut few-shot examples to the minimum the evals
   require, summarize instead of pasting raw data (see
   context-window-management step 4), and cap output:
   ask for terse formats (IDs, not restated context),
   set max tokens, and instruct against preamble
   ("answer only"): output tokens are the expensive,
   slow ones.
5. **Batch the batchable.** Non-interactive work (labeling,
   enrichment, evals, digests) goes through batch APIs at
   half price with relaxed latency (see
   background-jobs' queue discipline); interactive traffic
   never waits behind it: separate the pools (see
   message-queues' latency-class separation).
6. **Engineer perceived latency.** Stream tokens to the UI
   (time-to-first-token becomes the felt latency),
   show progressive structure (see loading-states),
   parallelize independent calls, and pre-warm/speculate
   where flows are predictable (draft the likely next
   step while the user reads). Semantic caching (same
   question, cached answer) helps FAQ-shaped traffic;
   guard it with freshness and personalization keys
   (see caching-strategy, http-caching instincts).

## Boundaries

- Cost cuts that fail the eval gate are quality
  regressions wearing a smaller bill; every tiering and
  diet change runs the suite first (see llm-eval-design).
- Latency floors are physical: model size and output
  length dominate; when the product needs instant, the
  design answer may be a smaller task (classify then
  fetch) rather than a faster generation.
- Self-hosting for cost (see inference-serving-
  optimization, vllm-serving) trades bill for
  operational burden; run the managed-vs-selfhosted
  math with real utilization, not peak-hour dreams.

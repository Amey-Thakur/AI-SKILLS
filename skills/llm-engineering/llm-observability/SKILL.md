---
name: llm-observability
description: Instrument LLM applications with request tracing, token accounting, quality signals, and feedback loops. Use when running LLM features in production or debugging why quality or cost moved.
---

# LLM observability

LLM systems fail in ways logs of HTTP status codes never show: a 200
response can be wrong, ungrounded, or a jailbreak succeeding. The
instrumentation must capture the semantic layer, and it feeds
everything else: cost control, quality, drift, and the eval suite.

## Method

1. **Trace the full request, not just the call.** For each
   request capture: inputs, resolved prompt (post-templating
   and retrieval), retrieved chunks with scores, tool calls
   and their results, model and parameters, raw output, and
   the post-processed result: linked by a trace id across
   the whole chain (see distributed-tracing: same backbone,
   LLM spans). A trace you cannot replay is a bug you cannot
   reproduce.
2. **Account tokens and cost per request, sliced.** Input/
   output tokens (separately: output is the expensive one),
   cost, cache hit rate, and latency (time-to-first-token
   and total), by feature and request class (see
   llm-cost-latency): this dashboard is simultaneously the
   bill, the latency SLO, and the input to tiering
   decisions.
3. **Capture quality signals continuously.** Automated:
   validation pass/failure (see structured-output),
   groundedness/citation checks (see rag-pipeline), refusal
   and guardrail-trigger rates (see llm-guardrails),
   sampled LLM-judge scores on live traffic (see
   llm-eval-design). Human: thumbs, edits, regenerations,
   escalations to support: the strongest signal, because it
   is the user telling you it was wrong.
4. **Redact at the boundary, retain deliberately.** Traces
   contain user content and sometimes secrets: scrub PII at
   the logging layer (see pii-handling), set retention by
   policy (see data-retention), and gate replay access
   (see least-privilege). Observability must not become the
   data-breach vector or the compliance violation.
5. **Alert on the LLM-specific regressions.** New or spiking
   error/refusal patterns, cost-per-request anomalies (a
   prompt change that doubled tokens), latency-percentile
   breaches, groundedness dropping, and provider-side model
   updates shifting behavior (see drift-monitoring: the
   same early-warning architecture aimed at quality). Route
   to owners with the trace attached, not to a muted
   channel.
6. **Close the loop into the eval suite.** Mine flagged
   traces (thumbs-down, failed validation, escalations) into
   named eval cases (see llm-eval-design's regression loop):
   production is your richest source of the failures worth
   testing, and this pipeline is what turns incidents into
   permanent coverage. The dashboards diagnose; the eval set
   prevents recurrence.

## Boundaries

- Observability describes behavior; it does not judge
  correctness by itself: automated quality signals are
  proxies calibrated against humans (see llm-eval-design),
  and the human feedback is the ground truth they
  approximate.
- Sampling is necessary at scale (full LLM-judge on every
  request is its own cost center): sample representatively
  and oversample the tails (errors, high-cost, flagged).
- Vendor dashboards cover their slice (API calls); your
  application's semantic layer (retrieval, tools, post-
  processing, user outcomes) is yours to instrument, and
  it is where the interesting failures live.

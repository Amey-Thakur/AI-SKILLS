---
name: model-deployment
description: Ship models through batch, online, or edge patterns with shadow testing, gated rollouts, and rollback. Use when moving a model to production or designing the serving architecture.
---

# Model deployment

A model in production is software with an extra failure mode: it can be
healthy and wrong. Deployment therefore adds statistical gates (shadow,
canary against metrics) on top of ordinary release engineering.

## Method

1. **Choose the serving pattern by decision latency.** Batch scoring
   (nightly scores into a table) when decisions tolerate staleness:
   cheapest, testable like any pipeline (see data-pipeline-design).
   Online service (REST/gRPC) for request-time decisions, with p99
   latency and throughput budgets set before building. Edge/in-process
   for offline-capable or ultra-low-latency paths, paying in update
   latency and fleet fragmentation (see mobile-release-strategy).
2. **Package the whole prediction function.** Model weights plus
   preprocessing, feature transformations, and postprocessing ship as
   one versioned artifact from the registry (see experiment-tracking);
   a model served without its exact pipeline is training/serving skew
   by construction (see feature-engineering). Containerize with pinned
   dependencies; validate the artifact answers golden requests
   correctly in CI before any environment sees it.
3. **Shadow before serving.** Run the candidate on live traffic
   without acting on outputs: compare latency, error rate, prediction
   distribution vs incumbent, and (where labels arrive fast) accuracy.
   Shadow catches the engineering skew and distribution surprises
   offline evaluation cannot (see model-evaluation boundaries), at
   zero user risk.
4. **Roll out with statistical gates.** Canary a small traffic slice;
   gates are business guardrails and prediction-health metrics
   (see drift-monitoring), not just HTTP 200s; where the model's value
   claim matters, the canary is a real experiment (see
   ab-test-design). Expand on evidence; halt criteria numeric and
   pre-agreed (the mobile-release-strategy discipline, applied to
   models).
5. **Keep rollback one switch away.** Previous model version stays
   warm and loadable; rollback is a config flip, tested in drills, not
   a retraining project. Model versions are immutable and addressable;
   "we retrained over it" means you have no rollback (see
   rollback-strategy).
6. **Instrument the model-specific telemetry.** Log inputs (sampled,
   PII-scrubbed), predictions, scores, model version per request;
   dashboards on prediction distribution, feature nulls, latency by
   version. This telemetry is what drift-monitoring and incident
   debugging consume; without it the model is a black box that pages
   you in business metrics.

## Boundaries

- Retraining cadence and triggers are the drift-monitoring contract;
  deployment provides the safe path each retrain travels, not the
  schedule.
- Multi-armed bandits and online learning change the statistical
  machinery entirely; this skill covers the fixed-model release loop.
- LLM serving adds token streaming, caching, and cost tiers on top
  (see llm-cost-latency, inference-serving-optimization); the gating
  and rollback discipline transfers unchanged.

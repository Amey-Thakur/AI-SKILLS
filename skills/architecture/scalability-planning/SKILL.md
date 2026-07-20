---
name: scalability-planning
description: Plan scalability from a load model and bottleneck math, designing for realistic growth without premature over-engineering. Use when designing for scale or after a load-driven incident.
---

# Scalability planning

Scalability is designed against a number, not a feeling. Start from a
load model, find where it breaks, and design for the next order of
magnitude: not ten, because that is today, and not a thousand, because
that is architecture astronomy you will rebuild before you reach it.

## Method

1. **Build the load model first.** Requests per second at
   peak, data volume and growth rate, read/write ratio,
   payload sizes, and the concurrency shape (steady vs
   spiky): tied to the business driver (see
   capacity-planning, product-metrics). Every scaling
   decision references this model; designing for scale
   without a number is guessing which is why systems get
   over- and under-built at once.
2. **Find the bottleneck by math, then by test.** Trace the
   load through the system and compute where it saturates
   first (usually the database, a shared lock, or a
   single-threaded stage: see systems-profiling,
   concurrency-tuning); intuition picks the wrong component
   routinely. Confirm with load testing (see load-testing)
   and design the fix for the *real* bottleneck, not the
   scary-looking one.
3. **Scale horizontally by removing shared state.** Stateless
   services scale by adding instances (see
   autoscaling-policies); the hard part is the stateful
   tier. Push state to the data layer, make services share
   nothing, and design the data layer to scale
   (read replicas for read-heavy, sharding/partitioning for
   write-heavy: see sharding-partitioning, materialized-
   views, caching-strategy). The stateless tier is easy;
   the plan is really a data-scaling plan.
4. **Design for the next 10x, not the current 1x or a
   fantasy 1000x.** Architect so the known next order of
   magnitude does not require a rewrite, and no further:
   over-engineering for scale you may never reach costs
   real complexity now (see premature-abstraction,
   monolith-first) and often makes the current system worse.
   Re-plan at each order of magnitude; the right design at
   1M users differs from the one at 1K.
5. **Prefer asynchrony and caching to absorb load.** Queue
   spiky work so the system processes at its own pace
   (see message-queues, backpressure); cache expensive
   reads with a considered invalidation strategy (see
   caching-strategy, cache-invalidation); precompute where
   read latency matters (see cqrs, materialized-views).
   These absorb load without linearly scaling the
   expensive components.
6. **Degrade gracefully past the plan.** Load will
   eventually exceed any design; the system sheds load,
   serves stale, or reduces functionality rather than
   collapsing (see backpressure, partition-tolerance's
   degraded modes). A scalability plan includes what
   happens when you exceed it, because you will.

## Boundaries

- Premature scaling is a top way startups waste effort:
  most systems never reach the scale their architecture
  was over-built for, and the complexity slows them
  reaching it (see monolith-first, mvp-scoping). Build
  for realistic near-term growth.
- Scalability (handling more load) is distinct from
  performance (handling one request fast: see
  performance-optimization) and availability (staying up:
  see multi-region-design); a plan conflating them
  optimizes the wrong axis.
- Vertical scaling (a bigger machine) is the boringly
  correct first answer for many systems and buys years
  cheaply; exhaust it before distributed complexity (see
  managed-vs-selfhosted's honesty).

---
name: design-caching
description: Design a caching layer with explicit invalidation, chosen for a specific access pattern rather than added generally.
variables:
  - "{workload}: what is read, how often, how it changes, and how stale it may be"
  - "{system}: where the data lives now and what the current latency is"
settings: "Temperature 0.3."
---

Design caching for:

{workload}

Current system: {system}

Use the caching-strategies and cache-invalidation skills, plus
http-caching if this is web-facing.

Cover:
- What to cache and, explicitly, what not to.
- Where the cache sits and why that layer.
- Key design, including what makes a key distinct.
- Time to live, derived from the stated staleness tolerance.
- Invalidation: what triggers it and how it propagates.
- Behaviour on a cold cache and under a stampede.

Rules: invalidation is the hard part, so specify it concretely rather
than saying cache is invalidated on update. State the staleness the user
will actually experience. Do not cache anything user-specific in a shared
layer. If the workload does not justify a cache, say so.

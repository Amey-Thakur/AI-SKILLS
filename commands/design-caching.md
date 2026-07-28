---
description: "Design a caching layer with explicit invalidation, chosen for a specific access pattern rather than added generally."
argument-hint: "[workload]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

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

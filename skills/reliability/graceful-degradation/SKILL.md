---
name: graceful-degradation
description: Design systems that lose functionality progressively rather than failing entirely when a dependency is unavailable. Use when one component's failure currently takes down the whole product.
---

# Graceful degradation

Total failure is rarely necessary. Most products have a core that can
keep working while peripheral features are unavailable, and the design
question is which parts are essential and what the others do when their
dependency is gone.

## Method

1. **Classify features by criticality.** What must work, what should
   work, and what can disappear without the product being unusable.
2. **Isolate the non-critical.** A recommendation service failure must
   not block checkout, which requires the dependency to be optional in
   code rather than in intention (see bulkheads).
3. **Define the degraded behaviour per feature.** Cached data, a
   default, or a hidden section, decided in advance rather than
   improvised.
4. **Fail fast when degrading.** A short timeout that drops to the
   fallback beats a long wait that degrades everything (see
   integration-resilience).
5. **Tell users what is unavailable.** A visible, honest message beats a
   silently missing feature that reads as broken.
6. **Shed load deliberately under pressure.** Rejecting a fraction of
   requests cleanly preserves the rest, where accepting everything
   fails all of it (see load-shedding).
7. **Test the degraded paths.** They are the least exercised code and
   the most likely to be broken when needed (see chaos-engineering).

## Boundaries

Degradation preserves partial service and does not prevent the
underlying failure. Some operations cannot degrade, particularly
financial and safety-critical ones. Degraded modes add code paths that
need testing and can themselves fail.

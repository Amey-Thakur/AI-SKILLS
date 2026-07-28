---
name: estimation-techniques
description: Produce estimates that are useful despite being uncertain, using ranges, historical data, and decomposition rather than single numbers. Use when asked how long something will take.
---

# Estimation techniques

Single-number estimates are always wrong and are treated as commitments.
Useful estimation communicates uncertainty honestly and improves through
comparison with what actually happened rather than through effort spent
estimating.

## Method

1. **Estimate ranges, not points.** A range with a confidence level
   carries the information a single number destroys, and it changes how
   the estimate is used.
2. **Decompose until the pieces are familiar.** Estimates of things
   resembling work you have done are far better than estimates of large
   unfamiliar chunks.
3. **Use historical data over judgement.** How long similar work
   actually took beats expert opinion consistently, and most teams have
   this data unexamined.
4. **Estimate effort and elapsed time separately.** Three days of work
   spread across dependencies and reviews is not three days of calendar,
   and conflating them causes most missed dates.
5. **Include the work people forget.** Review, testing, deployment,
   documentation, and the fixes that follow are usually most of it.
6. **Never negotiate an estimate.** Scope and confidence are negotiable;
   the estimate for given scope is information rather than a position
   (see negotiation-fundamentals).
7. **Compare estimates to outcomes routinely.** The ratio is usually
   consistent per team and can be applied as a correction (see
   agent-capacity-planning).

## Boundaries

Estimates are predictions under uncertainty and are wrong more often
than not, particularly for novel work. Precision beyond the underlying
uncertainty is false comfort. Estimates used as performance targets stop
being estimates and become negotiated fiction.

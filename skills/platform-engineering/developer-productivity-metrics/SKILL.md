---
name: developer-productivity-metrics
description: Measure the system's throughput and stability rather than individual output, and use the numbers to remove friction. Use when improving engineering effectiveness or justifying platform work.
---

# Developer productivity metrics

Measuring individuals produces gaming and damages trust; measuring the
system produces improvement. The useful metrics describe how quickly and
safely changes reach users.

## Method

1. **Measure the delivery system, never individuals.** Lines of code,
   commits, and story points are proxies that reward the wrong
   behaviour (see support-analytics for the same trap).
2. **Track lead time from commit to production.** It captures every
   queue and manual step, which is where most delay lives.
3. **Track deployment frequency and change failure rate together.**
   Speed without stability is not improvement, and the pair prevents
   optimising one at the other's expense.
4. **Measure time to restore.** How quickly a bad change is recovered
   matters more than preventing every bad change (see
   incident-severity-levels).
5. **Add developer-reported friction.** Surveys catch what telemetry
   cannot, such as unclear ownership and painful local setup.
6. **Segment by team and service.** Aggregates hide the one team blocked
   by a specific bottleneck, which is the actionable finding.
7. **Use metrics to find friction, not to compare teams.** Comparison
   invites gaming and ignores genuinely different contexts.

## Boundaries

These metrics describe delivery and say nothing about whether the right
things are being built. They are easy to game if tied to evaluation,
which destroys their value. Small teams have noisy numbers that mislead
when read weekly.

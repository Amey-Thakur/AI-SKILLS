---
name: capacity-forecasting
description: Predict when current capacity will be exhausted and plan the increase before it becomes an incident. Use when growth is steady enough to plan for or when scaling events surprise you.
---

# Capacity forecasting

Running out of capacity is a predictable incident, which makes it an
avoidable one. Forecasting converts a future outage into a scheduled
piece of work.

## Method

1. **Identify the binding constraint.** Which resource exhausts first,
   since forecasting the wrong one produces confident wrong plans (see
   capacity-planning).
2. **Project from real growth, not from targets.** Historical trend with
   its variance, because business plans are optimistic and capacity
   plans should not be.
3. **Plan to a threshold, not to the limit.** Trigger the increase at a
   utilisation level that leaves time to act.
4. **Include the lead time.** Procurement, provisioning, and migration
   take time that must be subtracted from the runway.
5. **Account for headroom for spikes.** Steady-state capacity that
   cannot absorb a peak is not adequate (see load-shedding).
6. **Model step changes separately.** A launch or a large customer moves
   demand discontinuously, and trend extrapolation misses it.
7. **Review the forecast against actuals.** A forecast never compared to
   what happened does not improve.

## Boundaries

Forecasts assume patterns continue and miss discontinuities. Elastic
infrastructure reduces but does not remove the problem, since quotas and
cost ceilings still bind. Over-provisioning is a real cost, so the
trade needs stating (see cloud-cost-optimization).

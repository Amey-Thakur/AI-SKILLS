---
name: capacity-planning
description: Forecast load, size headroom, discover scaling limits before they bite, and track cost curves. Use when planning capacity for growth or a known traffic event, or after a saturation incident.
---

# Capacity planning

Capacity planning answers "will we fall over, and when" before the
answer arrives as an outage. It is load forecasting plus limit
discovery plus a headroom policy: guessing at any of the three is how
Black Friday becomes a postmortem.

## Method

1. **Model load from a driver, not a vibe.** Tie resource
   demand to a business metric (requests per active user,
   compute per order: see product-metrics) and forecast the
   driver (organic growth, marketing events, seasonality:
   see product-launch's spike). Per-hop capacity flows from
   the load model through the request path; a plan built on
   "traffic will grow" without a number is not a plan.
2. **Discover limits empirically.** Load-test to find where
   each component saturates and *how* it fails (graceful
   degradation vs cliff: see load-testing, backpressure):
   the bottleneck is rarely where intuition points, and the
   failure mode matters as much as the number. Test the
   whole path; the database connection pool or a downstream
   rate limit usually caps you before CPU does.
3. **Set headroom from failure cost and lead time.** Enough
   buffer to absorb spikes within your scale-out actuation
   time (see autoscaling-policies' lag math) plus a margin
   for the forecast being wrong; more headroom for
   hard-to-scale stateful tiers (see sharding-partitioning)
   than for elastic stateless ones. Headroom is insurance
   priced against downtime cost.
4. **Distinguish elastic from fixed capacity.** Autoscaling
   handles variance within provisioned limits (see
   autoscaling-policies), but the limits themselves
   (account quotas, database size, license seats, IP
   ranges, third-party rate caps) are capacity planning's
   job: the outage is often hitting a ceiling nobody
   tracked, not running out of compute.
5. **Pre-provision for known events, verify by test.**
   Marketing spikes, launches, seasonal peaks: raise
   quotas ahead (cloud quota increases take days),
   pre-scale (see autoscaling-policies' scheduled scaling),
   load-test at projected peak, and rehearse the failure
   (game-day the spike: see chaos-gameday). Reactive
   scaling pays the actuation lag exactly when you cannot
   afford it.
6. **Track cost against capacity continuously.** Cost per
   unit of the business driver (see cloud-cost-optimization's
   unit economics): capacity and spend are the same curve,
   and a plan that ignores cost provisions a fleet nobody
   will pay for. Review utilization trends monthly;
   pinned-at-max autoscaling is capacity planning paging
   you (see autoscaling-policies).

## Boundaries

- Forecasts are wrong; the plan's value is the headroom
  and the discovered limits, not the precision of the
  prediction (see estimation-techniques' error-bar
  honesty). Re-forecast on a cadence.
- Capacity planning sizes for expected and reasonable-peak
  load; genuine overload beyond the plan is handled by
  shedding and degradation (see backpressure), not by
  provisioning for the tail forever.
- Multi-region and DR capacity is a separate axis (can one
  region absorb another's load on failover: see
  multi-region-design, cloud-disaster-recovery); steady-
  state planning that ignores it under-provisions the
  failure case.

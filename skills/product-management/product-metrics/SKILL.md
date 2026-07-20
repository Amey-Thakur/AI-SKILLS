---
name: product-metrics
description: Choose a north star with input metrics you can move, guardrails you must not break, and defenses against vanity. Use when defining product measurement or auditing a dashboard full of numbers nobody acts on.
---

# Product metrics

A metric earns its place by changing decisions. The architecture:
one north star that proxies delivered value, a small tree of input
metrics teams can actually move, and guardrails that catch the damage
optimization causes elsewhere.

## Method

1. **Pick a north star that means value delivered.** Not revenue
   (lagging, hides user harm) and not signups (vanity): a usage
   moment tied to the product's promise: orders delivered,
   documents collaborated on weekly, rides completed. Test:
   if this number doubles while everything else holds, is the
   business genuinely healthier? (see saas-metrics for the
   financial layer beside it).
2. **Decompose into input metrics teams own.** North star =
   f(activation rate, frequency, retention, capacity...):
   each team owns inputs it can move with shipped work
   (see user-activation, churn-analysis for two of the big
   ones); a team goaled on the north star alone has a metric
   it can only watch. The decomposition is the strategy made
   arithmetic (see okr-cascade).
3. **Define every metric once, precisely.** Numerator,
   denominator, time window, population, exclusions: written
   where dashboards link to it (see warehouse-modeling's
   metric-definition rule; saas-metrics for the canonical
   financial definitions). "Active user" with three
   definitions across three dashboards is how companies argue
   about reality instead of deciding.
4. **Stand guardrails beside every goal metric.** Optimizing
   checkout conversion can torch refund rates; engagement
   pushes can burn notification opt-outs and sleep: name the
   2-4 metrics each initiative must *not* degrade, and check
   them in every experiment readout (see ab-test-design's
   guardrail arms). A goal metric without guardrails is an
   invitation to strip-mine.
5. **Instrument events as a designed schema.** Track the
   behaviorally-meaningful events (activation milestones, core
   actions, failure moments) with stable names and properties,
   versioned like any contract (see schema-evolution); ad hoc
   event sprawl produces dashboards nobody trusts (see
   data-quality-checks for keeping them honest). Wire the
   funnel from first touch through activation so drop-off is
   visible per step (see user-activation).
6. **Review metrics as decisions, not weather.** A cadenced
   review (weekly operating, monthly deep-dive) where each
   owned metric gets: trend vs target, diagnosis if off, and
   the *action being taken*: dashboards without a deciding
   forum are decoration (see dashboard-design,
   infrastructure-monitoring's same rule for systems).
   Retire metrics nobody has acted on in two quarters.

## Boundaries

- Metrics proxy value; they are not value. Goodhart applies:
  every proxy optimized hard enough diverges from the thing
  it proxied: rotate scrutiny, keep qualitative channels
  (support tickets, interviews: see customer-interviews)
  beside the numbers.
- Small products and new bets lack statistical mass; use
  cohort inspection and direct user contact before
  dashboard-driving (see mvp-scoping).
- Privacy boundaries constrain instrumentation (consent,
  PII in events: see pii-handling); measurement design
  includes what you deliberately do not collect.

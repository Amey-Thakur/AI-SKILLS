---
name: funnel-analysis
description: Analyze conversion funnels to find where users drop off and why, and size the opportunity of fixing each step. Use when diagnosing where a multi-step flow loses people, or prioritizing what to fix.
---

# Funnel analysis

A funnel is a sequence of steps toward a goal (visit, signup, activate,
purchase), and users leak out at every step. Funnel analysis finds where
the leaks are, how big they are, and which one is worth fixing, turning a
vague "conversion is low" into a specific, sized problem.

## Method

1. **Define the funnel steps precisely.** Name each step as an observable
   event with a clear definition and order, and decide the window (does a
   user have to complete the funnel in one session, a day, ever?). Fuzzy
   step definitions produce fuzzy, unactionable numbers (see product-metrics'
   define-once rule).
2. **Measure conversion at each step, not just end to end.** The overall
   rate hides where the loss happens; the per-step drop-off is the map. A
   step where 60% leak is the finding, and it is invisible in the aggregate.
   Show both the step-to-step rate and the cumulative.
3. **Size the opportunity of each leak.** The step with the worst drop-off
   is not always the best to fix; weight by volume and value. Fixing a 50%
   leak that only 100 users hit matters less than a 10% leak that 100,000
   hit. Prioritize by users-lost times value-per-user, not by the scariest
   percentage (see prioritize-tasks).
4. **Segment the funnel to find who leaks.** The same step may convert fine
   for one segment and terribly for another (mobile vs desktop, new vs
   returning, by source, by geography). Segmenting reveals whether a leak is
   universal (fix the step) or specific (fix it for that segment), and a
   bad-fit traffic source shows up as step-one drop-off (see
   user-activation, correlation-causation on selection).
5. **Diagnose the why, do not just measure the where.** A drop-off number
   says where, not why. Combine it with qualitative evidence (session
   recordings, user testing, support tickets) to understand the cause
   before designing a fix (see usability-testing, empty-and-error-states).
   Guessing at the cause of a leak wastes the fix.
6. **Mind the funnel's honesty.** Watch for survivorship and selection (the
   users who reach step 4 are not like those who dropped at step 1, so
   later-step rates are conditional), and time effects (a "funnel" measured
   in one session undercounts users who complete it later). State the
   window and the conditioning.

## Boundaries

- Funnel analysis shows where users leave, not why; pair the where (data)
  with the why (qualitative and experiments) before investing in a fix
  (see usability-testing, experiment-analysis).
- Not every flow is a linear funnel; users loop, skip, and return, and
  forcing a messy journey into rigid steps can mislead. Model the real
  paths where they matter (see user-flows).
- Optimizing a funnel step can shift the problem downstream (more signups
  of worse-fit users who churn); check the downstream metrics, not just the
  step you fixed (see churn-analysis, product-metrics' guardrails).

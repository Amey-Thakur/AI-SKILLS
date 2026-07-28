---
name: service-level-objectives
description: Define measurable reliability targets from the user's perspective and use the error budget to decide between shipping and stabilising. Use when reliability is debated without numbers.
---

# Service level objectives

An objective turns reliability from an argument into a number. Its real
value is the error budget: the amount of unreliability you have decided
is acceptable, which converts "should we ship or stabilise" into a
question with an answer.

## Method

1. **Measure what users experience.** Successful requests and acceptable
   latency at the edge, not internal component health, since a system
   can be green everywhere and broken for users.
2. **Set the target below one hundred percent deliberately.** Perfect
   reliability costs more than it returns, and the gap is the budget you
   spend on change.
3. **Derive the budget and track its consumption.** Budget remaining
   this period is the operational number, and it makes the trade
   visible (see error-budget-policy).
4. **Agree the policy before you need it.** What happens when the budget
   is exhausted, decided in calm conditions rather than mid-incident.
5. **Keep the objective count small.** A handful of user-facing
   objectives is actionable; dozens of component targets are noise.
6. **Measure over a rolling window.** Calendar-month resets create
   incentives to gamble at month end.
7. **Revisit when reality diverges.** An objective never breached is too
   loose and one always breached is not a target (see
   alerting-design).

## Boundaries

Objectives describe reliability and do not deliver it. A target agreed
without the investment to meet it is a fiction. Some failures are so
severe that budget accounting is irrelevant and the response is
immediate regardless (see incident-response).

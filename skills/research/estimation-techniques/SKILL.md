---
name: estimation-techniques
description: Estimate unknown quantities with Fermi decomposition, reference classes, and honest error bars. Use when you need a number for a decision and no exact figure exists.
---

# Estimation techniques

Many decisions need a number that nobody knows exactly: how much
traffic, how long the project, how big the market. Good estimation
gets within an order of magnitude fast by decomposing the unknown into
knowable parts, anchoring on real reference data, and stating the
uncertainty honestly rather than pretending precision.

## Method

1. **Decompose with Fermi estimation.** Break the unknown
   into a product of factors you can each estimate to within
   a factor of a few: "requests per day = users x sessions
   per user x requests per session". Errors in independent
   factors partially cancel, so a product of rough estimates
   is often within 2-3x of truth (the classic "piano tuners
   in Chicago" method: see the decomposition instinct in
   first-principles-thinking, capacity-planning's load
   model).
2. **Anchor on reference classes, not intuition.** Instead
   of estimating this project's duration from scratch, ask
   how long similar projects actually took (reference-class
   forecasting): the outside view beats the inside view,
   which is systematically optimistic (the planning
   fallacy). "Projects like this took 3-6 months" is more
   reliable than "this one feels like 6 weeks" (see
   the optimism correction in status-updates).
3. **Bound with best/worst/likely.** Estimate a range, not a
   point: the plausible low, high, and most-likely: because
   a single number implies a precision you do not have and
   invites false confidence. The range is the honest
   answer, and its width tells the decision-maker how much
   the estimate can be trusted (see tradeoff-analysis's
   sensitivity).
4. **State error bars and carry them.** An estimate without
   uncertainty is a lie of precision; "roughly 10,000, could
   be 5,000-20,000" is more useful than "10,000" because it
   tells you whether the decision is robust to the
   uncertainty. Propagate the uncertainty through the
   decision (if the answer flips within the error bars, you
   need a better estimate: see experiment-design-basics).
5. **Sanity-check against a second method and known
   bounds.** Estimate the same quantity a different way and
   see if they agree (order-of-magnitude agreement is
   reassuring; wild disagreement means a factor is wrong);
   check against hard limits (an estimate exceeding the
   total market or the physical maximum is wrong somewhere).
   Cross-checking catches the decimal-place and unit errors
   that single estimates hide.
6. **Calibrate over time.** Track your estimates against
   actuals (see decision-journals): are your ranges right
   about as often as their confidence claims, or are you
   overconfident (ranges too narrow: the common failure)?
   Calibration is trainable, and estimators who track their
   record get measurably better at sizing uncertainty.

## Boundaries

- Estimation gets you a defensible number for a decision,
  not a precise fact; treat estimates as inputs with
  uncertainty, not truths, and revisit them as real data
  arrives (see capacity-planning's re-forecasting).
- Some quantities have fat tails or fundamental
  unpredictability (novel systems, black-swan events)
  where point estimates mislead badly; there, plan for
  ranges and robustness rather than betting on the
  estimate (see the degradation planning in
  scalability-planning).
- Anchoring is a double-edged tool: a bad reference class
  or a planted number biases the estimate. Choose
  reference classes deliberately and beware anchors others
  supply (see the negotiation anchoring in
  salary-negotiation).

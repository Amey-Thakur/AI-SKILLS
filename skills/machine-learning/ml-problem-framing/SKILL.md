---
name: ml-problem-framing
description: Frame ML problems around a decision, a measurable target, and honest error costs before touching models. Use when scoping an ML project or reviewing whether one should exist.
---

# ML problem framing

Most failed ML projects were framed wrong, not modeled wrong. The frame
is: what decision changes, what exactly is predicted, what does each
kind of error cost, and would something simpler make the same decision.

## Method

1. **Start from the decision, not the data.** Name the action the
   prediction triggers ("flag order for review", "rank these items",
   "set this price") and who or what consumes it. A prediction nobody
   acts on is a dashboard; if the action is unclear, stop here.
2. **Specify the target variable ruthlessly.** "Churn" becomes
   "no login within 30 days of day X, for accounts active in the
   prior 60". Definition choices (window, population, exclusions)
   change the problem more than any model choice will; write them
   down and get the domain owner to sign (see warehouse-modeling on
   metric definitions).
3. **Verify the label's availability and honesty.** When does ground
   truth arrive (instant, 30 days, never)? Is it censored (you only
   see fraud you caught), biased by the current process (loan
   defaults observed only for approved loans), or drifting? Label
   latency bounds your retraining loop; label bias caps what any
   model can learn.
4. **Price the errors asymmetrically.** False positive cost vs false
   negative cost, in money or user harm, from the decision owner.
   This drives the metric (see model-evaluation), the operating
   threshold, and often the architecture (a cheap model plus human
   review can beat an expensive autonomous one).
5. **Establish the non-ML baseline first.** The current heuristic,
   a rules list, a single feature threshold, or "predict the
   historical mean" (see ml-baselines). The project's real question
   is the delta over this baseline at the decision, not the model's
   absolute score; sometimes the baseline wins and the project
   should become three IF statements.
6. **Define success upstream and downstream.** Offline: metric and
   threshold on a proper holdout (see train-test-discipline).
   Online: the business metric the decision should move, measured by
   experiment (see ab-test-design), plus guardrails (latency budget,
   fairness slices, override rate). Agree on the kill criteria
   before building; projects without them run on sunk cost.

## Boundaries

- Problems needing 100% correctness, full explainability by law, or
  where errors are catastrophic and unauditable are rules-and-review
  territory, not ML.
- Insufficient or unlabelable data is a data-collection project
  first; committing model timelines before the label pipeline exists
  reverses the dependency.
- Frame once, revisit at every scope change; silent target drift
  ("churn now means downgrade too") invalidates every past
  evaluation.

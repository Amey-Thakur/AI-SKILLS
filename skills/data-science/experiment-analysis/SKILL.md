---
name: experiment-analysis
description: Analyze A/B test results correctly: effect size with intervals, guardrails, segments, and the peeking and Simpson traps. Use when reading out an experiment and deciding whether the change worked, before you ship it.
---

# Experiment analysis

Designing an experiment well is half the job; reading its results without
fooling yourself is the other half. The analysis traps are famous and
costly: declaring a win from noise, peeking early, reading segments that
were not pre-planned, and Simpson's paradox. Honest analysis is what makes
the experiment worth running.

## Method

1. **Check the experiment's health before the result.** Sample-ratio
   mismatch (a 50/50 split arriving 48/52 means broken assignment and
   invalidates everything), instrumentation working, and the test having
   run its planned duration. A result from a broken experiment is worse
   than no result (see ab-test-design, data-quality-checks).
2. **Report the effect with a confidence interval, not just significance.**
   "+2.1% conversion, 95% CI [0.4%, 3.8%]" tells you the size and the
   uncertainty; "p < 0.05" hides both. A significant result with an interval
   spanning trivial-to-large is a weak conclusion. Lead with the effect size
   and its range (see statistical-inference).
3. **Respect the pre-registered analysis.** Analyze the primary metric you
   named before the test, at the planned time. Do not peek and stop when
   significant (repeated looks manufacture false positives), and do not
   hunt through metrics and segments for something that "worked" after a
   flat primary. Post-hoc findings are hypotheses for the next test, not
   conclusions.
4. **Check the guardrails before celebrating.** A lift in the primary metric
   that tanks a guardrail (a checkout-conversion win that spikes refunds, an
   engagement win that burns opt-outs) is often a net loss. Read the
   guardrails first (see ab-test-design, product-metrics).
5. **Watch for Simpson's paradox in segments.** An effect can reverse
   direction between the aggregate and every subgroup (or vice versa) when
   groups are unbalanced. Pre-planned segment analysis is informative;
   unplanned segment-slicing until something is significant is fishing.
   When aggregate and segments disagree, understand why before trusting
   either (see correlation-causation).
6. **Interpret a flat result as a real result.** "No detectable effect" is a
   finding: the change did not move the metric, which updates the roadmap.
   Do not torture the data until a subgroup shows a win, and do not read
   non-significance as proof of no effect (it may be underpowered; see
   statistical-inference).

## Boundaries

- Analysis is only as valid as the design: randomization, sample size, and
  pre-registration set before the test are what make the analysis
  trustworthy (see ab-test-design, experiment-design-basics). Good analysis
  cannot rescue a broken design.
- Statistical significance measures signal versus noise, not business value
  or long-term effect; a significant short-term win can hide long-term harm
  that only a holdout reveals (see product-metrics' Goodhart warning).
- Some situations cannot support a clean experiment (low traffic, network
  effects, big redesigns); there, honest observational analysis with stated
  caveats beats a fake A/B test (see correlation-causation, canary-analysis).

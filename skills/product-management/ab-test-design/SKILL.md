---
name: ab-test-design
description: Design product experiments with real hypotheses, honest sample-size math, guardrails, and peeking discipline. Use when validating a change by experiment or reviewing a test before believing its result.
---

# A/B test design

An experiment is a measurement instrument you build before using.
Decide the hypothesis, the metric, the sample size, and the stopping
rule first; a test designed after seeing data is an anecdote with
error bars.

## Method

1. **Write the hypothesis as a causal sentence.** "Showing
   delivery dates on the product page will increase checkout
   completion by reducing delivery uncertainty": mechanism
   included, so a flat result teaches something (the mechanism
   is wrong, or the lever is weak: see
   hypothesis-driven-work). Pick the one primary metric it
   should move (see product-metrics) and the guardrails it
   must not break.
2. **Size the test before launch.** From baseline rate, minimum
   detectable effect you would act on, and power (80%+):
   compute required sample and therefore runtime. If the
   honest answer is "eleven weeks", change the plan: bigger
   lever, higher-traffic surface, or a different method (see
   Boundaries). Underpowered tests produce coin-flips read as
   insight (see statistical-power for the math).
3. **Randomize at the right unit, verify the split.** User-level
   (stable across sessions) for most product changes;
   cluster-level where users interact (marketplaces, social:
   interference breaks user-level math). Check sample-ratio
   mismatch on day one: a 50/50 split arriving 48/52 means
   broken assignment and invalidates everything after
   (see data-quality-checks' spirit applied to experiments).
4. **Run past the decided stopping point, without peeking
   decisions.** Fixed-horizon tests: no early stopping on
   significance (repeated peeking manufactures false
   positives); if early looks are operationally necessary,
   use sequential methods designed for them. Run whole weeks
   (weekday/weekend cycles), through the novelty wobble; and
   pre-register the analysis (segments included) so the
   readout is not a fishing trip (see
   experiment-design-basics, train-test-discipline's
   split-first ethic).
5. **Read results as decisions, guardrails first.** Check
   guardrails before celebrating the primary; report effect
   size with confidence interval, not just significance
   ("+0.8% [0.1, 1.5]" says more than "p<0.05"); segment
   analyses are hypothesis-generating unless pre-registered
   (see model-evaluation's slicing discipline). Flat is a
   result: the mechanism failed, and that updates the
   roadmap (see product-discovery).
6. **Log every experiment, including the dead.** Hypothesis,
   design, result, decision, in a searchable registry (see
   experiment-tracking's sibling for product): the
   organization's real asset is the accumulated map of what
   levers do and do not move, and it only accumulates if
   losses are recorded (see decision-journals).

## Boundaries

- Low-traffic products and big redesigns often cannot power a
  test; use staged rollouts with health metrics (see
  canary-analysis), pre/post cohorts with humility, or
  qualitative methods (see customer-interviews): a fake A/B
  test is worse than an honest observational read.
- Experiments measure short-term proxies; long-term effects
  (trust, ecosystem health) need holdouts held for months
  and are still hard: flag decisions where short-term wins
  plausibly buy long-term damage (see product-metrics'
  Goodhart warning).
- Ethics constrain the space: no dark-pattern arms, no
  degrading critical services to measure harm, disclosure
  where policy requires (see llm-guardrails' human-impact
  instincts).

---
name: hypothesis-driven-work
description: Frame work as falsifiable hypotheses, test the cheapest first, and update on evidence rather than defending the plan. Use when facing uncertainty and tempted to build the whole thing before learning anything.
---

# Hypothesis-driven work

Uncertain work goes faster when framed as hypotheses to test rather
than plans to execute: state what you believe and how you would know
if you are wrong, test the cheapest-riskiest belief first, and let
evidence redirect you. The alternative (build the whole thing, then
discover the premise was false) is the expensive way to learn.

## Method

1. **State beliefs as falsifiable hypotheses.** "Users will
   pay for X", "this cache will cut latency 50%", "the bug
   is in the auth layer": phrased so a specific observation
   would prove them wrong (see mvp-scoping's riskiest-
   assumption, ml-problem-framing's falsifiable framing). A
   belief you cannot imagine disproving is not a hypothesis,
   it is a faith you will defend against evidence.
2. **Rank by risk times cost-of-being-wrong.** Test the
   hypothesis that, if false, kills the whole effort, and
   that is cheapest to test: the riskiest assumption first
   (see mvp-scoping). Order the work by what you most need
   to learn, not by what is easiest to build or most fun.
   Building the easy known parts first defers the learning
   that decides whether to build at all.
3. **Design the cheapest test that could disprove it.** The
   minimum experiment, prototype, spike, or measurement that
   would move your belief (see experiment-design-basics,
   scientific-debugging's reproduction-first). A landing
   page tests demand cheaper than a product; a spike tests
   feasibility cheaper than an implementation. Optimize for
   information per unit effort.
4. **Predict the outcome before testing.** Write down what
   you expect to see if the hypothesis is true and if it is
   false, before running the test: this commits you and
   makes the result interpretable (a result you can spin
   either way taught you nothing: see decision-journals'
   prediction discipline). Surprising results (prediction
   wrong) are the most informative.
5. **Update on the evidence, including against yourself.**
   When the test disproves the hypothesis, believe it and
   change course: the whole point is cheap redirection, and
   defending a disproven hypothesis because you are invested
   wastes the test you just ran (see receiving-feedback's
   ego separation, sunk-cost awareness). Pivoting on
   evidence is success, not failure.
6. **Keep a trail of hypotheses and outcomes.** What you
   believed, tested, found, and decided (see decision-
   journals, experiment-tracking): so the reasoning is
   auditable, patterns emerge across tests, and you do not
   re-test the same dead hypothesis. The accumulated map of
   what is true is the compounding asset.

## Boundaries

- Not all work is uncertain enough to need hypotheses;
  known execution (implementing a settled design) runs on
  plans, not experiments. Hypothesis-driven work is for
  the genuinely uncertain, where learning is the
  bottleneck.
- Cheap tests trade rigor for speed; a landing-page demand
  test is directional, not conclusive (see ab-test-design
  for when you need statistical confidence). Match the
  test's rigor to the decision's stakes.
- Hypothesis framing can become procrastination (testing
  forever, never committing); at some point the evidence is
  sufficient and you build. Know when you have learned
  enough to act (see tradeoff-analysis's reversibility).

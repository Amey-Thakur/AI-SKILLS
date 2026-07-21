---
name: probability-fundamentals
description: Reason correctly about probability, base rates, conditional probability, and expected value, avoiding the common intuition traps. Use when interpreting likelihoods, test results, risks, or any uncertain quantity.
---

# Probability fundamentals

Human intuition about probability is reliably wrong in specific ways:
ignoring base rates, confusing P(A given B) with P(B given A), and
misjudging rare events. A few fundamentals and an awareness of the traps
prevent the errors that lead analysts and decision-makers badly astray.

## Method

1. **Anchor on the base rate.** The prior probability of an event dominates
   more than intuition allows. A test that is "95% accurate" for a disease
   that affects 1 in 1000 produces mostly false positives, because the base
   rate is tiny. Always ask "how common is this to begin with?" before
   updating on new evidence (this is the base-rate neglect that fools
   everyone; see mental-models).
2. **Keep conditional probabilities straight.** P(A given B) is not P(B given
   A). P(positive test given disease) is high; P(disease given positive
   test) can be low, because it depends on the base rate. Bayes' rule is the
   correction: the posterior combines the evidence with the prior, and
   flipping the condition without it is a classic, costly error.
3. **Think in expected value for decisions under uncertainty.** The value of
   an uncertain choice is the sum of each outcome's value times its
   probability. A small chance of a large loss can outweigh a large chance
   of a small gain; expected value makes the comparison explicit rather than
   trusting a gut that overweights the vivid outcome (see decision-matrix,
   risk-analysis).
4. **Distrust your sense of rare and extreme events.** People overestimate
   vivid rare events (plane crashes) and underestimate mundane frequent
   ones, and misjudge compound probabilities (the chance of many things all
   going right). For a chain of independent steps, multiply the
   probabilities; the product is usually lower than intuition expects.
5. **Do not confuse independence and dependence.** Independent events do not
   influence each other (the coin has no memory: the gambler's fallacy is
   expecting a "due" outcome); dependent events do. Treating correlated
   risks as independent (they all fail together in a crisis) or independent
   trials as linked are opposite, common errors with real consequences.
6. **Separate probability from outcome when judging decisions.** A good
   decision (correct given what was known and the probabilities) can have a
   bad outcome, and vice versa; luck is not skill. Judge the reasoning and
   the odds it was based on, not only the result (resulting is the bias of
   grading decisions by outcomes; see decision-journals).

## Boundaries

- These fundamentals guard against the common intuition traps; they are not
  the full field. Formal probability and statistics go deeper (see
  statistical-inference, pymc for Bayesian methods).
- Probabilities are only as good as the numbers behind them; a precise
  expected-value calculation on made-up probabilities is false precision.
  Be honest about where the numbers come from (see estimation-techniques).
- Genuine uncertainty (unknown probabilities, one-off events) resists exact
  calculation; there, reasoning about ranges, scenarios, and downside
  matters more than a single computed number (see risk-analysis,
  pre-mortem).

---
name: exploratory-data-analysis
description: Explore a new dataset systematically to understand its shape, quality, and signal before modeling. Use when you first get a dataset and need to know what is in it, what is wrong with it, and what is worth pursuing.
---

# Exploratory data analysis

EDA is the conversation you have with a dataset before trusting it. Skip
it and you model on garbage, miss the leak, or chase the wrong signal. The
goal is understanding: what is here, what is broken, and where the signal
lives, grounded in looking rather than assuming.

## Method

1. **Establish the shape first.** Rows, columns, types, and what one row
   represents (the grain). Confirm the grain matches your belief; a dataset
   you think is one-row-per-user but is one-row-per-event breaks every
   later aggregation (see warehouse-modeling's grain rule).
2. **Profile every column.** For numerics: distribution, range, mean/median,
   outliers. For categoricals: cardinality and value counts. For all:
   missingness rate and pattern. Summary statistics and a histogram per
   column surface the surprises (a "price" column with negatives, an "age"
   of 999, a category with 40% blanks) that would corrupt a model silently.
3. **Investigate missingness and outliers as signal.** Is data missing at
   random, or does missing mean something (no purchase = null revenue)? Are
   outliers errors (a typo'd 10000 for 100) or real extremes? The answer
   changes how you handle them (see data-cleaning); do not blindly drop or
   impute before understanding why.
4. **Look at relationships, especially with the target.** Correlations and
   cross-tabs between features, and between each feature and the target:
   what actually moves the outcome, what is redundant, what is surprising.
   Plot the strong relationships (see data-visualization); a scatter reveals
   what a correlation number hides (nonlinearity, clusters).
5. **Hunt for leakage and too-good signal.** A feature that predicts the
   target almost perfectly is usually leakage (it encodes the answer, or
   comes from after the prediction moment), not a great feature. Suspiciously
   strong signal gets audited, not celebrated (see train-test-discipline,
   leaderboard-strategy).
6. **Write down what you found.** The grain, the quirks, the columns to
   drop or fix, the hypotheses to test, the leakage risks. EDA that lives
   only in your head does not inform the team or your future self (see
   notebook discipline in data-storytelling).

## Boundaries

- EDA describes what is in the data; it does not tell you the data is
  correct, representative, or collected without bias (see sampling and the
  correlation-vs-causation trap in correlation-causation).
- Looking at the target relationships on the full dataset risks biasing
  your choices; keep a held-out set untouched, and be aware that decisions
  made from EDA are a mild form of peeking (see train-test-discipline).
- EDA is iterative and open-ended; time-box it to the decision it serves,
  or it expands indefinitely (see research-planning's depth budget).

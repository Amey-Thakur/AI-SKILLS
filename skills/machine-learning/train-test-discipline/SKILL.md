---
name: train-test-discipline
description: Split data before looking at it, respect time and groups, and quarantine the test set so scores mean something. Use when setting up ML evaluation or auditing why offline metrics did not survive production.
---

# Train-test discipline

An evaluation is a simulation of deployment. Every way your split lets
training peek at test conditions is a way production will disappoint
you by exactly that margin.

## Method

1. **Split first, explore second.** Carve out the test set before EDA,
   feature design, or imputation decisions; explore only train. Every
   choice made after seeing test data (features that "help", removed
   outliers, tuned thresholds) leaks your judgment into the score even
   when no rows leak.
2. **Match the split to the deployment boundary.** Predicting the
   future: temporal split (train on past, test on later period), never
   random: random splits let the model interpolate a future it will
   not have. Entities appearing in many rows (users, patients,
   devices): group split so no entity spans sets, or you measure
   memorization. Both concerns: group-aware temporal split.
3. **Keep three sets with distinct jobs.** Train fits; validation
   selects (features, hyperparameters, early stopping, thresholds);
   test estimates final performance, touched once per project
   milestone. When validation gets overfit by many decisions
   (see hyperparameter-tuning), refresh it from train; the test set
   has no such rescue, which is why it stays locked.
4. **Audit for contamination mechanically.** Duplicate/near-duplicate
   rows across sets (exact hashes, then fuzzy on text), the same
   entity under different keys, preprocessing fit on all data
   (scalers, encoders, imputers must fit train only; see
   feature-engineering), and augmented copies of a test item landing
   in train. Run these checks in CI on the dataset build, not once by
   hand.
5. **Mirror production's information state.** Test features computed
   point-in-time (as-of joins), test distribution matching the
   serving population (not the convenient historical slice), and the
   label definition frozen to the frame (see ml-problem-framing). If
   production sees 1% fraud, a balanced test set inflates every
   metric you report.
6. **Report with uncertainty and slices.** Bootstrap confidence
   intervals on the headline metric, plus per-slice results
   (see model-evaluation); a point estimate on one random split is a
   coin flip with decimals. For small data, nested cross-validation
   replaces the single validation set (see cross-validation).

## Boundaries

- Public benchmark test sets are contaminated for any model trained
  on web-scale data; treat leaderboard deltas there accordingly.
- Time-series with one history (one market, one machine) cannot give
  independent test periods; walk-forward evaluation estimates
  stability, not true generalization, and honesty requires saying so.
- Discipline bounds optimism; it cannot fix a label or population
  that shifted after your data ended (see drift-monitoring).

---
name: cross-validation
description: Pick CV schemes that respect time and grouping, nest them for tuning, and read the variance, not just the mean. Use when data is too small for a single split or when validating tuning claims.
---

# Cross-validation

CV answers "how much does my estimate depend on which rows landed
where" by averaging over K splits. It only works when every fold
respects the same boundaries deployment will face; a leaky fold
structure launders leakage into confidence.

## Method

1. **Choose the scheme from the data's dependence structure.** IID
   rows: stratified K-fold (K=5-10; stratify on the label, especially
   when imbalanced; see imbalanced-data). Repeated measures per
   entity: GroupKFold on the entity so no user/patient/device spans
   folds (see train-test-discipline). Temporal data: walk-forward
   (expanding or sliding window, train always before test); shuffled
   K-fold on time series is the canonical way to publish a model that
   cannot predict anything.
2. **Run the entire pipeline inside each fold.** Scaling, imputation,
   encoding, feature selection, resampling: all fit on the fold's
   training portion only (pipeline objects make this automatic;
   see feature-engineering). Preprocessing fit on the full dataset
   before CV is the most common silent inflation in applied work.
3. **Nest when CV both tunes and evaluates.** Inner loop selects
   hyperparameters (see hyperparameter-tuning), outer loop estimates
   generalization of the whole selection procedure; the outer score
   is the honest one. Tuning and reporting on the same folds
   overstates performance by exactly the amount the search exploited
   them.
4. **Report the spread with the mean.** Per-fold scores, mean, and
   standard deviation; overlapping spreads between model A and B is
   a tie (see model-evaluation on uncertainty). One anomalous fold
   is information: inspect it (a segment? a time period?), do not
   average it away (see ml-error-analysis).
5. **Keep a final untouched test set anyway.** CV replaces the
   *validation* role at small scale, not the test role: model and
   protocol decisions accumulate against the CV estimate, so the
   last word comes from data no fold ever saw
   (see train-test-discipline).
6. **Match the final refit to the protocol.** Standard practice:
   select config by CV, refit on all training data with that config,
   confirm on test. For iterative learners early-stopped per fold,
   set the final iteration count from the folds' median rather than
   re-early-stopping on test.

## Boundaries

- At large data scale, a single well-constructed temporal/group split
  estimates as well as CV at a tenth the compute; CV's value
  concentrates where data is scarce.
- CV variance understates true uncertainty when folds share an
  entity, a time regime, or collection artifacts; the scheme can only
  respect boundaries you know to encode.
- Leave-one-out is high-variance and expensive for most learners;
  prefer K=5-10 unless a statistical reason says otherwise.

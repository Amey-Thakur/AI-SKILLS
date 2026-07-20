---
name: imbalanced-data
description: Handle skewed classes with threshold moving, weighting, and PR-based evaluation instead of reflexive resampling. Use when the positive class is rare and accuracy looks deceptively high.
---

# Imbalanced data

With 1% positives, "always predict negative" scores 99% accuracy. The
cure is rarely synthetic data; it is evaluating correctly, weighting
costs, and choosing the operating threshold deliberately.

## Method

1. **Fix the evaluation first.** PR curves and PR-AUC, precision and
   recall at the deployment threshold, per the cost table from
   ml-problem-framing; never accuracy, and treat ROC-AUC with
   suspicion at heavy skew (it barely moves when false positives
   grow by thousands against a huge negative pool). Keep the test
   set at the *natural* imbalance whatever you do to train (see
   train-test-discipline).
2. **Move the threshold before touching the data.** A well-calibrated
   model at natural imbalance plus a cost-derived threshold
   (minimize expected cost on validation) solves many "imbalance
   problems" outright. Sweep the threshold, plot cost vs threshold,
   pick the minimum; revisit when costs or base rates change.
3. **Weight before you resample.** Class weights
   (inverse-frequency or cost-ratio) in the loss are equivalent to
   oversampling without duplicating rows, supported natively by most
   learners (`class_weight`, `scale_pos_weight`). This is the
   default second move; it changes nothing about the data pipeline.
4. **Resample only with care, inside the fold.** Random undersampling
   of negatives works at massive scale (and speeds training);
   SMOTE-class synthesis helps sometimes on tabular data and harms
   whenever synthetic points cross the true boundary. All resampling
   fits inside cross-validation folds on train only; resampling
   before splitting leaks duplicated/synthetic neighbors into test
   (see cross-validation).
5. **Recalibrate after any reweighting.** Weights and resampling
   distort predicted probabilities away from true base rates; if
   probabilities feed thresholds or expected values, recalibrate on
   an untouched validation slice (see model-evaluation calibration).
6. **Buy more positives where it is cheapest.** Longer time windows,
   related-event labels, hard-negative mining to sharpen the
   boundary, or targeted labeling of model-uncertain cases (active
   learning); a hundred real positives beat ten thousand synthetic
   ones. At extreme rarity (<0.01%), reconsider the frame: anomaly
   detection or tiered rules-then-model funnels (see
   ml-problem-framing).

## Boundaries

- Imbalance is not the problem when both classes are plentiful in
  absolute terms; a 1:100 ratio with a million positives needs
  nothing special.
- If the minority class is undersampled *in collection* (label bias,
  censoring), no algorithm recovers what was never observed; that is
  a data acquisition problem.
- Base rates drift; a threshold tuned at 1% positives misfires at 3%
  (see drift-monitoring), so monitor the rate itself.

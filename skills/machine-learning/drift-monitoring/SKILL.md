---
name: drift-monitoring
description: Detect input, prediction, and performance drift with reference windows and act through retrain or rollback triggers. Use when operating models in production or diagnosing gradual quality decay.
---

# Drift monitoring

Models decay silently: the world changes, inputs shift, and accuracy
erodes long before anyone complains. Monitoring layers three signals by
label latency, because ground truth is usually late or missing.

## Method

1. **Monitor performance directly where labels arrive.** Rolling
   metric on recent labeled outcomes (the same metric and slices as
   the offline eval; see model-evaluation), against the shipped
   baseline. This is the truth; the other layers exist because truth
   is often days-to-never late (label latency mapped in
   ml-problem-framing).
2. **Watch prediction drift as the early warning.** Score/prediction
   distribution vs a reference window (launch period or trailing
   stable month): population stability index, mean score, positive
   rate. A fraud model whose flag rate doubles overnight is telling
   you something broke upstream or the world moved; it fires days
   before labeled metrics can.
3. **Watch input drift per feature, ranked by importance.** Null
   rates, out-of-range values, category share shifts, distribution
   distances (PSI/KS) on the top features (see feature-engineering).
   Sudden input drift is usually a *pipeline* bug (schema change,
   broken join, unit change: see schema-evolution) wearing a
   statistics costume; check data quality before blaming the world
   (see data-quality-checks).
4. **Choose references and thresholds deliberately.** Fixed reference
   (training distribution) detects total drift; trailing reference
   detects sudden change while tolerating slow drift: run both.
   Calibrate alert thresholds on historical variance (seasonality is
   not drift; weekends are not incidents), start warn-only for two
   weeks, and slice drift by segment: aggregate stability can hide
   one region on fire (see data-quality-checks alert discipline).
5. **Bind alerts to actions in advance.** Input anomaly: page the
   data owner, check pipelines. Prediction drift past X: investigate,
   consider threshold re-tuning (base-rate moves; see
   imbalanced-data). Performance below the floor: trigger the
   retrain runway or roll back to a previous model (see
   model-deployment). A drift dashboard without an action table is
   weather reporting.
6. **Close the loop with scheduled evaluation.** Even absent alerts,
   re-evaluate on fresh labeled data monthly/quarterly and retrain on
   a cadence justified by measured decay speed, not by habit; each
   retrain travels the full gated deployment path, and its win is
   verified against the incumbent (see ml-baselines, ab-test-design).

## Boundaries

- Drift detection flags change, not cause; concept drift (the
  input-output relationship moved) needs retraining, while covariate
  shift sometimes only needs threshold recalibration: diagnose via
  ml-error-analysis before spending the retrain.
- Feedback loops (the model's own actions shape future data: lending,
  ranking) bias every monitored signal; where stakes justify it, hold
  out a small randomized slice as an unbiased measurement channel.
- Retraining on drifted-and-unlabeled data via pseudo-labels
  compounds errors; do not automate retrain-on-drift without a
  labeled gate.

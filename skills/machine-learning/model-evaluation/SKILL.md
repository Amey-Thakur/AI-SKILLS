---
name: model-evaluation
description: Evaluate models with cost-aligned metrics, slice analysis, calibration, and uncertainty, not a single accuracy number. Use when choosing evaluation metrics or judging whether a model is fit to ship.
---

# Model evaluation

One number cannot summarize a model. A shippable evaluation answers
four questions: does it rank/score well overall, where does it fail,
are its probabilities honest, and is the improvement real rather than
seed noise.

## Method

1. **Derive the metric from the error costs.** From ml-problem-framing's
   cost table: imbalanced detection tasks get precision/recall and
   PR-AUC (ROC-AUC flatters when negatives dominate; see
   imbalanced-data); ranking tasks get NDCG/recall@k at the k the UI
   shows; regression gets the loss whose shape matches cost (MAE for
   linear cost, quantile loss for asymmetric). Accuracy is almost
   never the deployment metric.
2. **Evaluate at the operating point.** Pick the threshold from costs
   on validation, then report test precision/recall *at that
   threshold* alongside threshold-free curves. Shipping decisions
   happen at a point, not along a curve; a model can win on AUC and
   lose at your threshold.
3. **Slice before you celebrate.** Metrics by segment (geography,
   device, tenure, value tier, and any protected or policy-relevant
   groups), by time period, and on the hardest known cohorts. Aggregate
   wins hiding a critical-slice regression are how models pass review
   and fail in the field; set minimum bars per key slice, not just
   overall (see ml-error-analysis for finding the bad slices).
4. **Check calibration if anyone reads the probabilities.** Reliability
   curve plus Brier score or ECE: a "0.9" that is right 70% of the
   time poisons every downstream threshold, expected-value
   calculation, and human trust. Post-hoc calibration (Platt/isotonic
   on validation) is cheap; skipping the check is not.
5. **Compare with uncertainty against the baseline.** Bootstrap CIs on
   the metric delta vs the current system (see ml-baselines), multiple
   seeds for training-stochastic models; a delta inside the noise band
   is a tie, and ties go to the simpler model. Report compute/latency
   alongside: +0.3 AUC-points at 10x inference cost is often a loss
   (see model-deployment budgets).
6. **Write the evaluation before the experiment.** Metric, slices,
   threshold policy, and ship bar recorded up front
   (see experiment-tracking); evaluations designed after seeing
   results inherit the researcher's optimism. Behavioral tests
   (invariance and directional checks: perturb an irrelevant field,
   prediction must not move) join the suite as regression gates for
   retrains (see llm-eval-design for the generative-model analog).

## Boundaries

- Offline evaluation estimates model quality, not business impact;
  the decision's value is measured online (see ab-test-design), and
  offline-online rank disagreement is common enough to plan for.
- Metrics on the frozen test set decay as the world drifts; a passing
  eval from last quarter is not evidence for today (see
  drift-monitoring).
- Fairness metrics conflict mathematically; choosing which to satisfy
  is a policy decision to make explicitly with stakeholders, not a
  default to inherit from a library.

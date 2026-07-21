---
name: feature-engineering-tabular
description: Engineer features for tabular models (aggregations, encodings, interactions) that add signal without leaking. Use when building features for a tabular ML or Kaggle problem, where features often matter more than the model.
---

# Feature engineering (tabular)

On tabular problems, feature engineering usually beats model choice: a
gradient-boosted model on great features wins over a tuned one on raw
columns. The craft is manufacturing signal the model cannot see itself,
while never letting the future or the target leak in.

## Method

1. **Build aggregation features.** Group-by statistics are the tabular
   workhorse: per-user mean/count/max, per-category frequency, ratios and
   differences between related columns. "Average transaction amount for
   this user" or "this value versus the category median" gives the model
   context a single row lacks. Time-windowed aggregations (last 7/30 days)
   add the temporal dimension.
2. **Encode categoricals by cardinality.** Low-cardinality: one-hot.
   High-cardinality (user id, merchant, zip): target/mean encoding computed
   out-of-fold to avoid leakage, frequency encoding, or leave them to a
   model that handles categoricals natively (LightGBM, CatBoost). Never
   label-encode a nominal for a linear model (it invents a false order).
3. **Respect the point-in-time rule absolutely.** Every feature for a row
   must use only information knowable at that row's prediction moment. Target
   encoding computed on the full data, aggregations including the current
   row, or any feature derived from after the prediction time is leakage
   (see train-test-discipline). Compute encodings within cross-validation
   folds, on the training portion only.
4. **Create interactions and transformations where they help.** Products,
   ratios, and differences of features can expose relationships (price per
   square foot, debt-to-income); transformations (log for skew, binning)
   help linear models and sometimes trees. Domain knowledge suggests the
   interactions that matter more than blind combinatorics.
5. **Handle missingness as information.** For tree models, leave NaN and let
   the model learn the split, or add an explicit "was-missing" indicator
   plus a fill: the fact of missingness often predicts (see data-cleaning).
   Do not impute away a signal-carrying pattern.
6. **Validate that a feature actually helps, out-of-fold.** Add features and
   check they improve cross-validated performance (see cross-validation),
   not training score (which every feature inflates). A feature that helps
   train but not validation is memorization or leakage. Prune features that
   do not earn their place (see ml-error-analysis).

## Boundaries

- Feature engineering serves the model and the metric; it is not an excuse
  to generate thousands of features and hope. Each should have a rationale
  and prove itself out-of-fold, or it is noise and overfitting risk.
- Deep learning on raw-ish inputs shifts effort to representation rather
  than hand-crafting; but for tabular data, engineered features still win,
  and the point-in-time and leakage rules apply to any auxiliary feature.
- Train/serve skew is the production danger: a feature engineered offline
  must be computable identically at serving time, or the model degrades
  silently (see the ML-side feature-engineering skill, model-deployment).

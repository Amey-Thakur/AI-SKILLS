---
name: data-cleaning
description: Clean and prepare messy data (missing values, outliers, types, duplicates) with decisions that preserve signal and avoid leakage. Use when raw data needs to be made analysis-ready without corrupting it.
---

# Data cleaning

Real data is dirty: missing, duplicated, mistyped, inconsistent. Cleaning
is not mechanical; every choice (drop this, impute that, cap the outlier)
is a decision that can preserve or destroy signal, and some cleaning steps
leak the future into the past. Clean deliberately, documenting why.

## Method

1. **Understand before you clean.** Do EDA first (see
   exploratory-data-analysis) so you know what "dirty" means here and why:
   cleaning blind (drop all rows with any null, cap everything at the 99th
   percentile) destroys signal you did not know was there.
2. **Handle missing values by their meaning.** Missing-at-random can be
   imputed (median for skewed numerics, a constant plus a "was-missing"
   indicator flag often beats fancy imputation); missing-with-meaning (no
   subscription = null plan) is its own category, not a value to fill.
   Dropping rows is fine when few and random, dangerous when missingness
   correlates with the target (see the missingness discussion in
   feature-engineering-tabular).
3. **Treat outliers as errors or extremes, deliberately.** Confirmed data
   errors (impossible values, typos) get fixed or removed; genuine extremes
   get kept, capped, or transformed depending on the model's sensitivity
   (tree models tolerate outliers; linear and distance-based do not).
   Never silently delete extremes that are real data (see
   exploratory-data-analysis step 3).
4. **Fix types and standardize.** Parse dates as dates, numbers as numbers
   (strip currency symbols, thousands separators), and standardize
   categorical values (unify "USA"/"US"/"United States", trim whitespace,
   normalize case). Inconsistent categories fragment signal across
   duplicate levels.
5. **Deduplicate carefully.** Find true duplicates (same entity recorded
   twice) versus legitimate repeats (same value, different events). Dedupe
   on the keys that define uniqueness, not blindly on all columns, and know
   which record to keep (see idempotency thinking in data-pipeline-design).
6. **Fit cleaning on train only, apply to all.** Imputation values, scaling
   parameters, and category mappings are learned from the training data
   and applied to validation/test, never fit on the full dataset. Fitting a
   median-imputer on all data before splitting leaks test information into
   training (see train-test-discipline, feature-engineering-tabular).

## Boundaries

- Cleaning transforms data; log what you changed and why, because the
  cleaning decisions are part of the analysis and affect the result. "We
  dropped the outliers" is a choice a reviewer must be able to see and
  question.
- Over-cleaning (aggressive outlier removal, heavy smoothing) can erase the
  very signal or rare-but-important cases you care about (fraud, failures).
- Cleaning does not fix a biased or unrepresentative sample; a spotless
  dataset drawn wrong is still wrong (see the sampling caution in
  statistical-inference, correlation-causation).

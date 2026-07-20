---
name: feature-engineering
description: Build features that are leakage-free, temporally correct, and reproducible between training and serving. Use when creating model inputs or auditing a suspiciously good offline score.
---

# Feature engineering

The two questions that matter for every feature: was this value
knowable at prediction time, and will serving compute it identically to
training? Leakage and skew kill more models than weak features do.

## Method

1. **Apply the point-in-time rule to everything.** Each feature for a
   training row must use only data from before that row's prediction
   moment: aggregate with time-bounded windows ending at the event
   (`orders in prior 30d as of t`), join dimension tables as-of the
   event time (Type 2 history; see warehouse-modeling), and never
   compute normalization statistics over the full dataset before
   splitting (see train-test-discipline).
2. **Hunt leakage proactively.** Red flags: features derived from the
   outcome's paper trail (refund fields on a fraud label), post-event
   updates in mutable columns (status, totals), and any feature whose
   importance is suspiciously dominant. Test: a model scoring far
   above the baseline's plausible ceiling has leakage until proven
   otherwise; audit top features' timestamps first (see
   ml-error-analysis).
3. **Encode by cardinality and semantics.** Low-cardinality
   categoricals: one-hot. High-cardinality (merchants, SKUs): target
   encoding computed out-of-fold with time discipline, hashing, or
   learned embeddings; never label-encode nominals for linear models.
   Numerics: scale for distance/gradient models (fit scaler on train
   only), bin or spline only with a reason; tree ensembles need
   neither scaling nor one-hot for ordered splits.
4. **Decide missingness meaning.** Missing-at-random gets imputation
   (median plus an is_missing flag beats fancy imputation in
   practice); missing-with-meaning (no credit history) is its own
   category, not a value to fill in. Impute inside the pipeline so
   serving repeats it exactly.
5. **Make train and serve share one definition.** Feature logic lives
   once: a shared transformation library, or a feature store serving
   both offline (point-in-time correct backfills) and online
   (low-latency current values). Reimplementing pandas logic in the
   service by hand is how training/serving skew ships; where duplication
   is unavoidable, add an equivalence test comparing both paths on
   sampled entities.
6. **Version features like code.** Definitions in the repo, reviewed;
   materialized features carry a version; models record which feature
   versions they trained on (see experiment-tracking). "Which
   definition of days_since_signup did prod use in March" must be
   answerable.

## Boundaries

- Deep models on raw-ish inputs (text, images, sequences) shift effort
  from hand-crafting to representation choice; the point-in-time and
  skew rules still apply to every auxiliary feature.
- Feature selection is subordinate: drop features that leak, cost too
  much at serving, or add ops risk; do not micro-optimize importance
  rankings that shuffle between seeds.
- A feature store is infrastructure with real cost; adopt it for the
  skew and reuse problems, not as a default (see
  managed-vs-selfhosted reasoning).

---
name: incremental-processing
description: Process only new and changed data with watermarks, merge strategies, and a full-refresh escape hatch. Use when full-table rebuilds get slow or costly and models must go incremental.
---

# Incremental processing

Incremental means trading rebuild simplicity for delta bookkeeping.
The bookkeeping has exactly three parts: how you detect new data, how
you merge it, and how you recover when either is wrong.

## Method

1. **Go incremental at measured pain, not by default.** Full rebuilds
   are self-healing (every run fixes everything); switch a model only
   when its build time or cost crosses your threshold. Small
   dimensions stay full-refresh forever; giant fact and event tables
   are the incremental candidates.
2. **Detect deltas with a trustworthy cursor.** Options in order of
   reliability: CDC streams (see change-data-capture), append-only
   event time with a high-watermark, `updated_at` columns (only if
   the source actually maintains them: verify, do not assume), else
   snapshot-diff. Persist the watermark transactionally with the
   run's success so a crashed run resumes, not skips.
3. **Overlap the watermark for late data.** Reprocess a trailing
   window (`WHERE event_time > watermark - interval 'N days'`) sized
   from measured late-arrival distribution (see data-pipeline-design
   late-data policy). The merge makes the overlap idempotent; the
   window makes lateness harmless.
4. **Choose the merge by key behavior.** Append-only (immutable
   events): insert new partitions, cheapest. Upsert/MERGE on unique
   keys (mutable entities): handles updates, needs the key to truly
   be unique. Delete+insert by partition: when updates cluster in
   recent partitions. Deletes at the source need CDC or soft-delete
   flags; diff-based delete detection at scale is a full scan in
   disguise.
5. **Keep the full-refresh lever oiled.** Every incremental model
   must support a forced full rebuild from raw (schema change, logic
   change, corruption); test it quarterly on the big tables, know
   its cost and duration. An incremental model without a working
   full-refresh is one bug away from permanent drift.
6. **Audit for drift on a schedule.** Periodic reconciliation between
   incremental output and a sampled fresh computation (counts, sums
   by partition; see data-quality-checks); silent drift from missed
   deltas is incremental processing's signature failure and it never
   announces itself.

## Boundaries

- Non-additive transformations (window functions over all history,
  global dedup) resist partition-local incrementality; restructure
  the model or accept periodic full rebuilds for those layers.
- Streaming incremental (continuous) shares the watermark/merge logic
  with tighter latency and its own engine semantics (see
  batch-vs-streaming); do not hand-build streaming on cron.
- Late data beyond your overlap window is a product decision
  (restate history or ignore), not an engineering one; get it in
  writing (see data-retention for restatement policy adjacency).

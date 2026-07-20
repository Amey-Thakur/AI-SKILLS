---
name: data-pipeline-design
description: Build data pipelines that rerun safely, backfill cleanly, and tolerate late data. Use when designing batch or streaming pipelines or fixing ones that need manual babysitting.
---

# Data pipeline design

A pipeline is production software whose test is: can you rerun any day
of it, twice, a year later, and get the same correct table? Everything
here serves that rerun.

## Method

1. **Make runs idempotent by partition overwrite.** Each run owns a
   partition (usually a date/hour) and replaces it wholesale
   (INSERT OVERWRITE / delete-then-write / swap), never appends
   blindly. Rerun = same output; the alternative is dedup archaeology
   after every incident.
2. **Parameterize by logical date, not wall clock.** The run processes
   `execution_date`'s data regardless of when it runs; `now()` inside
   transforms is how backfills produce garbage. This one rule makes
   backfilling a loop over dates instead of a special project (see
   clock-skew for the general principle).
3. **Decide the late-data policy per source.** Watermark + lookback
   (reprocess the trailing N days each run), or land-then-reconcile
   (raw immutable landing zone, corrections flow to marts). Data
   always arrives late; a pipeline without a stated policy has the
   policy "silently wrong".
4. **Stage raw, transform from staged.** Land source data immutable
   and cheap (see cloud-storage-selection) before any transformation;
   every downstream table must be rebuildable from the landing zone.
   When logic changes or a bug is found, you replay from raw instead
   of begging the source for a re-export.
5. **Express dependencies as a DAG with real signals.** Downstream
   runs when upstream's partition is complete (sensor on the
   partition/success marker, not a fixed 3am hope; see
   pipeline-orchestration). Retries with backoff on transient
   failures, hard-fail with alerting on logic errors: distinguishing
   the two is the difference between self-healing and silent
   corruption.
6. **Gate outputs with quality checks.** Row counts vs history,
   null/duplicate-key rates, freshness (see data-quality-checks)
   between transform and publish; fail the run rather than publish a
   bad partition. Consumers forgive lateness; they do not forgive
   wrong.
7. **Backfill as a rehearsed operation.** Bounded parallelism (do not
   flatten the warehouse), ordered by dependency, progress tracked,
   and cost-estimated before launch: a year's backfill at full
   cluster is a budget event (see cloud-cost-optimization).

## Boundaries

- Streaming pipelines share the principles (idempotency, late data,
  raw retention) with different machinery; the batch-vs-streaming
  decision comes first (see batch-vs-streaming).
- Pipelines move and shape data; modeling what the tables mean is
  warehouse-modeling, and contracts with producers are
  schema-evolution.
- A pipeline nobody owns rots in a quarter; every DAG carries an
  owner and an SLA or it is a liability, not an asset.

---
name: materialized-views
description: Precompute expensive read queries into materialized views and pick a refresh strategy that fits a stated staleness budget. Use when an aggregate or join is read far more than the underlying data changes and recomputing it per request is too slow.
---

# Materialized views

Some reads are expensive because they aggregate or join across millions of
rows, and cheap to serve if the answer is already computed. A materialized
view stores that answer as a real table and refreshes it on a schedule. The
trade is explicit: you accept bounded staleness to turn a slow scan into a
fast lookup. Get the refresh wrong and you serve confidently wrong numbers.

## Method

1. **Confirm the read-to-write ratio justifies it.** Materialize when the query
   is read often and the inputs change rarely relative to reads: a daily sales
   rollup read thousands of times, not a value that changes every write and is
   read once. If writes outpace reads, the refresh cost dominates.
2. **Write down the staleness budget first.** State how old the data may be:
   "leaderboard may lag 60 seconds", "finance rollup refreshes nightly". This
   single number drives the refresh choice and sets expectations before anyone
   files a bug about a stale total.
3. **Match the refresh mechanism to the budget.** For Postgres, a full
   `REFRESH MATERIALIZED VIEW` locks reads unless you use `CONCURRENTLY`, which
   needs a unique index and does more work. Schedule it with `pg_cron` or a
   job runner. For sub-minute budgets, incremental tools like `pg_ivm` or a
   trigger-maintained summary table beat full recompute.
4. **Refresh incrementally when the view is large.** Recomputing 50M rows every
   minute is waste. Maintain only the changed partitions or use a delta table
   keyed by a high-water mark (`WHERE updated_at > last_run`) so each refresh
   touches recent rows, not the whole history.
5. **Serve reads against the view, and monitor refresh lag.** Point the query
   at the view, and track the age of the last successful refresh as a metric.
   Alert when lag exceeds the staleness budget so a stuck refresh surfaces
   before users notice the numbers froze.
6. **Plan the failure and the backfill.** Decide what a failed refresh serves:
   the last good snapshot, usually, not an empty view. Keep the recompute
   idempotent so a rerun after a failed job produces the same result.

## Checks

- Is the read-to-write ratio high enough that precompute beats on-demand?
- Is the staleness budget written as a number, and does a metric alert on it?
- Does the refresh touch only changed data once the view grows large?
- On a failed refresh, do reads still get the last good snapshot?

## Boundaries

This precomputes at the database layer with scheduled refresh. On-demand
key-value caching of query results belongs to caching-strategy, and clearing
those entries to cache-invalidation. Deciding the target latency itself is a
product call, not a refresh mechanic.

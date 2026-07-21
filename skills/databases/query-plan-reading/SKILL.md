---
name: query-plan-reading
description: Read EXPLAIN ANALYZE output to find the real cause of a slow query and fix the right thing. Use when a query is slow and you need to know why before changing indexes or SQL.
---

# Query plan reading

The query planner tells you exactly how it executes a query and where
the time goes; a slow query is a solved problem once you read its plan.
The mistake is guessing (adding an index, rewriting SQL) without
reading the plan first, and fixing something that was not the
bottleneck.

## Method

1. **Get the real plan with actual numbers.** `EXPLAIN
   ANALYZE` (not just `EXPLAIN`, which estimates): it runs
   the query and reports actual rows and time per node.
   Read it against realistic data volume (a plan on ten dev
   rows tells you nothing about ten million: see test-
   environment-parity); the planner's choices change with
   size.
2. **Find the expensive node.** Plans are trees; read for
   the node consuming the most time and the one processing
   the most rows. The costly operations to spot: sequential
   scans on large tables (missing or unused index: see
   indexing-strategy), nested loops over big row counts,
   large sorts and hashes spilling to disk, and rows
   examined vastly exceeding rows returned (scanning much,
   keeping little).
3. **Compare estimated vs actual rows.** A large gap between
   the planner's estimate and the actual row count means
   stale statistics or a bad estimate, which leads the
   planner to choose the wrong plan (a nested loop where a
   hash join was right). The fix may be updating statistics
   (`ANALYZE`) rather than touching the query: read the gap
   before rewriting.
4. **Confirm the index is used, and why not if not.** A
   sequential scan where you expected an index means: the
   index does not match the query (wrong column order: see
   indexing-strategy), a function wraps the column
   (`WHERE lower(email) = ?` defeats an index on email), an
   implicit type cast, or the planner judged the scan
   cheaper (low selectivity: it may be right). The plan
   shows which; do not add a second index before
   understanding why the first was skipped.
5. **Fix the cause the plan identifies.** Sequential scan on
   a selective filter: add or fix the index. Huge sort: an
   index providing the order, or less data to sort. Nested
   loop over many rows: usually a statistics or join-order
   problem. Rows-examined >> rows-returned: a more selective
   index or a rewritten predicate. Match the fix to the
   node, then re-run EXPLAIN ANALYZE to confirm it worked
   (see sql-optimization).
6. **Verify the fix and watch for regressions.** Re-plan
   after the change (the improvement should show in the
   plan and the time); keep the before/after plans; and
   remember plans change as data grows and statistics
   shift, so a query fast today can regress (see
   pagination-performance, materialized-views for
   structural fixes when tuning hits its limit).

## Boundaries

- Reading the plan finds where time goes; it does not
  decide whether the query should exist (an N+1 pattern is
  a code problem, not a plan problem: see n-plus-one-
  queries, orm-tradeoffs). Sometimes the fix is upstream.
- Planner behavior is engine-specific (Postgres, MySQL,
  and others differ in operators and hints); the *method*
  (read the plan, find the expensive node, fix the cause)
  transfers, the exact output does not.
- Some slowness is structural (too much data scanned no
  matter the index): the answer is then partitioning,
  materialized views, or a different data model (see
  data-partitioning, warehouse-modeling), not more index
  tuning.

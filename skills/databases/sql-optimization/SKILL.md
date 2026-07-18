---
name: sql-optimization
description: Diagnose and fix slow SQL with the query plan as evidence, not folklore. Use when a query is slow, a table scan appears, or database load climbs.
---

# SQL optimization

Optimize from the plan, not from vibes. Every database ships an
`EXPLAIN`; folklore fixes applied without it make some queries faster and
others quietly worse.

## Method

1. **Measure the actual query** with real parameters and production-like
   data volume. A query fast on 1k dev rows tells you nothing about 10M.
   Capture: rows examined vs rows returned, time, and the plan
   (`EXPLAIN ANALYZE` where available).
2. **Read the plan for the expensive truth.** The usual suspects, in the
   order they pay off:
   - *Full scan where a seek belongs*: filter or join column lacks a
     usable index, or the predicate defeats it (function on the column,
     leading wildcard, implicit type cast).
   - *Examined ≫ returned*: thousands read to return ten: missing
     composite index, or filtering happens after the join instead of in it.
   - *Sort or hash spilling*: `ORDER BY`/`GROUP BY`/`DISTINCT` on an
     unindexed expression over a large set.
   - *N+1 at the application seam*: one query per row in a loop; the plan
     looks fine, the trace shows 400 of them.
3. **Fix in this order, cheapest first:**
   - Rewrite the predicate to be index-friendly (move the function to the
     constant side; match types exactly).
   - Add or extend a composite index: equality columns first, then the
     range column, then covering columns if the engine supports them. One
     good composite beats three single-column indexes.
   - Restructure the query: select only needed columns, filter before
     joining, replace correlated subqueries with joins or window functions,
     paginate by keyset (`WHERE id > ?`) not `OFFSET` at depth.
   - Only then reach for denormalization, materialized views, or caching , 
     real costs that need the earlier steps ruled out.
4. **Verify against the same measurement,** same data, same parameters.
   Then check the write side: every index taxes every insert and update on
   that table. An index that saves one report and slows every checkout is
   a bad trade.

## Rules

- Never claim a fix without before/after numbers from comparable data.
- Distrust `SELECT *` on principle: it defeats covering indexes and widens
  every row on the wire.
- A query that cannot be made fast may be the wrong question: say so and
  propose the schema or access-pattern change honestly.

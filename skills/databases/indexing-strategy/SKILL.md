---
name: indexing-strategy
description: Design indexes from query patterns with correct column order, covering indexes, and write-cost awareness. Use when queries are slow or a table has too many or too few indexes.
---

# Indexing strategy

An index trades write cost and storage for read speed. The craft is
indexing the queries you actually run, in the column order they filter,
without accumulating indexes that slow every write and that nothing
uses. Start from the query, not the table.

## Method

1. **Index from the query workload, not the schema.** Look
   at the actual slow and frequent queries (see query-plan-
   reading): what they filter on (WHERE), join on, and sort
   by (ORDER BY) is what to index. Indexing every column
   "to be safe" slows writes and wastes space; the right
   indexes come from the read patterns.
2. **Order composite index columns: equality, then range,
   then sort.** A multi-column index on (status, created_at)
   serves `WHERE status = ? AND created_at > ?` and
   `ORDER BY created_at` within a status; the reverse order
   does not. Equality-filtered columns first, then the range
   or sort column: getting the order wrong means the index
   is not used for the query you built it for (see query-
   plan-reading to verify).
3. **Cover the query where the win justifies it.** An index
   that includes all columns a query needs (INCLUDE clause,
   or all columns in the index) lets the database answer
   from the index alone, skipping the table lookup: a large
   speedup for hot read-only queries, at the cost of a
   wider index. Reserve covering indexes for queries where
   the profiling shows the table lookup dominates.
4. **Account for the write cost.** Every index is updated on
   every insert/update/delete of its columns: a table with
   ten indexes writes ten-plus times the index maintenance.
   High-write tables need lean indexing; the balance is
   read speedup vs write tax, measured, not assumed (see
   connection-pooling, io-optimization for where write cost
   surfaces).
5. **Audit and remove unused indexes.** Databases track
   index usage; indexes nothing queries are pure cost
   (write overhead, storage, and they mislead the planner).
   Periodically drop the unused and the redundant (an index
   on (a) is redundant with one on (a, b)): index cleanup
   is as much of the strategy as index creation.
6. **Know your index types and selectivity.** B-tree for
   most (range, equality, sort); hash for equality-only;
   GIN/GiST for full-text, arrays, JSON, geospatial (see
   time-series-data, nosql-modeling for specialized needs);
   partial indexes for a hot subset (`WHERE active = true`).
   Low-selectivity columns (a boolean over millions of
   rows) rarely benefit from a plain index: the planner
   scans anyway.

## Boundaries

- Indexes speed reads at write cost; write-heavy workloads
  and the read-vs-write balance decide how much indexing
  is worth it (see the OLTP-vs-OLAP tension in warehouse-
  modeling).
- Over-indexing is as real a problem as under-indexing:
  more indexes is not more performance, it is more write
  cost and a confused planner. Add from evidence, remove
  from evidence.
- Index design interacts with the schema and query
  structure; sometimes the fix is rewriting the query or
  the schema (see sql-optimization, query-plan-reading),
  not adding an index.

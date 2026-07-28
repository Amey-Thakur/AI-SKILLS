---
name: sql-set-operations
description: Combine result sets with UNION, INTERSECT, and EXCEPT, and know when a join or an exists clause is the better tool. Use when merging or comparing two query results rather than two tables.
---

# SQL set operations

Set operations stack result sets vertically, where joins widen them
horizontally. They are the right tool for combining like-shaped results
and for asking what is in one set and not the other, and the wrong tool
for enriching rows.

## Method

1. **Prefer UNION ALL unless you need deduplication.** UNION sorts or
   hashes to remove duplicates, which costs real time on large sets. If
   duplicates are impossible, say so with ALL.
2. **Match the column list exactly.** Same count, same order, compatible
   types. Positional matching means a reordered select in one branch
   produces plausible, wrong output rather than an error.
3. **Use EXCEPT to find what is missing.** It answers which rows in the
   first set have no counterpart, and it reads more clearly than an
   anti-join when both sides are already query results.
4. **Remember set operations compare whole rows.** INTERSECT and EXCEPT
   consider every selected column, so including an extra column changes
   the answer entirely.
5. **Order once at the end.** An ORDER BY applies to the combined
   result, and ordering inside branches is meaningless without a limit.
6. **Reach for EXISTS when you only need a test.** Checking whether a
   related row exists is cheaper and clearer than building and comparing
   sets (see sql-joins).

## Boundaries

- Set operations need like-shaped results; combining differently shaped
  data means a join or a rework of the query.
- INTERSECT and EXCEPT treat nulls as matching for these purposes, which
  differs from ordinary comparison (see null-semantics).
- Support varies: some engines lack INTERSECT and EXCEPT and need an
  anti-join instead.

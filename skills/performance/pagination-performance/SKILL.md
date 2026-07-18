---
name: pagination-performance
description: Paginate large result sets so page cost stays constant by using keyset (cursor) pagination instead of OFFSET, with a stable, encoded cursor. Use when deep pages get slow, an infinite scroll drifts or duplicates rows, or OFFSET grows with page depth.
---

# Pagination performance

`OFFSET 100000 LIMIT 20` makes the database read and discard 100,020 rows to
return 20: the deeper the page, the slower it gets, and concurrent inserts shift
rows under the reader. Keyset pagination fixes both by seeking to a remembered
position instead of counting from the start. Page cost stops depending on how
far in you are.

## Method

1. **Diagnose the OFFSET cost.** `EXPLAIN ANALYZE` a deep page and watch rows
   scanned climb with the offset while the limit stays fixed. That linear growth,
   plus duplicate or skipped rows under concurrent writes, is the signal to
   abandon offset.
2. **Paginate by keyset on a stable ordered column.** Order by a unique,
   monotonic key and carry the last row's value forward:
   `WHERE (created_at, id) < (:last_ts, :last_id) ORDER BY created_at DESC, id
   DESC LIMIT 20`. The index seeks straight to the boundary, so page 10,000
   costs what page 1 did.
3. **Break ties with a unique tiebreaker.** Order on a non-unique column alone (a
   timestamp) and rows sharing a value straddle the boundary, dropping or
   repeating on the seam. Append the primary key to make the sort total, and
   compare as a tuple (row value) so the boundary is exact.
4. **Encode the cursor opaquely and completely.** Return an opaque token (base64
   of the sort-key tuple), not a raw offset, so clients cannot fabricate
   positions and you can evolve the shape later. Include every column the
   ORDER BY uses; a cursor missing the tiebreaker cannot seek correctly.
5. **Match the index to the sort exactly.** The composite index must cover the
   ORDER BY columns in the same order and direction, or the database sorts on the
   fly and the seek advantage is lost. Verify the plan uses an index scan, not a
   sort node above it.
6. **Give up offset-only features honestly.** Keyset offers next and previous,
   not jump-to-page-500 or an exact total; a full `COUNT(*)` on a large table is
   its own scan. Offer next-page and an estimated count, or keep offset only for
   shallow admin views where depth is bounded.

## Signals

- Does `EXPLAIN` show constant rows scanned per page regardless of depth?
- Is the sort key unique, or backed by a tiebreaker that makes it total?
- Does the cursor encode every ORDER BY column and resist client tampering?
- Does the index match the sort's columns and direction so no extra sort runs?

## Boundaries

This is about page-fetch cost and cursor correctness. General index and query
tuning is sql-optimization; caching hot first pages is caching-strategy.
Jump-to-arbitrary-page and exact live totals are product trade-offs keyset
deliberately gives up, not defects to fix here.

---
name: api-pagination-design
description: Design pagination with cursors for stable ordering, sensible page limits, and awareness of total-count cost. Use when adding pagination to a list endpoint or fixing duplicate or skipped items under load.
---

# API pagination design

Any list endpoint that can grow needs pagination, and the choice
between cursor and offset determines whether it stays correct as data
changes. Offset pagination is simple and wrong under concurrent
modification; cursor pagination is slightly more work and stable, which
is why serious APIs use it.

## Method

1. **Default to cursor pagination for stability.** A cursor
   encodes "where the last page ended" (an opaque token
   over the sort key); the next page continues from there,
   so inserts and deletes between page fetches do not
   duplicate or skip items. Offset pagination (`LIMIT 20
   OFFSET 40`) skips or repeats items when rows shift under
   it (a new item at the top pushes everything down a slot):
   the classic "I saw the same item twice while scrolling"
   bug (see the connections pattern in graphql-schema-
   design).
2. **Base cursors on a stable, unique sort.** The cursor
   must encode a total ordering (a unique column, or a
   composite like `(created_at, id)` to break ties): sorting
   by a non-unique column alone makes the cursor ambiguous
   at boundaries. The sort must be stable across requests
   (see indexing-strategy: the sort column wants an index,
   or every page is a scan).
3. **Set and enforce page-size limits.** A default page size
   and a maximum (reject or clamp larger requests): so a
   client cannot request a million items in one call and
   exhaust the server (see backpressure, request-validation).
   The client asks for a page size within bounds; unbounded
   list endpoints are a denial-of-service and a memory
   problem.
4. **Treat total counts as expensive, make them optional.**
   Counting all matching rows can be as costly as the query
   itself on large tables (a full scan: see query-plan-
   reading); do not compute it on every page by default.
   Offer it as an opt-in, use an estimate where exactness is
   not needed, or provide "has more" (cheaper: fetch one
   extra) instead of a precise total. Many clients want
   "next page" not "page 47 of 3,912".
5. **Return pagination metadata consistently.** A predictable
   envelope: the items, a next-page cursor (null when
   done), and optionally a previous cursor and count (see
   api-error-responses' consistency ethic): so clients page
   uniformly across all your list endpoints. Inconsistent
   pagination shapes across endpoints force per-endpoint
   client code (see api-client-design's auto-pagination
   wrapping this).
6. **Keep cursors opaque and encode direction.** Cursors are
   opaque tokens (base64-encoded position), not exposed
   internal IDs or offsets: so you can change the underlying
   pagination without breaking clients, and clients cannot
   forge or misuse them. Support forward (and backward if
   needed) paging; document that cursors are single-use
   positions, not permanent bookmarks.

## Boundaries

- Offset pagination is acceptable for small, stable, or
  admin datasets where the anomalies do not matter and
  "jump to page N" is a real requirement (cursors cannot
  random-access pages); know the trade and choose per
  endpoint.
- Cursor pagination trades random page access for
  stability; if the product genuinely needs "go to page
  50", that is offset's niche, with its concurrency
  caveats accepted.
- Pagination over changing real-time data is inherently
  imperfect (the data moves under any paging scheme);
  cursors minimize the anomalies but for live feeds
  consider streaming or since-timestamp patterns instead
  (see event-driven-architecture).

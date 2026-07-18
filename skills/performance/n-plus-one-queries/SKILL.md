---
name: n-plus-one-queries
description: Find and eliminate N+1 database access where one query per row replaces one query for the set, using eager loading, batching, or a dataloader. Use when a list endpoint is slow, query counts scale with result size, or an ORM lazy-loads inside a loop.
---

# N+1 queries

The N+1 pattern issues one query to fetch a list, then one more query per row
to fetch a relation: 1 + N round trips where 2 would do. Each query looks fast
in isolation, so the plan never flags it; the cost is the hundreds of network
round trips the loop hides. It is the most common reason a list page crawls.

## Method

1. **Count queries per request, not query duration.** Turn on your ORM's query
   log (Rails `ActiveRecord` log, Django `django-debug-toolbar`, Hibernate
   `show_sql`, Prisma `log: ['query']`) and load one realistic page. If the
   count grows with the number of rows returned, you have N+1.
2. **Trace it to the relation accessed inside the loop.** The tell is a lazy
   association read while iterating: `order.customer.name` for each order in a
   list. The first query fetched orders; each `.customer` fires its own.
3. **Fix owned relations with eager loading.** Load the association in the same
   round trip: Rails `includes(:customer)`, Django
   `select_related`/`prefetch_related`, SQLAlchemy `selectinload`, Prisma
   `include`. This turns 1 + N into 1 or 2 queries, using a join or a single
   `WHERE id IN (...)`.
4. **Batch when eager loading does not fit.** For relations resolved across
   services or resolvers, collect the keys and issue one `IN` query per batch.
   In GraphQL, a per-request DataLoader coalesces the individual field reads
   into one keyed batch and caches within the request.
5. **Verify the query count dropped, and watch the swing.** Eager loading a
   huge fan-out relation can replace N small queries with one enormous join
   that materializes more rows than you want. Compare rows examined before and
   after; prefer a second `IN` query over a cartesian join when the fan-out is
   wide.
6. **Add a regression guard.** Assert a query-count ceiling in a test
   (`assert_queries(2)`, `django-assert-num-queries`) so the next lazy access
   inside a loop fails CI instead of shipping.

## Signals

- Does the query count stay flat as the result set grows from 10 to 100 rows?
- Is every association read in a loop covered by an eager load or a batch?
- Does a test pin the query count for the hot list endpoint?

## Boundaries

This targets access-pattern round trips, not slow individual queries; a single
query that is slow belongs to sql-optimization. When the batched query itself
is expensive, precomputation via materialized-views or a read cache may be the
better lever.

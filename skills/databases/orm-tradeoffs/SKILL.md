---
name: orm-tradeoffs
description: Use ORMs for their productivity while avoiding N+1 queries and knowing when to drop to raw SQL. Use when working with an ORM or debugging the performance problems ORMs quietly cause.
---

# ORM tradeoffs

An ORM trades SQL control for developer productivity: it maps objects
to tables, handles boilerplate, and lets you stay in one language. The
cost is that it hides the queries it generates, and the hidden queries
are where N+1 problems and accidental full scans live. Use the ORM,
watch what it emits.

## Method

1. **Let the ORM do the boring 80%.** CRUD, simple queries,
   migrations scaffolding, and mapping are where ORMs earn
   their keep: less boilerplate, fewer injection risks (see
   sql-injection-defense: parameterization is automatic),
   and staying in the application language. For the routine
   majority, the ORM is genuinely more productive; do not
   hand-write SQL for a simple get-by-id.
2. **Watch the generated SQL, always.** Enable query logging
   in development and read what the ORM emits for your key
   operations (see query-plan-reading): the ORM writes the
   SQL, but you are responsible for it. The gap between "one
   line of ORM code" and "the twelve queries it generated"
   is where performance goes to die, invisibly.
3. **Kill N+1 queries with eager loading.** The signature
   ORM problem: loading a list, then lazily loading each
   item's relation, producing one query plus N (list 100
   orders, then 100 queries for their customers). Fix with
   eager loading (join or batched fetch: `include`,
   `select_related`/`prefetch_related`, `JOIN FETCH`): see
   n-plus-one-queries. This one pattern causes more ORM
   performance incidents than all others combined; look for
   it in every list-with-relations.
4. **Drop to the query builder or raw SQL for complex
   reads.** Reporting queries, complex aggregations, window
   functions, and performance-critical paths are often
   clearer and faster as SQL than as ORM gymnastics: use the
   ORM's raw-SQL escape hatch (parameterized) or a query
   builder. Fighting the ORM to express a query SQL does
   naturally is a signal to drop down; the ORM is not a
   religion.
5. **Understand lazy loading and session boundaries.** Lazy-
   loaded relations accessed outside the ORM session/
   transaction throw or silently re-query; know your ORM's
   loading semantics and identity map. Accessing a lazy
   relation in a serializer after the session closed is a
   classic bug (and sometimes a hidden N+1: see step 3).
6. **Keep the schema and migrations honest.** ORM-generated
   schemas can miss indexes (the ORM does not know your
   query patterns: see indexing-strategy), pick suboptimal
   types, or produce migrations that lock tables (see
   database-migrations): review generated migrations before
   running them on production, and add the indexes the ORM
   will not.

## Boundaries

- The ORM-vs-raw-SQL choice is per query, not per project:
  healthy codebases use the ORM for the routine majority
  and raw SQL for the complex minority. "ORM for
  everything" and "no ORM ever" are both dogmas that cost
  productivity or performance.
- ORMs abstract the database but do not remove the need to
  understand it: indexing, query plans, transactions, and
  N+1 are database concerns the ORM exposes you to, not
  from (see indexing-strategy, transactions-isolation).
- Micro-ORMs and query builders sit between full ORMs and
  raw SQL (less magic, more control); a reasonable default
  for teams that want SQL visibility without full
  hand-writing.

---
name: csharp-linq
description: Use LINQ with deferred execution understood, database translation respected, and loops chosen when they win. Use when writing C# queries over collections or ORMs, or debugging surprising LINQ behavior.
---

# C# LINQ

LINQ is two different tools sharing one syntax: in-memory sequence
pipelines (LINQ-to-Objects) and expression trees translated to SQL
(EF-style providers). Most LINQ bugs come from forgetting which one
you are holding.

## Method

1. **Respect deferred execution.** A query describes work; iteration
   performs it. Consequences: enumerating twice runs twice (and hits
   the database twice); captured variables are read at enumeration
   time, not definition time; an `IEnumerable` returned up the stack
   may execute long after its data source changed. Materialize
   deliberately with `ToList()`/`ToArray()` exactly once at the
   boundary where results are needed (see frontend-data-fetching's
   cache-boundary instinct, applied in-process).
2. **Keep provider queries translatable.** Inside an `IQueryable`,
   only what the provider can turn into SQL belongs: no local method
   calls, no custom property logic. Filter, project
   (`Select` into a DTO with just the needed columns), sort, and
   page *in the database*; switch to objects explicitly
   (`AsEnumerable()`) only when server-side work is done. The
   classic failure is a filter that silently runs client-side after
   fetching the table (see n-plus-one-queries,
   pagination-performance).
3. **Choose operators for intent and cost.** `Any` over
   `Count() > 0`; `FirstOrDefault` with a predicate over
   `Where(...).FirstOrDefault()`; `ToDictionary`/`ToLookup` to
   replace nested `Where` scans (turning O(n*m) joins into O(n+m):
   see algorithmic-optimization); `GroupBy` and `Join` knowingly, as
   they buffer. Know the buffering operators (`OrderBy`, `GroupBy`,
   `Reverse`) versus streaming ones (`Where`, `Select`, `Take`) when
   pipelines process large sequences.
4. **Drop to loops without guilt when they win.** Early exit with
   side effects, index arithmetic, multiple accumulators in one
   pass, hot paths where allocation matters (each lambda and
   iterator allocates; profiles decide: see benchmark-design), and
   any pipeline a teammate had to read twice. A clear `foreach`
   beats a clever aggregate; LINQ is for making intent *more*
   readable, not for code golf (see cognitive-load).
5. **Compose queries, not strings.** Build conditional filters by
   chaining (`if (x != null) query = query.Where(...)`): the
   provider composes one SQL statement, and the pattern replaces
   dynamic SQL assembly (see sql-injection-defense). Extract
   reusable filters as `IQueryable` extension methods so the same
   predicate is not re-invented per call site.
6. **Verify the generated SQL for the hot queries.** Log or
   intercept the SQL for the top endpoints (EF's ToQueryString,
   query logging): check the WHEREs landed server-side, the columns
   projected are the ones needed, and the plan behaves
   (see query-plan-reading, orm-tradeoffs). LINQ that reads well
   and queries badly is found here, not in review.

## Boundaries

- Async enumeration (`ToListAsync`, `await foreach`) belongs to the
  provider/stream boundary (see dotnet-async); mixing sync
  materialization into async request paths blocks threads.
- PLINQ parallelizes CPU-bound in-memory work only, with the same
  shared-state cautions as any parallelism; it is not for I/O and
  not a default (see python-concurrency triage).
- Query syntax vs method syntax is style except for joins and
  let-clauses where query syntax reads better; pick per-team and
  stay consistent (see style-guides).

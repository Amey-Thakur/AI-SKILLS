---
name: common-table-expressions
description: Use CTEs to name intermediate steps so a complex query reads as a sequence rather than a nest, and know when they cost performance. Use when a query has grown into nested subqueries nobody can follow.
---

# Common table expressions

A CTE gives a subquery a name and lifts it out of the nest, turning a
query you read inside-out into one you read top-down. The main risk is
treating them as free abstraction when the engine may or may not inline
them.

## Method

1. **Name each step for what it produces.** A CTE called filtered_orders
   documents the query better than a comment, while one called t1
   wastes the mechanism entirely.
2. **Build in stages that each make sense alone.** Each CTE should be
   selectable on its own for debugging, which is the practical benefit
   over a nested subquery.
3. **Keep the chain shallow.** More than four or five stacked CTEs
   usually means the query is doing several jobs and should become a
   view, a materialised table, or separate queries.
4. **Know whether your engine inlines or materialises.** Some optimise
   through the CTE and some evaluate it once as a barrier, which changes
   performance dramatically and sometimes helps (see query-plan-reading).
5. **Do not repeat an expensive CTE.** Referencing the same CTE several
   times may recompute it per reference depending on the engine, so
   check the plan before assuming reuse is free.
6. **Reach for recursion only when the data is hierarchical.** Recursive
   CTEs walk trees and graphs, which is a different tool from staging
   (see recursive-queries).

## Boundaries

- CTEs improve readability; they do not by themselves improve
  performance and can hinder it by blocking optimisation.
- A CTE used by many queries wants to be a view or a table instead.
- Deeply chained CTEs can be harder to debug than the nesting they
  replaced if each stage is not independently meaningful.

---
name: sql-aggregation
description: Group and aggregate correctly, understanding what GROUP BY collapses, how HAVING differs from WHERE, and how nulls and empty groups behave. Use when producing counts, sums, and per-group summaries.
---

# SQL aggregation

Aggregation collapses many rows into one per group, and the errors come
from misunderstanding exactly what is collapsed: which rows entered the
group, which columns are legal to select, and what happens when nothing
matched at all.

## Method

1. **Decide the group key first.** Everything in the select list is
   either in the GROUP BY or inside an aggregate. Engines that allow
   otherwise are picking an arbitrary row for you.
2. **Filter before or after, deliberately.** WHERE removes rows before
   grouping; HAVING removes groups after. Putting a row condition in
   HAVING usually still works and reads as a mistake.
3. **Know how COUNT treats nulls.** COUNT(*) counts rows, COUNT(column)
   counts non-null values, and the difference is often exactly the
   number you were asked for (see null-semantics).
4. **Remember that missing groups produce no row.** A group with no
   matching rows is absent rather than zero, which is why reports show
   gaps. Join against a complete list of keys when zeroes matter.
5. **Aggregate before joining when fan-out threatens.** Joining first and
   summing after double counts whenever the join multiplies rows, which
   is the classic inflated-revenue bug (see sql-joins).
6. **Use FILTER or conditional aggregates for slices.** Counting several
   conditions in one pass beats several queries or a pile of subqueries,
   and it keeps the grain obvious.

## Boundaries

- Aggregates reduce rows; keeping per-row detail alongside a total is a
  window function's job (see window-functions).
- Average, median, and percentile answer different questions, and
  choosing the wrong one misleads more than a wrong query would (see
  statistical-inference).
- Aggregate results depend entirely on what the WHERE clause admitted,
  so a plausible number can still be over the wrong population.

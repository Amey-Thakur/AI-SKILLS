---
name: sql-joins
description: Choose and write the right join so rows are neither lost nor multiplied, and know why a result set grew. Use when combining tables and the row count or the null columns look wrong.
---

# SQL joins

Almost every wrong query result traces to a join: an inner join that
silently dropped the rows you cared about, or a join on a non-unique key
that quietly multiplied them. Joins are simple to write and easy to get
subtly wrong, which is why the row count is the first thing to check.

## Method

1. **State the grain before writing the join.** One row per what?
   Per order, per order line, per customer. Knowing the intended grain is
   what lets you see immediately that a result is wrong.
2. **Pick the join by what should survive.** Inner keeps only matches,
   left keeps every row of the left side, and full keeps both. Choosing
   inner when you meant left is the most common cause of quietly missing
   rows.
3. **Check the key's uniqueness on both sides.** Joining on a column
   that repeats on the right multiplies rows. If the right side is not
   unique per key, aggregate it first or accept the fan-out knowingly.
4. **Put filters in the right place.** A condition on the right table in
   the WHERE clause turns a left join into an inner join, because null
   fails the comparison. Filters that must not do that belong in the ON
   clause.
5. **Count before and after.** Compare the row count to the left table's
   count when you expected preservation. A join that changed the count
   unexpectedly is a bug you found early rather than a wrong number you
   shipped.
6. **Use an anti-join to find what is missing.** A left join filtered to
   null on the right, or NOT EXISTS, answers which rows have no match,
   which is usually clearer than NOT IN and safe with nulls (see
   null-semantics).

## Boundaries

- Joins combine rows; they do not fix a schema where the relationship is
  ambiguous (see database-normalization).
- Join performance depends on indexes and plan choice, which is a
  separate concern from correctness (see indexing-strategy,
  query-plan-reading).
- Cross joins are occasionally intended, so an exploding row count is
  only a bug relative to the grain you declared.

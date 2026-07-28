---
name: null-semantics
description: Reason about SQL nulls in comparisons, aggregates, joins, and uniqueness so absent values stop producing wrong or missing rows. Use when a query silently drops rows or a NOT IN returns nothing.
---

# Null semantics

Null is not a value but an absence, and SQL's three-valued logic follows
from that: comparisons with null are unknown rather than false, and
unknown is not true, so the row does not pass. Most null bugs are this
one rule applied somewhere you did not expect.

## Method

1. **Test with IS NULL, never with equals.** column = NULL is unknown for
   every row including the null ones. This is the single most common
   null mistake.
2. **Expect NOT IN to collapse with nulls.** If the list contains a null,
   NOT IN yields no rows at all, because the comparison can never be
   proven true. Use NOT EXISTS instead, which handles it correctly (see
   sql-joins).
3. **Know which aggregates skip nulls.** Most aggregates ignore null
   inputs, so an average is over non-null rows only. That is often what
   you want and often not what you assumed.
4. **Watch nulls flowing from outer joins.** A left join produces nulls
   for unmatched rows, and any later comparison on those columns is
   unknown, which turns filters into unintended inner joins.
5. **Decide what null means in each column.** Not applicable, not yet
   known, and not provided are different, and a schema that conflates
   them produces queries nobody can write correctly (see schema-design).
6. **Use COALESCE at the edge, not everywhere.** Substituting a default
   is right at presentation and wrong in the middle of logic, where it
   hides the distinction you may need.

## Boundaries

- Uniqueness treatment of nulls differs between engines, so a unique
  constraint may or may not permit several nulls.
- Sort order for nulls also varies, which changes pagination and top-N
  results between databases.
- Avoiding nulls entirely by using sentinel values trades one problem
  for a worse one, since sentinels participate in arithmetic.

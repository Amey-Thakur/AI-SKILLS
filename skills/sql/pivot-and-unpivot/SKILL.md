---
name: pivot-and-unpivot
description: Reshape rows into columns and back, and know when the reshape belongs in SQL rather than in the reporting layer. Use when a report needs periods or categories as columns, or a wide table needs normalising.
---

# Pivot and unpivot

Pivoting turns values into columns, which is what a human-readable
report usually wants and what a database is least suited to, because the
column list must be known in advance. Unpivoting does the reverse and is
usually the healthier direction.

## Method

1. **Pivot with conditional aggregation.** A sum or count wrapped in a
   condition per target column is portable, readable, and works
   everywhere, whether or not the engine has a PIVOT keyword (see
   sql-aggregation).
2. **Fix the column set explicitly.** SQL returns a fixed shape, so the
   categories must be known when the query is written. A changing set
   means generating the query or reshaping outside the database.
3. **Decide what an empty cell means.** Zero and unknown are different,
   and the choice between COALESCE to zero and leaving null is a
   reporting decision, not a technical one (see null-semantics).
4. **Unpivot by unioning or using the engine's function.** Turning wide
   columns into name and value rows makes the data queryable by period
   or attribute without rewriting the query for each column.
5. **Push presentation pivots outward when you can.** Reporting tools
   pivot dynamically and handle changing categories, which SQL cannot do
   without dynamic query construction.
6. **Never build dynamic SQL from untrusted input.** Generating column
   names from user data is an injection path (see sql-injection-defense).

## Boundaries

- Pivoting is a presentation shape; storing data pivoted makes every
  future question harder (see database-normalization).
- Wide pivots hit column limits and get slow, since each column is
  another conditional pass.
- PIVOT syntax exists only in some engines, so conditional aggregation
  is the portable choice.

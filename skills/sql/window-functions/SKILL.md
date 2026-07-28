---
name: window-functions
description: Use window functions to rank, compare to neighbours, and compute running totals without collapsing rows or self-joining. Use when you need per-row context such as a rank, a previous value, or a running sum.
---

# Window functions

Window functions answer questions that otherwise force a self-join or a
subquery per row: what rank is this, what was the previous value, how
much of the total is this. They compute across a set of rows while
leaving every row in the output, which is what separates them from
aggregation.

## Method

1. **Choose the frame deliberately.** PARTITION BY defines the group and
   ORDER BY defines the sequence within it. Most surprising results come
   from a missing partition or an order that is not deterministic.
2. **Know which ranking you mean.** ROW_NUMBER gives a unique sequence,
   RANK leaves gaps after ties, and DENSE_RANK does not. Picking one
   without deciding how ties should behave produces defensible-looking
   nonsense.
3. **Reach for LAG and LEAD instead of self-joins.** Comparing a row to
   the previous one is a window, not a join, and it stays correct when
   rows are missing or duplicated.
4. **Understand the default frame for running totals.** With an ORDER BY
   present, aggregates default to the rows from the start of the
   partition to the current row, which is what makes a running sum work
   and what surprises people expecting the whole partition.
5. **Filter after the window, not inside it.** WHERE runs before the
   window, so filtering on a rank means computing it in a subquery or
   CTE first and filtering outside (see common-table-expressions).
6. **Break ties explicitly.** An ORDER BY that does not uniquely
   determine order gives results that can differ between runs, which is
   the hardest class of bug to reproduce.

## Boundaries

- Windows add per-row context; they do not reduce rows. Use GROUP BY
  when the output really should be one row per group (see
  sql-aggregation).
- Large partitions can be expensive because they may require sorting the
  whole set (see sql-optimization).
- Support and syntax vary between engines, particularly around frames
  and named windows.

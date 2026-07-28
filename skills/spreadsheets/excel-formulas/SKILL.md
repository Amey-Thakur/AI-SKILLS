---
name: excel-formulas
description: Write formulas that stay correct when rows are added and readable when someone else opens the file. Use when building any calculation in a spreadsheet.
---

# Excel formulas

Formula errors are silent: a wrong reference produces a plausible number
and nobody checks. Writing them defensively means using references that
survive edits and structures a reader can follow.

## Method

1. **Reference cells, never retype values.** A number typed into a
   formula is invisible to anyone auditing it and does not update (see
   spreadsheet-modeling).
2. **Understand relative and absolute references.** Anchoring with the
   dollar sign is what makes a formula copyable across a range without
   drifting off its inputs.
3. **Use tables and structured references.** Named table columns expand
   automatically as rows are added, which fixes the most common broken
   range problem.
4. **Break long formulas into helper columns.** A chain of intermediate
   columns is auditable; a single nested monster is not, and the
   performance difference is negligible.
5. **Handle errors explicitly.** Wrapping lookups to return a stated
   default beats a sheet peppered with error values, but never hide an
   error that indicates a real problem.
6. **Prefer the modern dynamic functions.** Spilling formulas replace
   fragile array entry and complex nesting for filtering and sorting.
7. **Name ranges that are referenced repeatedly.** A named input reads
   as meaning rather than as a coordinate.

## Boundaries

Spreadsheets have no type system and no tests, so complex logic is safer
in code (see spreadsheet-modeling). Function availability differs across
versions and between Excel and other tools. Formula-heavy sheets become
slow and unmaintainable past a certain size (see
spreadsheet-performance).

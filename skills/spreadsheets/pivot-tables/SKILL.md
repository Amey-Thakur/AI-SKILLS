---
name: pivot-tables
description: Summarise and cross-tabulate large tables quickly with pivots, keeping the source data clean and the refresh reliable. Use when aggregating data by category, period, or dimension.
---

# Pivot tables

Pivots do in seconds what formulas take hours to build, and they depend
entirely on the source being a clean flat table. Most pivot problems are
source data problems.

## Method

1. **Start from a flat table with one header row.** Merged cells, blank
   rows, and repeated headers break pivots, and fixing the source is
   faster than working around it.
2. **Use a table or named range as the source.** It expands
   automatically as data is added, which prevents the pivot silently
   missing new rows.
3. **Choose the summary function deliberately.** Sum, count, average,
   and distinct count answer different questions, and the default is
   often not the one you want (see sql-aggregation).
4. **Group dates at the right level.** Grouping by month or quarter is
   what turns a transaction list into a report.
5. **Understand what filters exclude.** A filtered pivot showing a total
   that excludes rows is a common misread, so state the filter in the
   presentation.
6. **Refresh after source changes.** Pivots do not update automatically,
   and stale pivots presented as current are a frequent error.
7. **Keep the pivot separate from the source.** Pivots on their own
   sheet, with the raw data untouched, so the source stays reusable.

## Boundaries

Pivots summarise and do not transform; complex reshaping belongs in
Power Query. Very large sources slow refresh and may need a data model.
Pivot output is a snapshot, so it needs refresh discipline when shared
(see spreadsheet-collaboration).

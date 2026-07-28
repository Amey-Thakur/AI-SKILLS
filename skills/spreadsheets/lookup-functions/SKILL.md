---
name: lookup-functions
description: Join data between sheets reliably using modern lookup functions, handling missing matches and duplicates explicitly. Use when combining data from more than one table.
---

# Lookup functions

Lookups are where most spreadsheet data errors originate: a silent
mismatch, a duplicate returning the first row, or an approximate match
nobody intended. The defence is being explicit about all three.

## Method

1. **Use the modern lookup function.** Column-index-based lookups break
   when columns are inserted, which is the classic fragile spreadsheet
   failure.
2. **Always specify exact matching.** Approximate match is the default
   in older functions and silently returns the nearest row, which is
   rarely intended.
3. **Handle the not-found case deliberately.** A stated default or a
   visible marker, since an unexplained error propagates through every
   downstream calculation.
4. **Check for duplicate keys before trusting results.** A lookup
   returns one match; if the key repeats, you are silently choosing one
   (see deduplication-queries).
5. **Clean keys before matching.** Trailing spaces, inconsistent case,
   and text-formatted numbers are the usual causes of a lookup that
   should match and does not (see spreadsheet-data-cleaning).
6. **Count matches to validate the join.** Comparing row counts before
   and after catches both dropped and duplicated rows (see sql-joins).
7. **Consider Power Query for repeated joins.** A refreshable query
   beats a sheet of lookup formulas for anything done regularly (see
   power-query).

## Boundaries

Lookups join on a single key and become unwieldy for multi-column
matching. Large lookup ranges slow recalculation noticeably. Data that
needs joining regularly probably belongs in a database rather than a
spreadsheet.

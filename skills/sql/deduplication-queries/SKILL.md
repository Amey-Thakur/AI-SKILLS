---
name: deduplication-queries
description: Find and remove duplicate rows deterministically, keeping the record you meant to keep. Use when a table has accumulated duplicates or an import needs a clean unique set.
---

# Deduplication queries

Deduplication has two halves that people conflate: deciding what counts
as a duplicate, and deciding which copy survives. Getting the second
wrong loses data, which is why deletion comes last and only after the
selection has been inspected.

## Method

1. **Define duplicate precisely.** Identical on which columns? Case
   sensitivity, trimmed whitespace, and normalised formatting change the
   answer, so normalise before comparing rather than after.
2. **Count duplicates before touching anything.** Group by the key and
   filter to counts above one. Knowing the scale prevents a cleanup that
   removes far more than expected.
3. **Choose the survivor by an explicit rule.** Earliest created, latest
   updated, or most complete. ROW_NUMBER partitioned by the key and
   ordered by that rule marks exactly one keeper per group (see
   window-functions).
4. **Break ties deterministically.** If the ordering column repeats, add
   the primary key as a final tiebreak, or the same query will pick
   differently on different runs.
5. **Preview the deletion as a select.** Run the exact predicate as a
   SELECT and inspect it, and keep a copy of the doomed rows before
   deleting anything.
6. **Add the constraint afterwards.** Deduplication without a unique
   constraint is a task you will repeat, so close the door once the data
   is clean (see upsert-patterns).

## Boundaries

- Fuzzy duplicates such as near-identical names are a data quality
  problem needing matching logic, not a SQL deduplication query (see
  data-cleaning).
- Deleting in one statement on a large table can hold locks for a long
  time; batch it when the table is live.
- The rows you delete may be referenced elsewhere, so check foreign keys
  before assuming the delete is safe.

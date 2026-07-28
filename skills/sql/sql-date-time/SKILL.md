---
name: sql-date-time
description: Store, compare, and bucket timestamps with explicit time zones so reports do not drift by a day and ranges do not miss rows. Use when filtering by date, grouping by period, or storing an event time.
---

# SQL date and time

Time bugs are quiet: a report is off by a day for some users, a range
misses the last hour, a daily job double counts around a clock change.
Nearly all of them come from an implicit time zone or a boundary written
with BETWEEN.

## Method

1. **Store instants in UTC with a time zone aware type.** A naive
   timestamp is ambiguous the moment two regions use it, and the
   ambiguity is unrecoverable later.
2. **Convert for display and grouping only.** A daily report means days
   in someone's local zone, so convert at the point of bucketing and
   record which zone was used.
3. **Write half-open ranges.** Greater than or equal to the start and
   strictly less than the end. BETWEEN on timestamps either misses the
   final fraction of a second or double counts a boundary row.
4. **Beware date arithmetic across clock changes.** Adding a day is not
   always adding twenty-four hours where daylight saving applies, and
   the two operations are different functions.
5. **Keep the filter column bare.** Wrapping the column in a function
   usually prevents index use, so transform the bounds instead of the
   column (see sql-optimization).
6. **Separate event time from ingestion time.** When something happened
   and when you recorded it are different questions, and analytics
   eventually needs both (see batch-vs-streaming).

## Boundaries

- Time zone rules change by legislation, so correctness depends on an
  up-to-date zone database rather than arithmetic.
- Date-only values are not instants; treating a birth date as a
  timestamp introduces a zone question that should not exist.
- Precision differs between engines and can silently truncate on insert.

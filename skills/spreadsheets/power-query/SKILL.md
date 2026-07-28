---
name: power-query
description: Build repeatable data transformations that refresh on demand, replacing manual cleaning steps with a recorded pipeline. Use when the same import and cleaning happens more than once.
---

# Power Query

Manual cleaning must be redone every time the data arrives. Power Query
records the steps as a pipeline that reruns against new data, which is
the difference between a one-off and a report.

## Method

1. **Use it whenever the task repeats.** Any monthly or weekly import
   justifies the setup immediately (see spreadsheet-data-cleaning).
2. **Keep the source connection parameterised.** A file path or date
   range as a parameter rather than embedded, so refreshing a new period
   does not mean editing steps.
3. **Do transformations in the query, not in the sheet.** Steps in the
   query are reproducible; formulas applied afterwards must be
   reapplied.
4. **Name each step for what it does.** The step list is the
   documentation of the pipeline, and default names make it unreadable.
5. **Filter early in the pipeline.** Reducing rows before expensive
   transformations makes refresh substantially faster.
6. **Handle schema changes defensively.** Column renames and additions
   at the source break queries, so referencing by name with error
   handling beats positional assumptions (see data-mapping).
7. **Load to the data model for large sets.** Loading millions of rows
   to a sheet is slow and unnecessary when only summaries are needed.

## Boundaries

Power Query transforms on refresh and is not live. Very large or
frequently changing data belongs in a database or a warehouse (see
data-pipeline-design). Query logic is less visible than formulas, so
undocumented queries become opaque to others.

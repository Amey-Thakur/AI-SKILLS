---
name: spreadsheet-data-cleaning
description: Turn messy imported data into a clean flat table, fixing types, whitespace, duplicates, and inconsistent categories. Use before any analysis on data that came from elsewhere.
---

# Spreadsheet data cleaning

Imported data is inconsistent by default: numbers stored as text, dates
in several formats, trailing spaces, and the same category spelled three
ways. Analysis before cleaning produces confident wrong answers.

## Method

1. **Inspect before transforming.** Sort each column and look at the
   extremes, which surfaces the format problems immediately (see
   exploratory-data-analysis).
2. **Fix types explicitly.** Numbers stored as text do not sum and dates
   as text do not sort, and both look correct on screen.
3. **Trim and normalise text.** Whitespace and case inconsistency break
   every lookup and grouping (see lookup-functions).
4. **Standardise categories against a reference list.** The same value
   spelled differently splits every aggregation silently.
5. **Handle duplicates deliberately.** Decide what constitutes a
   duplicate and which copy survives before removing anything (see
   deduplication-queries).
6. **Keep the raw import untouched.** Clean into a new sheet so the
   transformation is repeatable and auditable (see data-cleaning).
7. **Use Power Query for anything recurring.** Manual cleaning is fine
   once and unsustainable monthly (see power-query).

## Boundaries

Cleaning fixes format and consistency, not accuracy: correctly formatted
wrong data is still wrong. Aggressive automated cleaning can destroy
legitimate variation. Recurring cleaning indicates the upstream source
should be fixed instead.

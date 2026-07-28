---
name: spreadsheet-modeling
description: Build spreadsheet models that are auditable and hard to break, separating inputs, calculations, and outputs. Use when modelling finances, forecasts, or scenarios.
---

# Spreadsheet modelling

Spreadsheets are the most used and least engineered software in most
organisations. Errors are common, consequential, and hard to spot,
because nothing enforces structure and everything looks equally
authoritative.

## Method

1. **Separate inputs, calculations, and outputs.** Distinct areas or
   sheets, with inputs clearly marked, so a reader knows what is an
   assumption and what is derived.
2. **Never hardcode a number inside a formula.** Every constant is an
   input cell with a label, since buried constants are the classic
   undiscoverable error.
3. **Keep one formula per row or column.** Consistency lets you copy
   across and makes an inconsistent cell visible as an anomaly.
4. **Name ranges for anything referenced repeatedly.** Named references
   read as meaning rather than as coordinates.
5. **Build in checks.** Totals that must reconcile, balances that must
   be zero, flagged visibly, which is the spreadsheet equivalent of a
   test (see assertion-density).
6. **Document assumptions on the sheet.** A model without its
   assumptions is unusable by anyone else and by you in six months.
7. **Version deliberately.** Spreadsheets are copied and edited in
   parallel, so a clear naming and ownership convention prevents
   competing truths.

## Boundaries

Spreadsheets suit modelling and analysis, not production data processing
or multi-user workflows, where a database and an application belong (see
database-design). Complex models become unmaintainable and should move
to code. Financial models used for decisions need review by someone who
did not build them.

---
name: spreadsheet-performance
description: Diagnose and fix slow spreadsheets by reducing volatile formulas, whole-column references, and unnecessary recalculation. Use when a workbook takes seconds to respond to an edit.
---

# Spreadsheet performance

A slow workbook is usually slow for a few identifiable reasons rather
than because of size alone. Fixing them is mechanical once you know
where to look.

## Method

1. **Avoid whole-column references.** Referencing an entire column
   forces evaluation across a million rows, and bounded ranges or tables
   fix it immediately.
2. **Reduce volatile functions.** Functions recalculating on every
   change cascade through dependents and are the most common cause of
   sluggishness.
3. **Replace repeated lookups with helper columns.** Computing once and
   referencing beats recomputing the same lookup in twenty formulas.
4. **Remove formatting applied to entire sheets.** Conditional
   formatting over whole columns is a frequent and invisible cost (see
   conditional-formatting).
5. **Convert stable formulas to values.** Historical periods that will
   never change do not need recalculating.
6. **Move heavy transformation to Power Query.** It processes once on
   refresh rather than continuously (see power-query).
7. **Split or migrate when it stops helping.** A workbook that remains
   slow after these fixes has outgrown the tool.

## Boundaries

Optimisation extends a spreadsheet's viable range and does not remove
its limits. Some slowness comes from the file being on a network share
rather than from the content. Very large datasets belong in a database
(see databases).

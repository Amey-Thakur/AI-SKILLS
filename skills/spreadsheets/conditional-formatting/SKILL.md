---
name: conditional-formatting
description: Use formatting rules to surface exceptions and patterns automatically, without turning the sheet into a colour chart. Use when readers need to spot outliers or status at a glance.
---

# Conditional formatting

Formatting rules make a sheet self-monitoring: values crossing a
threshold highlight themselves. Overused, they produce a rainbow that
communicates nothing.

## Method

1. **Highlight exceptions, not everything.** Colour applied to a
   minority of cells draws the eye; colour everywhere is wallpaper.
2. **Use formula-based rules for real conditions.** Rules referencing
   other cells express the actual business condition rather than a
   simple value test.
3. **Keep the palette small and meaningful.** Two or three colours with
   consistent meaning across the workbook, since inconsistent colour
   coding actively misleads.
4. **Never rely on colour alone.** Add an icon or a text flag, because
   colour-only meaning excludes many readers and fails in print (see
   color-contrast).
5. **Apply to ranges, not cell by cell.** Rules multiplied across
   thousands of individual cells slow recalculation and become
   unmanageable (see spreadsheet-performance).
6. **Document what the colours mean.** A small legend on the sheet, since
   a reader cannot inspect rules to find out.
7. **Review rules periodically.** Accumulated overlapping rules produce
   unpredictable results as they layer.

## Boundaries

Formatting draws attention and does not enforce anything, so it
complements validation rather than replacing it (see
data-validation-rules). Many rules degrade performance. Formatting is
lost or altered when exporting to other formats.

---
name: excel-formula
description: Build or fix an Excel or Google Sheets formula from a plain-language description, explained and robust.
variables:
  - "{task}: what you want the formula to do, and the relevant cells/columns"
  - "{tool}: Excel or Google Sheets (they differ on some functions)"
settings: "Temperature 0.2 for correctness."
---

Build a formula for {tool} that does: {task}

Provide:
1. The formula, in a code block, ready to paste (with the actual cell/range
   references from my description, or clearly marked placeholders like A2:A100
   for me to adjust).
2. A plain-language explanation of how it works, part by part, so I can
   understand and adapt it.
3. Robustness notes: how it handles the edge cases (empty cells, errors,
   text where numbers are expected, division by zero): wrap with IFERROR or
   guards where it matters, and say why.
4. If {tool} matters (a function exists in one but not the other, or behaves
   differently), give the correct version for the stated tool and note the
   difference.

Rules: prefer a clear, maintainable formula over a clever nested monster; if
the task really needs a helper column or a pivot table instead of one giant
formula, say so. If a newer function (XLOOKUP, LET, FILTER) makes it much
cleaner, offer it and note the version requirement. If I am debugging an
existing formula, find the specific error and explain the fix.

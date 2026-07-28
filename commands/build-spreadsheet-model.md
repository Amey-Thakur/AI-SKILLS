---
description: "Specify a spreadsheet model that is auditable, with inputs separated and checks built in."
argument-hint: "[model]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Design a spreadsheet model for:

{model}

Inputs: {inputs}

Use spreadsheet-modeling, excel-formulas, and financial-functions if
relevant.

Produce:
- Sheet structure: inputs, calculations, and outputs separated.
- Every input as a labelled cell with its source and units.
- The calculation logic, with formulas written out.
- Built-in checks that must reconcile, and what they catch.
- Scenario handling, so assumptions can be varied.
- What the model deliberately does not account for.

Rules: no hardcoded numbers inside formulas. Every assumption is a
labelled input. Include reconciliation checks, which are the model's
tests. State the sensitivity: which input most changes the answer.
Nothing here is financial advice.

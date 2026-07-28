---
name: build-spreadsheet-model
description: Specify a spreadsheet model that is auditable, with inputs separated and checks built in.
variables:
  - "{model}: what is being modelled and the decision it supports"
  - "{inputs}: the known figures, assumptions, and their sources"
settings: "Temperature 0.2."
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

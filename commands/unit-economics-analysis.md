---
description: "Work out whether one customer or transaction makes money, with every variable cost included."
argument-hint: "[numbers]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Analyse unit economics for:

{unit}

Figures: {numbers}

Follow the unit-economics skill, plus saas-metrics if subscription-based.

Produce:
- Contribution margin per unit, showing the working.
- Lifetime value computed from margin, not revenue, with the retention
  assumption stated.
- Acquisition cost and payback period.
- The costs you had to assume because they were not supplied.
- Which single variable most changes the answer.

Rules: include support, payment fees, and infrastructure that scales with
volume. Do not allocate fixed costs into the unit. State every assumption
explicitly and mark it. If the figures given are insufficient to conclude,
say what else is needed rather than filling gaps with plausible numbers.
Nothing here is financial advice.

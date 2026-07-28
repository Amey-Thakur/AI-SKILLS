---
description: "Build a forecast from stated drivers rather than a growth percentage, with the assumptions exposed."
argument-hint: "[history]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Build a forecast:

History: {history}

Horizon and purpose: {horizon}

Use cash-flow-management and unit-economics.

Produce:
- The drivers the forecast is built from, not a blended growth rate.
- Base, optimistic, and pessimistic cases with what distinguishes them.
- Cash position by period, separate from profit.
- The point at which cash becomes a constraint, if it does.
- The assumption that most changes the outcome.
- What would tell you early that the forecast is wrong.

Rules: forecast from drivers you can observe and influence. State every
assumption with its basis. Do not present a single number as the answer.
Model cash and profit separately, since they diverge. This is a modelling
exercise, not financial advice.

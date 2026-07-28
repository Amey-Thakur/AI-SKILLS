---
description: "Define a metric precisely enough that two people computing it independently get the same number."
argument-hint: "[metric]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Define this metric:

{metric}

Context: {context}

Use agent-analytics-desk and product-metrics.

Specify:
- What it measures and the decision it informs.
- The exact population: who is in and who is excluded.
- The time window and how period boundaries are handled.
- The calculation, unambiguously.
- Edge cases: refunds, test accounts, deleted users, partial periods.
- Where the source data comes from.
- What it does not measure and how it can mislead.

Rules: the definition must be precise enough to reproduce exactly. Name
the exclusions explicitly. State the time zone for any date boundary. Note
that changing the definition invalidates historical comparison, so
version it.

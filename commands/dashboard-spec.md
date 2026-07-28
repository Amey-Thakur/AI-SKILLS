---
description: "Specify a dashboard around the decisions it supports, with a small number of headline figures."
argument-hint: "[audience]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Specify a dashboard for:

{audience}

Available data: {data}

Use dashboard-building and dashboard-design.

Produce:
- The decisions it supports and the action each metric prompts.
- Three to five headline figures, with comparison and target.
- Supporting detail, ordered by importance.
- Chart type per item and why.
- Time range, filters, and refresh frequency.
- What is deliberately excluded.

Rules: every panel must inform an action; if it does not, cut it. Show
change rather than level alone. Make the time range and active filters
unmissable. Do not include a metric because it is available.

---
description: "Design a form with the fewest fields that works, clear labels, and errors that help."
argument-hint: "[purpose]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Design a form for:

{purpose}

Context: {context}

Use form-design, accessible-forms, and data-minimization.

Produce:
- Each field challenged: needed now, later, or not at all.
- Field order and grouping.
- Labels, help text, and input types with correct autocomplete.
- Validation: what is checked, when, and the message for each failure.
- Success and error states.
- Whether it should be split into steps.

Rules: remove every field not needed now. Labels stay visible; do not use
placeholders as labels. Error messages say how to fix it. Preserve input
on failure. Note the privacy implication of anything personal collected.

---
name: design-form
description: Design a form with the fewest fields that works, clear labels, and errors that help.
variables:
  - "{purpose}: what the form collects and why each field is needed"
  - "{context}: where it appears, who fills it, and on what devices"
settings: "Temperature 0.3."
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

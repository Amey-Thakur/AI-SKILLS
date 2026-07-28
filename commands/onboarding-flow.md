---
description: "Design an onboarding flow that gets a user to first value quickly, cutting everything that delays it."
argument-hint: "[product]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Design onboarding for:

{product}

Current experience: {current}

Use onboarding-ux, user-activation, and form-design.

Produce:
- The first meaningful outcome, defined specifically.
- The shortest path to it, with every step justified.
- What is deferred until after first value.
- Where sample data or a template removes setup effort.
- Empty states that teach rather than sit blank.
- What is measured, including where people drop.

Rules: remove every field and step not needed to reach first value.
Defer account setup that is not required yet. Do not front-load a tour;
let people do something real. Name the drop-off point you expect and how
you would detect it.

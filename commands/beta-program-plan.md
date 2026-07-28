---
description: "Plan a beta with the right participants, defined success criteria, and a decision point at the end."
argument-hint: "[feature]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Plan a beta for:

{feature}

Learning goal: {goal}

Use product-launch and feature-flags.

Produce:
- What you need to learn, and what would answer it.
- Participant selection and how many.
- What participants are told, including that it may break.
- Duration and the checkpoints during it.
- What is instrumented, and what feedback is gathered directly.
- Exit criteria: what makes this ready or not.
- The rollback plan if it goes badly.

Rules: define exit criteria before starting, or the beta continues
indefinitely. Set expectations honestly with participants. Instrument
before launching. State what would make you cancel rather than proceed.

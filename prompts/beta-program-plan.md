---
name: beta-program-plan
description: Plan a beta with the right participants, defined success criteria, and a decision point at the end.
variables:
  - "{feature}: what is being tested and its current readiness"
  - "{goal}: what you need to learn before general release"
settings: "Temperature 0.3."
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

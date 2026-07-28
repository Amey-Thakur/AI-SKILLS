---
name: api-migration-guide
description: Write a guide that gets consumers from an old API version to a new one with every breaking change addressed.
variables:
  - "{changes}: what changed between versions, breaking and non-breaking"
  - "{timeline}: deprecation dates and support windows"
settings: "Temperature 0.3."
---

Write a migration guide for:

{changes}

Timeline: {timeline}

Use api-deprecation, api-change-management, and integration-migration.

Produce:
- What changed and why, briefly.
- Breaking changes listed individually, each with before and after code.
- Non-breaking additions worth adopting.
- A migration order that keeps the consumer working throughout.
- How to run both versions during transition, if possible.
- Dates: deprecation, sunset, and what happens after.
- How to verify the migration worked.

Rules: every breaking change needs a concrete before-and-after example.
State the dates plainly. Say what happens to consumers who do nothing.
Do not describe a change as minor if it requires code changes.

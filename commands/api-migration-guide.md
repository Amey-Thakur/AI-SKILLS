---
description: "Write a guide that gets consumers from an old API version to a new one with every breaking change addressed."
argument-hint: "[changes]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

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

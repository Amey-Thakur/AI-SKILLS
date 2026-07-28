---
description: "Plan a refactor as a sequence of safe verified steps, with tests established before anything moves."
argument-hint: "[code]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Plan a refactor of:

{code}

Target: {goal}

Use the refactoring skill and agent-refactoring-workflow for sequencing.

Produce:
- The coverage that must exist first, and what to add if it does not.
- Ordered steps, each preserving behaviour and independently committable.
- What is verified after each step.
- The point where the old structure can be removed.
- What could go wrong at each step and how it is detected.

Rules: behaviour must not change; anything that changes behaviour is a
separate commit, stated as such. No step may leave the codebase broken.
Do not change tests and implementation in the same step. If the code
needs redesign rather than restructuring, say so instead of planning a
refactor that cannot get there.

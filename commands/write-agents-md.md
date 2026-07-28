---
description: "Write the repository instruction file that coding agents read, covering conventions they cannot infer."
argument-hint: "[project]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write an agent instruction file for:

{project}

Conventions: {conventions}

Use agent-instruction-files and agent-tool-permissions.

Produce:
- What the project is, in two lines.
- The exact build, test, and lint commands.
- Directory structure and what belongs where.
- Conventions an agent cannot infer from the code.
- Quality gates that must pass before a change is done.
- What must never be edited or run without approval.
- Commit message format.

Rules: write instructions rather than documentation. State commands
exactly. Keep it short, since it consumes context every session and long
files dilute the rules. Anything critical also needs a check in CI, since
instructions guide rather than enforce.

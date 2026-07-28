---
name: write-agents-md
description: Write the repository instruction file that coding agents read, covering conventions they cannot infer.
variables:
  - "{project}: the stack, structure, and how it is built and tested"
  - "{conventions}: commit format, quality gates, and anything agents keep getting wrong"
settings: "Temperature 0.3."
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

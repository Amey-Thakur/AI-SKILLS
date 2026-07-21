---
name: commit-message
description: Write a clear conventional-commit message from a diff or a description of the change.
variables:
  - "{diff}: the diff, or a plain-language description of what changed"
settings: "Temperature 0.2-0.4 for precise, conventional output."
---

Write a git commit message for this change:

{diff}

Rules:
- Subject line: imperative mood, under 50 characters, no trailing period
  (`Add retry to upload`, not `Added retry` or `Adds retry.`).
- Use a conventional-commit type prefix if the project uses them
  (feat, fix, refactor, docs, test, chore); otherwise a plain imperative
  subject.
- Blank line, then a body ONLY if the change needs explanation: wrap at 72
  columns, and explain WHY (the reasoning, the context the diff cannot show),
  not what (the diff already shows what).
- One logical change per commit; if the diff does two unrelated things, say
  so and propose splitting it.

Output the message in a code block, ready to paste. No preamble.

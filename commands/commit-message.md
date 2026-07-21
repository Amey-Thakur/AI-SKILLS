---
description: "Write a clear conventional-commit message from a diff or a description of the change."
argument-hint: "[diff]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

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

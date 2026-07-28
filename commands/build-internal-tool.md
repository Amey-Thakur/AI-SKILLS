---
description: "Specify an internal tool that removes real friction, with the simplest build that works."
argument-hint: "[problem]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Specify an internal tool for:

{problem}

Constraints: {constraints}

Use toil-reduction, self-service-infrastructure, and
internal-developer-platform.

Produce:
- The manual work today, quantified per week.
- Whether the process should be fixed rather than automated.
- The smallest tool that removes most of the toil.
- Who uses it and what they do with it.
- Access control and audit needs.
- Who maintains it, and what happens when they leave.
- What is deliberately left manual.

Rules: ask whether the underlying process should exist before automating
it. Build the smallest thing that removes the most toil. Name the
maintainer, since unowned internal tools rot. State the ongoing cost
against the time saved.

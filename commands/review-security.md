---
description: "Review code or a design for security weaknesses, ranked by real exploitability rather than by checklist coverage."
argument-hint: "[target]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Review this for security weaknesses:

{target}

Context: {context}

Follow the method in the security-review skill, and draw on
input-validation, authz-design, and secrets-management where relevant.

Report findings ranked by exploitability:
- The weakness, at a specific line or component.
- Who could exploit it and what they would gain.
- A concrete attack path, not a category name.
- The fix, specific to this code.

Rules: rank by real risk in this context, not by generic severity. State
plainly when something is theoretical or requires access the attacker
would not have. Do not pad the list with best-practice observations that
are not weaknesses. If the code is sound, say so rather than inventing
findings. Flag anything you could not assess without seeing more.

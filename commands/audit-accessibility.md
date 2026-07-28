---
description: "Audit a product against real assistive technology use, prioritised by who is blocked."
argument-hint: "[product]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Audit accessibility for:

{product}

Scope: {scope}

Use accessibility-review, screen-reader-testing, keyboard-navigation, and
color-contrast.

Produce:
- Blockers: what prevents task completion, by user group.
- Barriers: what makes it harder.
- Per finding: where, who is affected, and the specific fix.
- What can only be confirmed with real assistive technology or users.
- Priority order by impact.
- What is already working well.

Rules: prioritise by impact on a person rather than by rule number. State
clearly which findings need manual verification. Prefer semantic HTML
fixes to ARIA. Do not claim conformance with any standard on the basis of
a review.

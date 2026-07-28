---
name: review-security
description: Review code or a design for security weaknesses, ranked by real exploitability rather than by checklist coverage.
variables:
  - "{target}: the code, endpoint, or design to review, with enough context to see the trust boundaries"
  - "{context}: who can reach it, what data it touches, and what authentication applies"
settings: "Temperature 0.2 for precision."
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

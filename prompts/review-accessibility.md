---
name: review-accessibility
description: Review an interface for accessibility barriers, prioritised by who is blocked rather than by rule count.
variables:
  - "{interface}: the markup, component, or flow to review"
  - "{context}: what the user is trying to accomplish and on what devices"
settings: "Temperature 0.2."
---

Review this for accessibility:

{interface}

Context: {context}

Follow the accessibility-review skill, plus keyboard-navigation,
aria-usage, and color-contrast as relevant.

Report:
- Barriers that block a user from completing the task, first.
- Barriers that make it harder but not impossible, second.
- For each: who is affected, what happens, and the specific fix.
- What needs testing with a real screen reader or real users.

Rules: prioritise by impact on a person, not by rule identifier. Do not
suggest ARIA where semantic HTML would do; state that explicitly when it
applies. Say clearly which findings you cannot confirm without running
assistive technology. Do not claim compliance with any standard.

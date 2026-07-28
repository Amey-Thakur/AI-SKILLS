---
name: audit-accessibility
description: Audit a product against real assistive technology use, prioritised by who is blocked.
variables:
  - "{product}: the pages or flows to audit and their purpose"
  - "{scope}: what has been tested already and what tools are available"
settings: "Temperature 0.2."
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

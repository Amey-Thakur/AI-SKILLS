---
name: roadmap-draft
description: Draft a roadmap communicating direction and confidence, without implying dates the team cannot hold.
variables:
  - "{priorities}: what matters over the coming periods and why"
  - "{audience}: who reads this, whether customers, executives, or the team"
settings: "Temperature 0.3."
---

Draft a roadmap for:

{priorities}

Audience: {audience}

Use roadmap-communication and milestone-planning.

Produce:
- Themes rather than a feature list, tied to outcomes.
- Now, next, and later, with confidence decreasing across them.
- What each theme would achieve for users.
- Dependencies and known risks.
- What is explicitly not planned.
- How and when the roadmap will be revised.

Rules: confidence must decrease with distance, and later items should not
carry dates. Distinguish committed from intended. Do not list everything
requested; a roadmap that includes everything communicates nothing. For
external audiences, avoid implying commitments.

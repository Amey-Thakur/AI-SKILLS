---
description: "Draft a roadmap communicating direction and confidence, without implying dates the team cannot hold."
argument-hint: "[priorities]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

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

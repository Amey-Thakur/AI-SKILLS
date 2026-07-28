---
description: "Assess a codebase and its engineering practice for risk, from what can be observed."
argument-hint: "[target]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Perform technical due diligence on:

{target}

Purpose: {purpose}

Use architecture-review-board, security-review, dependency-management, and
developer-productivity-metrics.

Assess:
- Architecture: whether it fits the stated scale and where it will break.
- Code health: testing, duplication, and areas nobody will touch.
- Dependencies: risk, licensing, and maintenance status.
- Security posture, from what is observable.
- Operational maturity: deployment, monitoring, incident handling.
- Key-person risk and knowledge concentration.
- Findings ranked by cost to remediate.

Rules: distinguish what you verified from what you were told. State what
could not be assessed without deeper access. Rank findings by remediation
cost rather than severity alone. Note that licensing conclusions need
legal review.

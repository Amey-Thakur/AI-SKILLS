---
description: "Turn objectives into a quarter of committed work that fits real capacity, with what is being dropped named."
argument-hint: "[objectives]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Plan the quarter:

Objectives: {objectives}

Capacity: {capacity}

Use agent-goal-cascade, agent-capacity-planning, and
prioritization-frameworks.

Produce:
- Objectives restated as measurable outcomes.
- Work items mapped to objectives, with anything unmapped flagged.
- A capacity check with realistic availability, not full-time headcount.
- Reserve for interruptions and support.
- What is explicitly not being done this quarter.
- Dependencies on other teams, with owners.
- The checkpoint dates and what is verified at each.

Rules: plan below full capacity or the plan fails on the first incident.
Name what is being dropped rather than leaving it implicitly deferred.
Every item needs an owner. If the objectives exceed capacity, say which
must give rather than compressing estimates.

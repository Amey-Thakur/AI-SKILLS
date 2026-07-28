---
name: qbr-outline
description: Outline a quarterly business review that leads with outcomes and ends with decisions rather than activity.
variables:
  - "{period}: the quarter, its goals, and what actually happened"
  - "{audience}: who attends and what they need to decide"
settings: "Temperature 0.3."
---

Outline a quarterly review for:

{period}

Audience: {audience}

Use agent-board-reporting, agent-strategy-review, and
project-status-reporting.

Structure:
- Outcomes against the goals set, including misses.
- Metrics with movement and cause.
- What was learned that changes the plan.
- Decisions needed, with options and a recommendation.
- Next quarter's priorities and what is being dropped.
- Risks that need attention above this team.

Rules: lead with outcomes rather than activity. State misses as plainly
as wins. Every decision needs options and a recommendation, not an open
question. Keep the review short enough that the decisions get time.

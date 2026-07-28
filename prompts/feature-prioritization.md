---
name: feature-prioritization
description: Rank candidate work by value, effort, and confidence, with the reasoning visible enough to argue with.
variables:
  - "{candidates}: the features or work under consideration, with any evidence"
  - "{goals}: what the team is trying to achieve this period"
settings: "Temperature 0.3."
---

Prioritise:

{candidates}

Goals: {goals}

Use prioritization-frameworks and agent-goal-cascade.

Produce:
- Each item scored on value, effort, and confidence, with the basis.
- How each serves a stated goal, or a note that it does not.
- The ranked list.
- What is being deferred and what that costs.
- Dependencies that force sequencing regardless of rank.
- The items where confidence is low enough to need discovery first.

Rules: mark low-confidence estimates rather than presenting them as
equal. Items serving no stated goal should be flagged, not quietly
ranked. Effort estimates are ranges. State what would change the order.

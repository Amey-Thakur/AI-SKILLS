---
name: quarterly-okr-review
description: Review objectives honestly against outcomes, separating execution failure from wrong strategy.
variables:
  - "{okrs}: the objectives and key results set, with final values"
  - "{context}: what happened during the period, including what changed"
settings: "Temperature 0.3."
---

Review these objectives:

{okrs}

Period context: {context}

Use agent-strategy-review, okr-draft, and project-retrospective.

Produce:
- Each key result against target, with the real number.
- Whether misses were execution or the objective being wrong.
- Objectives that were achieved but did not produce the intended
  outcome.
- What was learned that changes the next set.
- Which objectives should carry forward, change, or be dropped.
- What was predicted at the start that turned out false.

Rules: distinguish execution failure from strategy failure, since they
need opposite responses. A key result hit without the outcome moving
means the wrong measure was chosen. Continuing an objective is a decision
to record, not a default.

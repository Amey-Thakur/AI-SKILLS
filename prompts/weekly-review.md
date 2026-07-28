---
name: weekly-review
description: Review the week honestly against what was planned, and set the next one from what you learned.
variables:
  - "{planned}: what you intended to do this week"
  - "{actual}: what actually happened, including interruptions"
settings: "Temperature 0.3."
---

Review the week:

Planned: {planned}

Actual: {actual}

Use weekly-plan, project-retrospective, and agent-capacity-planning.

Produce:
- What was completed against what was planned.
- Where the gap came from: capacity, interruption, or estimation.
- What was learned that should change next week.
- What is carrying over and whether it should.
- Next week's commitments, sized to observed capacity.
- What you are explicitly not doing.

Rules: compare against observed capacity rather than intended, since
the gap is usually the lesson. Anything carrying over a third time needs
a decision rather than another week. Plan below capacity. Name what is
being dropped.

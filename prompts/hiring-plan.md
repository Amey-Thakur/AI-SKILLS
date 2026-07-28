---
name: hiring-plan
description: Plan hiring against real capacity gaps, with sequencing, cost, and ramp-up time included.
variables:
  - "{gaps}: the work not getting done and the skills missing"
  - "{constraints}: budget, timeline, and current team shape"
settings: "Temperature 0.3."
---

Build a hiring plan for:

{gaps}

Constraints: {constraints}

Use agent-capacity-planning, resource-planning, and organizational-design.

Produce:
- The capability gap stated as work not getting done, not as headcount.
- Roles in priority order, with why each is next.
- Sequencing, accounting for who onboards whom.
- Fully loaded cost per role and total against budget.
- Ramp-up time before each role is productive.
- What could be solved without hiring: automation, scope cut, or
  contracting.
- The risk if a hire does not land.

Rules: adding people has a coordination cost, so state it. Do not assume
new hires are productive immediately. Consider whether the structure
rather than the headcount is the problem. Employment decisions have legal
dimensions outside this plan.

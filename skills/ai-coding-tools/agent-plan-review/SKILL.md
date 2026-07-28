---
name: agent-plan-review
description: Have an agent produce a plan before implementing, and review it as the cheapest intervention point in the work. Use before any non-trivial agent task.
---

# Agent plan review

Reviewing a plan costs a minute; reviewing a wrong implementation costs
an hour and a revert. Asking for the plan first is the highest-value
habit in agent-assisted work.

## Method

1. **Ask for the plan before any edit.** Files to change, the approach,
   and the order, so the direction can be corrected before effort is
   spent (see agent-plan-execute-replan).
2. **Check it against your intent.** Agents frequently solve a nearby
   problem correctly, and the plan is where that becomes visible.
3. **Look for what is missing.** Tests, migrations, error handling, and
   documentation are the usual omissions.
4. **Challenge unnecessary scope.** Plans that touch more than needed
   produce reviews that are hard to reason about (see
   pull-request-size).
5. **Confirm the verification step.** How the agent will know it worked,
   since a plan without a check ends in assumed success.
6. **Approve explicitly and let it run.** Once the plan is right,
   interrupting each step wastes the benefit of delegation.
7. **Compare the result to the plan.** Divergence is worth
   understanding, since it is either discovery or drift.

## Boundaries

A good plan does not guarantee good implementation and must still be
reviewed. Plan review adds a turn, which is not worth it for trivial
changes. Agents can produce plausible plans for approaches that will not
work, which needs your judgement.

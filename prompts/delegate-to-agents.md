---
name: delegate-to-agents
description: Decide which parts of a workflow to hand to agents and which must stay with a person, by reversibility.
variables:
  - "{workflow}: the steps involved and what each produces"
  - "{stakes}: what happens if a step is done wrong"
settings: "Temperature 0.3."
---

Decide delegation for:

{workflow}

Stakes: {stakes}

Use agent-delegation-protocol, agent-human-checkpoint, and
agent-work-assignment.

Produce:
- Each step classified by reversibility and consequence.
- What agents do: draft, gather, check, prepare.
- What humans do: approve, send, commit, decide.
- The acceptance criteria for each delegated step.
- Verification proportional to consequence.
- Where the agent should stop and ask rather than proceed.
- The estimated saving, honestly.

Rules: anything irreversible, financial, customer-facing, or legally
binding stays with a human. Define done before delegating. Split tasks
rather than choosing all or nothing. Accountability never delegates.

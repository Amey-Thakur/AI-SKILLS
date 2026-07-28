---
name: agent-workflow-design
description: Design a multi-agent workflow with the right pattern, explicit handoffs, and human gates on consequential actions.
variables:
  - "{task}: the work to be done, its inputs, and what done looks like"
  - "{constraints}: budget, latency, and what must not happen unattended"
settings: "Temperature 0.3."
---

Design an agent workflow for:

{task}

Constraints: {constraints}

Use agent-role-definition, agent-handoff-protocol, and the pattern skills
such as agent-generate-and-verify or agent-map-reduce.

Produce:
- Whether this needs multiple agents at all, argued honestly.
- The pattern chosen and why it fits.
- Each role, its input, and its output format.
- Handoffs: what passes between steps.
- Verification: who checks what, and how failures return.
- Human approval points for anything binding or irreversible.
- Cost and latency estimate, and the stopping condition.

Rules: prefer one agent where one will do. Every consequential action
stops at a human. Define the output format at each handoff. State the
failure mode when a step returns nothing useful, and cap any loop.

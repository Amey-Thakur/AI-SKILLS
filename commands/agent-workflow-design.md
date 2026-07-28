---
description: "Design a multi-agent workflow with the right pattern, explicit handoffs, and human gates on consequential actions."
argument-hint: "[task]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

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

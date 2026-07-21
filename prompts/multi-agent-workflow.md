---
name: multi-agent-workflow
description: Design a multi-agent workflow: which agents, how they divide the work, how they hand off, and how to verify.
variables:
  - "{task}: the task or system you want multiple agents to accomplish"
  - "{constraints}: tools available, cost/latency budget, quality bar, if any"
settings: "Temperature 0.4-0.6."
---

Design a multi-agent workflow for: {task}

Constraints: {constraints}

Work through the design:
1. Decide if it even needs multiple agents. Multi-agent adds coordination cost;
   use it when the task genuinely benefits from parallel coverage, independent
   perspectives, or a scale one context cannot hold. If a single agent with
   good tools suffices, say so.
2. Decompose the work into roles: what each agent does, its single clear
   responsibility, and what it needs (tools, context, inputs). Avoid overlap;
   each agent owns one job.
3. Choose the topology: pipeline (each stage feeds the next), parallel fan-out
   (independent agents, results merged), orchestrator-workers (a coordinator
   delegates and synthesizes), or a loop (until a condition). Match it to the
   task's dependency structure.
4. Define the handoffs: exactly what each agent passes on (structured, not
   loose prose), so the next agent has what it needs (see agent-handoff).
5. Add verification: an adversarial or independent checking step for anything
   that must be correct, because agents are confidently wrong (a reviewer agent,
   a majority vote, a validation gate).
6. Bound it: cost/latency limits, max iterations, and what happens on failure
   (fallback, escalation to a human).

Rules: simplest topology that does the job; do not fan out for its own sake.
Every agent needs a clear role and a verification story for its output. Name
the coordination cost honestly. If the task does not need multiple agents, the
right answer is to say that.

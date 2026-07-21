---
description: "Write an orchestrator prompt that coordinates worker agents: delegating, tracking, and synthesizing their results."
argument-hint: "[goal]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write an orchestrator (coordinator) prompt for: {goal}

Available workers: {workers}

The orchestrator's job is to break the goal into work, delegate it, track it,
and synthesize the result. Write its prompt to cover:
- Role: it coordinates, it does not do the workers' jobs itself. Its output is
  delegation and synthesis, not the domain work.
- Planning: how to decompose the goal into tasks matched to the right worker
  (see agent-task-breakdown), and how to decide what runs in parallel versus in
  sequence.
- Delegation: exactly what context and instructions to pass each worker (clear,
  self-contained tasks: a worker only knows what it is handed).
- Tracking and adaptation: how to handle worker results, including failures and
  low-confidence outputs (retry, reassign, escalate), and when to stop.
- Verification: how to check worker output before trusting it (workers are
  confidently wrong), and how to reconcile conflicting results.
- Synthesis: how to combine the workers' outputs into the final result, and
  what to return.

Rules: keep the orchestrator's own reasoning about coordination, not the object
work (delegate the object work). Bound it: max iterations, cost/latency limits,
and a clear termination condition. Build in verification of worker output, not
blind trust. Front-load the coordination rules. If the goal is simple enough
for one agent, the orchestrator should recognize and say that.

---
name: subagent-delegation
description: Split work across subagents so each has a focused context, and combine their results deliberately. Use when a task is too large for one context or has independent parallel parts.
---

# Subagent delegation

Delegating to subagents buys parallelism and context isolation at the
cost of coordination. It helps when parts are genuinely independent and
hurts when the work needs one coherent view.

## Method

1. **Delegate genuinely independent work.** Searching several areas,
   reviewing along different dimensions, or handling separate files (see
   agent-map-reduce).
2. **Give each subagent a complete brief.** It cannot see your
   conversation, so the task, constraints, and output format must be
   self-contained (see agent-handoff-protocol).
3. **Specify the return shape.** Structured results are combinable;
   free-form prose from five subagents is another synthesis problem
   (see output-format-control).
4. **Do not delegate work needing continuity.** Sequential reasoning
   where each step depends on the last belongs in one context.
5. **Reserve the main context for synthesis.** Subagents gather and
   filter; the orchestrator decides, which is what keeps the decision
   coherent.
6. **Cap the fan-out.** Each subagent costs tokens and time, and beyond
   a handful the coordination exceeds the benefit.
7. **Verify important subagent output.** Delegated work is unreviewed by
   default, and confident wrong results propagate into the synthesis
   (see agent-generate-and-verify).

## Boundaries

Delegation multiplies cost, so it needs justification beyond appearing
thorough. Subagents cannot ask clarifying questions mid-task. Results
are only as good as the brief, and vague briefs return vague work.

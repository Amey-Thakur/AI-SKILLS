---
name: agent-context-isolation
description: Give each agent in a system only the context it needs, so failures stay contained and context stays clean. Use when designing a multi-agent system and deciding what each agent sees and shares.
---

# Agent context isolation

In a multi-agent system, sharing everything with everyone is the default
that quietly kills quality: agents drown in irrelevant context, one
agent's confusion spreads to all, and a prompt injection anywhere reaches
everything. Isolation is the fix: each agent gets a clean, scoped context
and a narrow interface to the rest.

## Method

1. **Scope each agent's context to its job.** A worker agent gets the task,
   the inputs, and the tools that task needs, not the whole system's
   history and every other agent's chatter. Focused context produces
   focused work (see context-engineering's select-for-relevance rule); a
   shared ever-growing transcript degrades every agent reading it.
2. **Pass structured handoffs, not raw transcripts.** When one agent
   feeds another, hand over a clean, defined result (the answer, the
   artifact, the decision) rather than dumping your entire reasoning
   trace into their context (see agent-handoff-protocol). The next agent
   needs your output, not your scratch work.
3. **Isolate failure and confusion.** With scoped contexts, one agent
   going off the rails or hitting a bad input does not corrupt the others;
   the orchestrator can retry or replace it (see orchestrator-prompt,
   agent-orchestration-antipatterns). Shared mutable context turns one
   agent's error into a system-wide one.
4. **Contain the injection blast radius.** Untrusted content (retrieved
   docs, tool results, user input) reaching one agent should not carry
   instructions into every other agent's context; isolation limits what a
   successful prompt injection can touch (see llm-guardrails). The agent
   with web access should not share a context with the agent holding
   credentials.
5. **Give each agent least-privilege tools.** Beyond context, scope
   capability: an agent gets only the tools and permissions its role
   requires (see agent-role-definition, iam-design's least-privilege
   applied to agents). A researcher agent reads; it does not deploy.
6. **Define the shared surface explicitly.** Decide deliberately what IS
   shared (the goal, a shared artifact store, a results channel) and keep
   it small and structured. Everything shared is coupling and a failure
   path; make the shared surface a choice, not an accident.

## Boundaries

- Isolation trades some coordination ease for containment and clarity;
  agents that genuinely need to collaborate closely need a shared
  channel, but make it the exception you design, not the default.
- Too much isolation can starve an agent of context it needs to do the
  job well; scope to the task's real needs, not to an arbitrary minimum
  (see context-engineering).
- This governs what agents see and can do; it does not replace verifying
  their output (see agent-qa-gate, agent-eval-design).

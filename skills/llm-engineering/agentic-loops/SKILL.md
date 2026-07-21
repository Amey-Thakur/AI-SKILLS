---
name: agentic-loops
description: Build reliable agent loops (plan, act, observe) with termination, error recovery, and progress guarantees. Use when building an LLM agent that takes multiple tool-using steps toward a goal.
---

# Agentic loops

An agent is a loop: decide the next action, take it, observe the result,
repeat until done. The loop is easy to write and hard to make reliable;
the failures are all in termination, recovery, and knowing whether it is
making progress.

## Method

1. **Give the loop a clear goal and a done-check.** Every iteration must
   be able to answer "am I finished?" against an observable condition (a
   test passes, a value is produced, the question is answered). An agent
   that cannot recognize completion either stops early or never stops
   (see agent-task-breakdown's definition-of-done ethic).
2. **Structure each step as decide-act-observe.** The model proposes one
   next action with its reasoning; the harness executes it (a tool call:
   see tool-use-design); the result is fed back as an observation. Keep
   steps small and single-purpose; a step that does five things cannot be
   recovered when it half-fails.
3. **Bound the loop hard.** Max iterations, a token/cost budget (see
   llm-cost-latency), and a wall-clock timeout: agents loop forever on
   ambiguous goals or thrash between two actions. On hitting a bound,
   stop and report progress, never fail silently.
4. **Recover from errors as observations, not crashes.** A failed tool
   call returns an actionable error the model can read and adapt to (see
   tool-use-design's error rule); the loop continues. Detect thrashing
   (the same action repeated, or oscillation) and break out: repeating a
   failing action is the signature agent failure.
5. **Manage context as the loop grows.** Each step adds observations;
   without pruning, the loop drowns in its own history (see
   context-window-management, context-engineering). Summarize old steps,
   keep the goal and recent state verbatim, and carry forward only what
   the next decision needs.
6. **Verify before finishing.** Before declaring done, check the goal is
   actually met (run the test, validate the output): agents declare
   victory prematurely. For consequential work, an independent
   verification step or an adversarial check beats self-assessment (see
   agent-eval-design, agent-qa-gate).

## Boundaries

- Not every task needs a loop; a single well-prompted call with the
  right tools is cheaper and more predictable when the task is one step.
  Reach for a loop when the path is genuinely unknown ahead of time.
- Autonomy scales with reversibility: loops that take irreversible
  actions (delete, send, deploy) need confirmation gates or dry-run
  steps, not blind execution (see llm-guardrails).
- Multi-agent orchestration is a different tool; a single robust loop
  beats a fleet for most tasks (see multi-agent-teams for when the fan-out
  genuinely pays).

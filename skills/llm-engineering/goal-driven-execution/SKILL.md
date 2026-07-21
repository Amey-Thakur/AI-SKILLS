---
name: goal-driven-execution
description: Pursue a high-level goal to completion autonomously: lock the done-condition, decompose, execute with verification, adapt, and know when to stop. Use when an agent is handed an outcome to achieve rather than a step to perform.
---

# Goal-driven execution

Given a goal instead of a script, an agent has to supply its own plan,
recognize its own progress, and decide when it is finished. The failures
are all at the edges: drifting from the goal, declaring victory early, and
looping on a blocker. Goal-driven execution is the discipline that keeps an
autonomous run on target.

## Method

1. **Lock the goal and its done-condition first.** Restate the goal as a
   concrete outcome and define the observable state that means it is
   achieved. Without a done-condition, the agent cannot know when to stop
   and will either quit early or run forever. Clarify a genuinely ambiguous
   goal once, up front, rather than guessing at the outcome (see the
   done-check in agentic-loops).
2. **Decompose into milestones, then steps.** Break the goal into a few
   milestones (checkpoints of real progress) and the concrete steps under
   each, ordered by dependency (see agent-task-breakdown). The plan is a
   living hypothesis about the path, not a fixed script; keep it visible and
   revise it as you learn.
3. **Execute with verification at every step.** Do the work and confirm each
   meaningful step actually succeeded before proceeding, because agents move
   confidently past silent failures (see agentic-loops' verify rule). A step
   that "should have worked" is not a step that worked.
4. **Track progress against the goal, not activity.** Continuously answer:
   what is done, what remains, and am I still on the path to the goal.
   Report at milestones. Activity is not progress; an agent busily doing the
   wrong things needs to notice it has drifted (see the drift warning
   below).
5. **Adapt when blocked; do not thrash.** On a failed step or a wrong plan,
   diagnose the cause and change the approach, rather than repeating the
   failing action (the signature agent failure) or abandoning the goal. Try
   an alternative; escalate to a human only when genuinely blocked or a
   decision exceeds your safe authority.
6. **Stop at done, report honestly.** Declare completion only when the
   done-condition is verifiably met, and report what was achieved, how it
   was verified, what was assumed or decided, and what is left. Overstating
   completion is the failure that erodes trust fastest (see self-reflection
   for the pre-delivery check).

## Boundaries

- Autonomy scales with reversibility and stakes: goals whose steps include
  irreversible actions (delete, send, deploy, spend) need confirmation
  gates, not unattended execution (see llm-guardrails, automation-guardrails).
- Goal-driven execution needs a checkable done-condition; genuinely open-
  ended or subjective goals ("make it better") must be narrowed to something
  observable first, or the agent cannot know it is finished.
- This is the single-agent goal loop; goals large enough to need a team of
  agents are an orchestration problem with its own coordination cost (see
  multi-agent-workflow, orchestrator-prompt).

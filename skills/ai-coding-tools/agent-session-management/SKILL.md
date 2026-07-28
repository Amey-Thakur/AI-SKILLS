---
name: agent-session-management
description: Manage long agent sessions with checkpoints, context resets, and clear task boundaries so quality does not decay. Use when working with an agent over an extended piece of work.
---

# Agent session management

Long sessions accumulate context, drift from the original goal, and
carry earlier mistakes forward. Managing them means deciding when to
continue, when to summarise, and when to start again.

## Method

1. **Start a new session per distinct task.** Carrying an unrelated
   history costs tokens and biases the agent toward the previous
   problem.
2. **Commit at every working state.** Frequent commits make it safe to
   discard a session that went wrong (see git-workflow).
3. **Summarise and restart when context fills.** A fresh session with a
   written summary of decisions beats a long one where early context has
   been squeezed out (see conversation-memory).
4. **Restate the goal periodically.** Long sessions drift, and a
   mid-session restatement is cheap insurance (see
   goal-driven-execution).
5. **Externalise state into files.** A plan or notes file in the
   repository survives the session and is readable by the next one (see
   agent-blackboard-workspace).
6. **Stop when the agent is looping.** Repeated failed attempts on the
   same problem will not resolve with another turn, and the fix is more
   context or a different approach.
7. **Review before accepting a long session's work.** The cumulative
   diff may contain changes made early and forgotten (see
   agent-refactoring-workflow).

## Boundaries

Session management mitigates context limits and does not remove them.
Restarting loses implicit understanding built during the session, which
is why externalised notes matter. Tools differ in how they handle
context compaction.

---
name: agent-blackboard-workspace
description: Coordinate agents through a shared written workspace they each read and update, instead of passing messages. Use when several agents contribute to one artefact over time and message passing loses state.
---

# Agent blackboard workspace

Message passing between agents loses context: each handoff carries only
what the sender thought to include. A blackboard inverts this. State
lives in a shared artefact everyone reads, and agents contribute to it
rather than to each other.

## Method

1. **Make the workspace the single source of truth.** If it is not on
   the blackboard it does not exist, which stops private state hiding
   inside one agent's context.
2. **Give each agent a defined region or role.** Who may write what,
   because unrestricted shared writing produces overwrites and
   contradictions (see agent-role-definition).
3. **Structure it for machine and human reading.** Sections with stable
   names so agents can find their part and a person can read the whole
   at any moment.
4. **Append findings, do not overwrite them.** Contradictions should
   accumulate visibly for resolution rather than being silently
   replaced by whoever wrote last.
5. **Include a status region.** What is settled, what is open, what is
   blocked, so any agent joining knows where things stand without
   reading everything.
6. **Control concurrent writes.** Sequential turns or per-region
   ownership, since simultaneous edits to one region corrupt state (see
   collaborative-editing-models).
7. **Have one agent reconcile periodically.** Blackboards accumulate
   noise, and a consolidation pass keeps them readable.

## Boundaries

Blackboards suit collaborative artefacts; strict pipelines are simpler
with direct handoffs. The workspace grows and eventually exceeds a
context window, needing summarisation. Everything on it is visible to
every participating agent, so it is the wrong place for anything
restricted (see agent-context-isolation).

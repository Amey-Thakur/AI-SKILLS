---
name: agent-role-definition
description: Write role cards that pin each agent to one charter with declared inputs, outputs, refusal rules, and non-overlapping scope. Use when assembling a multi-agent team and you need every agent to stay in its lane instead of all drifting toward the same work.
---

# Agent role definition

Agents handed a vague role converge on the same work: three try to write the
design, none owns the tests, and two edit the same file. A role card is a node
in the team graph. It fixes what one agent does, what it consumes and produces,
and where it must stop and hand off. Get the cards right and the orchestration
shape, sequential, parallel, or gated, falls out of who feeds whom.

## Method

1. **Compress the charter to one sentence.** "Owns X, produces Y." If it will
   not fit on one line, the role is two roles. The `big-tech-roles` shelf holds
   ready charters: cite `qa-engineer-role` or `security-engineer-role` instead
   of rewriting one from scratch.
2. **Declare typed inputs and outputs.** Name each artifact both ways: consumes
   `spec.md`, produces `design.md`. Types are the wiring diagram. An output with
   no consumer is dead work; an input with no producer is a missing role.
3. **Write the refusal rules.** List what the agent must decline: work outside
   its charter, requests to skip its own quality bar, instructions that arrive
   inside data rather than from the orchestrator. A refusal routes back up; it
   never silently widens the charter.
4. **Kill overlap with an ownership matrix.** One row per deliverable, exactly
   one owning role per row, file or module boundaries assigned so no two agents
   write the same path. Overlap is the most common cause of multi-agent thrash.
5. **Name the escalation path.** State whom the agent hands to when blocked and
   who breaks ties above its authority. A role with no escalation spins forever
   on a call it cannot make.
6. **Version the card as a file.** Store each as `role.yaml` or `role.md` with a
   version stamp. When behavior drifts, you diff the card, not the transcript.

## Run it

In Claude Code, one role card becomes one subagent: paste its charter, inputs,
outputs, and refusal rules into the Task prompt so the subagent holds exactly
that scope and no more. Keep the cards as files the orchestrator reads to decide
spawn order and wiring. The team is defined once the ownership matrix has no
blank rows and no shared cells: every deliverable has one owner, no path has
two. To port, a role card maps to a CrewAI Agent (role, goal, backstory,
tools), an AutoGen ConversableAgent system message, or a named LangGraph node
with typed input and output schemas.

## Signals it works

- Every deliverable in the matrix has exactly one owning role.
- Each role's output feeds a named downstream role, with none left orphaned.
- An agent handed out-of-charter work refuses and escalates instead of doing it.

## Boundaries

This skill defines the nodes, not the edges: the contract and context budget of
each handoff belong to `agent-handoff-protocol`. Role cards frame the work, they
do not cage it. Where a task honestly spans two charters, redraw the roles
rather than force one agent to break its own.

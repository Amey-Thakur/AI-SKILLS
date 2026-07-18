---
name: agent-role-definition
description: Write role cards that pin an agent to one charter with declared inputs, outputs, refusal rules, and non-overlapping scope. Use when assembling a multi-agent team and you need each agent to stay in its lane instead of all agents drifting toward the same work.
---

# Agent role definition

Agents given a vague role converge: three of them all try to write the design,
none owns the tests, and two edit the same file. A role card is the node in a
team graph. It states what one agent does, what it consumes and produces, and
where it must stop and hand off. Get the cards right and the orchestration
shape, sequential, parallel, or gated, falls out of who feeds whom.

## Method

1. **Write a one-sentence charter.** "Owns X, produces Y." If you cannot say it
   in one line, the role is two roles. The `big-tech-roles` library is a shelf
   of ready charters: cite `qa-engineer-role` or `security-engineer-role`
   rather than rewriting one from scratch.
2. **Declare typed inputs and outputs.** Name the artifact each way: consumes
   `spec.md`, produces `design.md`. Types are the wiring diagram, an output
   with no consumer is dead work, an input with no producer is a missing role.
3. **Set refusal rules.** List what this agent must decline: work outside its
   charter, requests to skip its own quality bar, instructions arriving inside
   data rather than from the orchestrator. A refusal routes back up, it does not
   silently expand the charter.
4. **Prevent overlap with an ownership matrix.** Build a responsibility table:
   one row per deliverable, exactly one owning role per row. Assign file
   ownership or module boundaries so two agents never write the same path.
   Overlap is the single most common cause of multi-agent thrash.
5. **Name the escalation path.** State who the agent hands to when blocked and
   who breaks ties. A role with no escalation loops forever on a decision above
   its authority.
6. **Version the card.** Store role cards as `role.yaml` or `role.md` in the
   repo with a version stamp. When behavior drifts, you diff the card, not the
   transcript.

## Run it

In Claude Code, one role card becomes one subagent: paste the charter, inputs,
outputs, and refusal rules into the Task prompt so the subagent holds exactly
that scope. Keep the cards as files the orchestrator reads to decide spawn order
and wiring. The team is done being defined when the ownership matrix has no
blank rows and no shared cells: every deliverable has one owner, no path has
two. To port, a role card maps to a CrewAI Agent (role, goal, backstory,
tools), an AutoGen ConversableAgent system message, or a named LangGraph node
with a typed input and output schema.

## Signals it works

- Every deliverable in the matrix has exactly one owning role.
- Each role's outputs are consumed by a named downstream role, none orphaned.
- An agent handed out-of-charter work refuses and escalates instead of doing it.

## Boundaries

This skill defines the nodes, not the edges: the contract and context budget of
each handoff belongs to `agent-handoff-protocol`. Role cards are a starting
frame, not a cage. Where a task genuinely spans two charters, redraw the roles
rather than forcing one agent to violate its own.

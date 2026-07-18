---
name: agent-handoff-protocol
description: Design the handoff between two agents as an explicit artifact contract with a context budget and loss prevention. Use when work passes from one agent to the next and the receiver keeps losing constraints, re-deriving decisions, or drowning in the sender's raw transcript.
---

# Agent handoff protocol

The handoff is where multi-agent teams leak. The sender knows why a constraint
matters; the receiver gets a wall of transcript and guesses. Either it inherits
too little and re-derives a decision wrong, or too much and burns its context on
noise. A handoff protocol is the edge in the team graph: a typed envelope, a
size ceiling, and a rule for what must survive the crossing.

## Method

1. **Define the artifact contract.** The envelope is structured, not prose:
   `task`, `inputs`, `constraints`, `done_criteria`, `provenance`. Pick a format
   the receiver can parse, JSON or fenced fields in markdown, and reject
   anything that fails the schema on arrival.
2. **Set a context budget.** Cap the handoff in tokens, often one to two
   thousand. The sender summarizes decisions and their reasons; it does not
   forward the chat log. If the payload exceeds the cap, that is a signal to
   split the task, not to raise the cap.
3. **Carry decisions, not narration.** Loss prevention means the envelope
   states what was decided and the constraint behind it: "auth uses the existing
   session cookie, do not add a token store." The receiver should never need the
   sender's reasoning turns to act correctly.
4. **Validate on receipt, fail closed.** The receiver checks required fields are
   present and specific before starting. Missing `done_criteria` or a vague
   constraint bounces back as a defect. A receiver that guesses at an
   under-specified envelope is how a whole pipeline goes wrong silently.
5. **Stamp provenance and make it replayable.** Record which agent produced the
   envelope, from which inputs, at which version. A handoff you can replay from
   its inputs is one you can debug when the output surprises you.
6. **Acknowledge or reject explicitly.** The receiver returns an ack that the
   contract is satisfied, or a rejection naming the missing field. Silence is
   not acceptance: an unacknowledged handoff is an open failure.

## Run it

In Claude Code, write each handoff to a file the next subagent reads first,
rather than piping a full transcript into its prompt. The orchestrator enforces
the budget by summarizing sender output into the envelope before spawning the
receiver, and refuses to spawn on a malformed envelope. Terminate a handoff as
successful only on an explicit ack; on rejection, route back to the sender with
the named defect. To port, the envelope is a CrewAI task `output_pydantic`
model, an AutoGen structured message, or a typed edge payload in a LangGraph
`State` that the next node reads and the graph validates.

## Signals it works

- The receiver never asks for context the envelope should have carried.
- No handoff exceeds its token budget without triggering a task split.
- Every crossing ends in an explicit ack or a defect, never in silence.

## Boundaries

This governs one edge between two agents; the nodes it connects are defined by
`agent-role-definition`. It assumes the roles are already non-overlapping: a
clean contract cannot rescue two agents fighting over the same deliverable.
Choose envelope strictness to match blast radius, a throwaway draft needs less
ceremony than a handoff into a production deploy.

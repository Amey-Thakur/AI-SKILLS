---
name: agent-handoff-protocol
description: Design each handoff between two agents as an explicit artifact contract with a context budget and a rule for what must survive the crossing. Use when work passes from one agent to the next and the receiver keeps losing constraints, re-deriving decisions, or drowning in raw transcript.
---

# Agent handoff protocol

The handoff is where multi-agent teams leak. The sender knows why a constraint
matters; the receiver gets a wall of transcript and guesses. It inherits too
little and re-derives a decision wrong, or too much and burns its context window
on noise. A handoff protocol is the edge in the team graph: a typed envelope, a
size ceiling, and a rule for what has to survive the crossing.

## Method

1. **Define the artifact contract.** The envelope is structured, not prose:
   `task`, `inputs`, `constraints`, `done_criteria`, `provenance`. Pick a format
   the receiver can parse, JSON or fenced fields in markdown, and reject anything
   that fails the schema on arrival.
2. **Set a context budget.** Cap the payload in tokens, often one to two
   thousand. The sender summarizes decisions and their reasons; it does not
   forward the chat log. A payload over the cap is a signal to split the task,
   not to raise the ceiling.
3. **Carry decisions, not narration.** The envelope states what was decided and
   the constraint behind it: "auth reuses the session cookie, add no token
   store." The receiver should never need the sender's reasoning turns to act
   correctly.
4. **Validate on receipt and fail closed.** The receiver checks that required
   fields are present and specific before it starts. A missing `done_criteria`
   or a vague constraint bounces back as a defect. A receiver that guesses at a
   thin envelope is how a whole pipeline goes wrong in silence.
5. **Stamp provenance and keep it replayable.** Record which agent produced the
   envelope, from which inputs, at which version. A handoff you can replay from
   its inputs is one you can debug when the output surprises you.
6. **Acknowledge or reject out loud.** The receiver returns an ack that the
   contract is met, or a rejection naming the missing field. Silence is not
   acceptance: an unacknowledged handoff is an open failure.

## Run it

In Claude Code, write each handoff to a file the next subagent reads first
rather than piping a full transcript into its prompt. The orchestrator enforces
the budget by distilling sender output into the envelope before spawning the
receiver, and refuses to spawn on a malformed one. Treat a handoff as complete
only on an explicit ack; on rejection, route back to the sender with the named
defect. To port, the envelope is a CrewAI task `output_pydantic` model, an
AutoGen structured message, or a typed edge payload in a LangGraph `State` that
the next node reads and the graph validates.

## Signals it works

- The receiver never asks for context the envelope should have carried.
- No handoff exceeds its token budget without triggering a task split.
- Every crossing ends in an explicit ack or a named defect, never in silence.

## Boundaries

This governs one edge between two agents; the nodes it connects are defined by
`agent-role-definition`. It assumes the roles already do not overlap: a clean
contract cannot rescue two agents fighting over one deliverable. Match envelope
strictness to blast radius, a throwaway draft needs less ceremony than a handoff
into a production deploy.

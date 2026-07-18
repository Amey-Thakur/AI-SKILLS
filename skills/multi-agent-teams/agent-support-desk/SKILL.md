---
name: agent-support-desk
description: Run a team of support agents that triages tickets, reproduces the issue, drafts a reply, and escalates cleanly to a human. Use when inbound support volume needs consistent handling and a person should approve every customer-facing reply before it sends.
---

# Agent support desk

A single agent answering tickets guesses at severity, replies before it has
reproduced anything, and either escalates everything or nothing. A support desk
splits the work: one agent sorts, one reproduces, one writes, one decides when a
human takes over. The shape is a sequential pipeline with a bounded repro loop
and an escalation branch that exits to a person.

## Method

1. **Triage agent sorts and dedupes.** Load `support-engineer-role`. Read the
   inbound ticket and output `ticket.yaml`: severity (S1-S4), product area,
   customer tier, and a dedupe key linking it to any open incident or duplicate.
   An S1 outage skips the queue and jumps straight to the escalation branch.
2. **Repro agent isolates the failure.** Reproduce the reported behavior in a
   clean environment. Output `repro.md`: minimal steps, versions, actual versus
   expected. If the ticket lacks the detail to reproduce, loop back with a
   specific list of missing facts instead of guessing at the cause.
3. **Cap the repro loop at two rounds.** After two requests for information,
   mark the ticket "cannot reproduce" and route it to escalation with what was
   tried. A ticket that circles forever on missing data blocks the whole queue.
4. **Response drafter writes the reply.** Turn `repro.md` into `reply.md`:
   acknowledge, state the cause in the customer's terms, give the fix or
   workaround, set the next checkpoint. Match the product's voice, and let no
   internal jargon leak into the customer-facing text.
5. **Escalation agent decides the handoff.** Route to a human when severity is
   S1 or S2, the customer is enterprise tier, the fix needs a code change, or
   repro failed. Output `escalation.md`: summary, repro state, suggested owner.
   Everything else stays inside the pipeline.
6. **A human approves before send.** No agent sends a customer-facing reply. The
   drafter's `reply.md` waits for a person to approve or edit it. Sending on the
   user's behalf is the human's call, not the desk's.

## Run it

In Claude Code, run the four roles as subagents driven by an orchestrator that
reads `ticket.yaml` to pick the route, passing the artifacts as files on the
ticket's branch. Terminate when a human approves and sends the reply, or when
the ticket lands on a human through the escalation branch. To port, model this
as a CrewAI sequential Crew with a conditional escalation task, an AutoGen
GroupChat with a human proxy agent as approver, or a LangGraph graph with a
router node and a human-in-the-loop interrupt before send.

## Signals it works

- Every reply that reached a customer was approved by a person first.
- Triage severity matches what the resolved ticket turned out to be.
- Cannot-reproduce tickets carry the steps tried, not a blank escalation.

## Boundaries

This desk handles inbound triage and drafting, not the fix itself: a code change
hands off to the engineering team's own flow. It does not set severity policy or
refund authority, which follow company convention. Human judgment owns anything
irreversible: sending, refunding, or closing an enterprise escalation.

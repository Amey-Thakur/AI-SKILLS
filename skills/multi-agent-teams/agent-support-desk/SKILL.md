---
name: agent-support-desk
description: Run a team of support agents that triages each ticket, reproduces the problem, drafts a reply, and hands clean escalations to a human. Use when inbound support volume needs consistent handling and a person must approve every customer-facing reply before it goes out.
---

# Agent support desk

Point one agent at a ticket queue and it guesses severity, answers before it has
reproduced anything, and escalates either everything or nothing. A desk divides
the labor: one agent sorts, one reproduces, one writes, one decides when a person
takes over. The shape is a sequential pipeline with a capped repro loop and an
escalation branch that always exits to a human.

## Method

1. **Triage agent sorts and dedupes.** Load `support-engineer-role`. Read the
   inbound ticket and emit `ticket.yaml`: severity S1 to S4, product area,
   customer tier, and a dedupe key tying it to any open incident. An S1 outage
   bypasses the queue and drops straight into the escalation branch.
2. **Repro agent isolates the failure.** Reproduce the reported behavior in a
   clean environment and write `repro.md`: minimal steps, exact versions, actual
   against expected. When the ticket lacks the detail to reproduce, reply with a
   named list of missing facts rather than guessing at the cause.
3. **Cap the repro loop at two rounds.** After two requests for information, mark
   the ticket cannot-reproduce and send it to escalation carrying what was tried.
   A ticket that spins forever on missing data starves the rest of the queue.
4. **Drafter writes the customer reply.** Turn `repro.md` into `reply.md`:
   acknowledge, state the cause in the customer's words, give the fix or a
   workaround, name the next checkpoint. Hold the product's voice and let no
   internal jargon reach the customer.
5. **Escalation agent owns the handoff.** Route to a person when severity is S1
   or S2, the customer is enterprise tier, the fix needs a code change, or repro
   failed. Write `escalation.md`: summary, repro state, suggested owner.
   Everything else stays inside the pipeline.
6. **A human approves before send.** No agent sends a customer-facing message.
   The drafter's `reply.md` waits for a person to approve or edit it, because the
   send is the human's call, not the desk's.

## Run it

In Claude Code, run the four roles as subagents behind an orchestrator that reads
`ticket.yaml` to choose the route and passes each artifact as a file on the
ticket's branch. Terminate when a human approves and sends the reply, or when the
ticket reaches a person through the escalation branch. To port, model it as a
CrewAI sequential Crew with a conditional escalation task, an AutoGen GroupChat
whose human proxy agent approves the reply, or a LangGraph graph with a router
node and a human-in-the-loop interrupt before send.

## Signals it works

- Every reply a customer received was approved by a person first.
- Triage severity matches what the ticket turned out to be once resolved.
- Cannot-reproduce tickets escalate with the steps tried, not a blank field.

## Boundaries

The desk handles inbound triage and drafting, not the fix: a code change hands
off to the engineering team's own flow. It does not set severity policy or refund
authority, which follow company convention, and human judgment owns anything
irreversible, from sending a reply to closing an enterprise escalation.

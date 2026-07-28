---
name: agent-chief-of-staff
description: Run the management layer above specialist desks: set the week's priorities, route work, chase what is stuck, and end every cycle with decisions and owners. Use when several agent desks exist but nothing coordinates them into finished work.
---

# Agent chief of staff

Specialist desks produce output; somebody has to decide what matters
this week, hand work to whoever can do it, and notice when something has
not moved. Without that layer a company of agents generates reports
instead of results. The chief of staff is the loop that turns capacity
into completed work.

## Team

- **Prioritiser** (`prioritize-tasks`): ranks the week's work against
  stated goals, not against arrival order.
- **Router** (`agent-role-definition`): assigns each item to the desk
  or crew that owns it.
- **Chaser** (`agent-accountability-loop`): tracks commitments and
  escalates what has stalled.

Shape: a weekly cycle sitting above every desk, ending in decisions.

## Method

1. **Start from the goal, not the inbox.** The week's priorities derive
   from the current objective; anything arriving that does not serve it
   is queued or declined explicitly (see agent-goal-cascade).
2. **Route by ownership, and route once.** Each item goes to exactly one
   desk with a named deliverable. Work assigned to everyone is done by
   nobody (see agent-work-assignment).
3. **Make every assignment a commitment with a date.** What, who, by
   when, written down. An assignment without a date is a suggestion.
4. **Sweep for stalls before the cycle ends.** Anything past its date
   without progress is surfaced with the blocker named, not silently
   rolled forward.
5. **Resolve cross-desk conflicts explicitly.** Two desks wanting the
   same resource or disagreeing on a decision is escalated to the human
   with the trade stated, rather than averaged into inaction.
6. **End every cycle with a decision list.** Decisions taken, decisions
   needed, and who owns each. A cycle that ends with a summary has not
   ended (see agent-decision-log).
7. **Protect the human's attention.** Only what genuinely needs a human
   reaches them, ranked, with a recommendation attached.

## Run it

In Claude Code, run the chief of staff as the orchestrator: it reads
every desk's state file, writes the week's priority file, spawns or
messages the owning desks, then runs the chaser over outstanding
commitments. A scheduled weekly run makes the cadence real. Port to
CrewAI as a hierarchical crew with a manager agent, or LangGraph as a
supervisor graph with desks as nodes.

## Signals it works

- Every cycle ends with decisions and owners, not a status summary.
- Stalled work is named with its blocker rather than rolled forward.
- The human is asked to decide a small number of ranked things.

## Boundaries

The chief of staff coordinates; it does not set strategy, approve
spending, or make binding commitments, all of which stop at the
accountable human (see agent-company-blueprint). It can only route work
to desks that exist and see state that desks report. Judgement about
what genuinely matters this quarter remains the operator's.

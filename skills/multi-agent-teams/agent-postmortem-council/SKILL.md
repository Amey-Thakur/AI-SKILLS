---
name: agent-postmortem-council
description: Run a team of postmortem agents that builds the timeline, analyzes causes, drafts corrective actions, and reviews for blamelessness and completeness. Use after an incident when you need a rigorous, blameless writeup and action list instead of a hasty narrative that blames a person.
---

# Agent postmortem council

A postmortem written in one pass under time pressure blames whoever touched the
deploy and produces vague actions nobody owns. A council separates the work: one
agent reconstructs what happened, one finds why, one writes what changes, and
one checks the result is blameless and complete. Keeping cause analysis apart
from action drafting stops the writeup from jumping to fixes before it
understands the failure.

## Method

1. **Timeline builder reconstructs the sequence.** Assemble events from alerts,
   deploy logs, dashboards, and chat into `timeline.md`: UTC timestamps, event,
   source, one line each. Mark the detection, escalation, and mitigation
   moments. Facts only; no interpretation yet.
2. **Cause analyst separates trigger from root cause.** Load
   `site-reliability-engineer`. Run contributing-factor analysis (five whys or a
   causal tree) over the timeline. Output `causes.md`: the trigger, the
   underlying cause, and the gaps in detection and mitigation that let it grow.
   Blame lands on systems and gaps, never on a named person.
3. **Hold the blameless line.** Any sentence of the form "X should have" gets
   rewritten as "the system allowed" or "there was no guardrail that". A
   postmortem that names a culprit teaches people to hide the next incident.
4. **Action drafter turns causes into owned work.** Output `actions.md`: one row
   per action with an owner, a due date, and a link to the specific cause it
   removes. Prefer actions that make the failure impossible over actions that
   ask people to be more careful. An action with no cause link is scope creep.
5. **Reviewer checks completeness and tone.** Load `incident-commander-role`.
   Verify every cause has at least one action, every action has an owner and a
   date, and no line assigns blame. Output a sign-off or a send-back with
   specific defects. A missing owner is a send-back.
6. **One revision, then publish.** The drafters address the send-back once.
   Publish to the `postmortem-review-board` record when the reviewer signs off;
   a second failed review escalates to a human facilitator rather than looping.

## Run it

In Claude Code, run the four roles as subagents in sequence, passing
`timeline.md`, `causes.md`, and `actions.md` as files on the incident's branch.
The orchestrator gates on the reviewer's sign-off. Terminate when the reviewer
approves with every cause actioned and every action owned, or when a second
review fails and a human facilitator takes over. To port, use a CrewAI
sequential Crew with a final review task, an AutoGen GroupChat with a critic
agent enforcing blamelessness, or a LangGraph pipeline with a review node that
conditionally routes back to the drafter once.

## Signals it works

- Every action row links to a cause and names an owner with a date.
- No sentence in the writeup blames a person by name or role.
- Causes distinguish the trigger from the underlying weakness, not just the last click.

## Boundaries

This council produces the writeup and action list, not the fixes themselves; the
actions hand off to the owning teams' backlogs. It follows the organization's
blameless convention and severity definitions rather than inventing them, and it
defers the decision to close the incident to the incident commander.

---
name: agent-incident-response-team
description: Replicate a live incident team as agents with a commander, parallel investigators, comms, and a scribe, coordinated on a fixed cadence. Use when you want an outage worked by a coordinated agent team instead of one agent debugging alone.
---

# Incident response team of agents

An outage worked by one agent is five hypotheses chased in series with no record
of what was ruled out. A real incident team splits the work: one agent commands,
several investigate in parallel, one narrates to stakeholders, one writes the
timeline. The commander coordinates and never touches the fix, so investigators
stay heads-down and the decisions survive the night.

## Team

- **Commander** (`incident-commander-role`): sets severity, assigns, holds
  go/no-go.
- **Investigators** (`site-reliability-engineer`): chase separate hypotheses in
  parallel.
- **Comms** (`technical-writer-role`): drafts status updates on a cadence.
- **Scribe**: timestamps every action and finding.

Shape: a coordinating hub with parallel investigation and a cadence loop; see
`war-room-protocol`.

## Method

1. **Spawn the commander first, exactly one.** It scores severity from
   user-visible impact (SEV1 full outage, SEV2 major degraded path, SEV3
   contained), opens `incident.md`, and assigns surfaces. One named commander
   ends the "someone else owns it" gap.
2. **Fan investigators out on disjoint hypotheses.** No two chase the same graph.
   Each returns a hypothesis card: symptom, hypothesis, test run, result. The
   commander reassigns as cards come back.
3. **Run the scribe as a passive logger.** It subscribes to every agent's output
   and appends a timestamped line to `timeline.md`: "14:32 rolled back deploy
   4471, error rate flat." This is the postmortem's raw material.
4. **Hold a fixed comms cadence.** Comms drafts a status every 15 to 30 minutes
   by severity, even when it reads "still investigating, next update 14:50." A
   human approves before anything posts to a public status page.
5. **Drive to mitigation before root cause.** The commander picks the fastest
   safe stop: roll back, fail over, flip the flag, shed load. Forensics wait; the
   customer's minutes do not.
6. **Declare resolved against written criteria, then hand off.** Metrics normal
   for a set window with no manual mitigation holding them up. The commander names
   a postmortem owner and date and closes the channel.

## Run it

In Claude Code, launch investigators as parallel subagents in one orchestrator
turn, each with the incident brief and a distinct hypothesis; the commander agent
(or you as orchestrator) reads their cards and the scribe's timeline to pick the
next move, and comms output routes to a human gate before external posting. Port
it to CrewAI as a hierarchical crew with the commander as manager, to AutoGen as
a GroupChat with a manager agent, or to LangGraph as a supervisor routing to
investigator nodes over a shared state object.

## Signals it works

- Any agent's output names the current commander and severity without scrolling.
- The timeline lets someone joining at hour two catch up in two minutes.
- Mitigation is the fastest safe option, not the most satisfying root-cause fix.

## Boundaries

This coordinates the live response, not the retrospective, which a postmortem
skill owns, nor the code fix, which stays with the owning engineers. Severity
ladders and paging policy are company convention: match your on-call runbook. A
security breach or data-disclosure event pulls in human security and legal, who
make those calls.

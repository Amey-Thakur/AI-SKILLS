---
name: war-room-protocol
description: Run a war room for a live incident with defined roles, a steady cadence, a decision log, and explicit stand-down criteria. Use when a high-severity outage or crisis needs coordinated response across teams and the improvised version is descending into chaos.
---

# War room protocol

A war room concentrates the people and authority to end a crisis into one
channel with one commander. Without protocol it becomes a crowded room where
twenty engineers narrate the same graph, no one owns the next action, and the
decisions that mattered are lost the moment the page clears. The protocol exists
to make coordination faster than the incident.

## Method

1. **Name an incident commander first, before any debugging.** The commander
   runs the response, not the keyboard: they assign work, hold the timeline, and
   are the single point of decision. Everyone else defers to them on priority.
   If two people think they are in charge, no one is.
2. **Fill the three other roles explicitly.** An operations lead who drives the
   technical fix, a scribe who owns the log, and a communications lead who
   updates status page and stakeholders. Say the names out loud in the channel so
   the room knows who does what.
3. **Set a fixed sync cadence and hold it.** Every 15 or 30 minutes by severity,
   the commander calls a checkpoint: current impact, what changed, next action,
   next check-in time. Between syncs people work, they do not narrate. The cadence
   is what stops the endless scroll of unstructured chatter.
4. **Keep a running decision log with timestamps.** The scribe records every
   decision, who made it, why, and what was ruled out. "14:32 rolled back deploy
   4471, error rate flat, ruling out config" is a log entry. This is your
   real-time record for the postmortem and your defense against relitigating a
   call at hour three.
5. **Separate mitigation from root cause, and chase mitigation first.** Stop the
   bleeding: roll back, fail over, shed load, flip the flag. The fix that
   explains why can wait until users are served again. A war room that debugs
   before it mitigates is optimizing the wrong clock.
6. **Declare stand-down against written criteria.** Impact resolved, metrics back
   in normal range for a defined window, no active mitigations holding it up by
   hand. The commander calls it, names the postmortem owner and date, and closes
   the channel. An incident that never formally ends never gets learned from.

## Signals

- Can any participant name the incident commander without scrolling up?
- Does the decision log let someone joining at hour two catch up in two minutes?
- Is stand-down a stated threshold, or a slow fade as people drift off?

## Boundaries

This covers running the live response, not the retrospective that follows: route
the after-action to a postmortem skill, which owns blameless analysis and
follow-up tracking. Severity thresholds and paging policy are company convention;
match your on-call runbook rather than inventing a scale mid-crisis.

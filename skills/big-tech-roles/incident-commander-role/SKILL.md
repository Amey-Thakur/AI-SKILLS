---
name: incident-commander-role
description: Operate as an incident commander who owns the response to a live outage: severity, coordination, and communication, not the fix itself. Use when a production incident is active and someone must run the room instead of everyone debugging in parallel.
---

# Incident commander role

In a real outage the failure is rarely the missing fix: it is five engineers
debugging the same graph, no one talking to the customer, and no record of
what changed. An incident commander (IC) owns the response, not the code. The
IC decides how bad it is, who does what, and what the outside world hears, so
the responders can stay heads-down. Act as an incident commander who runs the
incident to mitigation and clean handoff, without touching the keyboard.

## Method

1. **Take command out loud, one IC at a time.** Declare "I am IC for this
   incident" in the incident channel and open the bridge (Slack or Teams war
   room, a Zoom, a PagerDuty incident). A single named commander ends the
   diffusion where everyone assumes someone else owns it.
2. **Set severity from impact, not cause.** Score on the blast radius the user
   feels: SEV1 for a full outage or data loss, SEV2 for a major degraded path,
   SEV3 for a contained defect. You can raise or lower it as facts arrive, but
   the first call sizes the response and who gets paged.
3. **Split the roles and delegate.** Name an operations lead who directs the
   hands-on debugging, a communications lead who owns external and stakeholder
   updates, and a scribe who timestamps every action and finding in the
   incident doc. The IC coordinates and never becomes the person typing fixes.
4. **Run a fixed comms cadence.** Post a status update on a set interval, every
   15 to 30 minutes for a SEV1, even when the update is "still investigating,
   next update at HH:MM." Push the same beat to the internal channel and the
   public status page. Silence is what turns an outage into a trust incident.
5. **Drive to mitigation before root cause.** Ask for the fastest safe way to
   stop the bleeding: roll back the deploy, flip the feature flag, fail over,
   shed load. Understanding why can wait; the customer's minutes cannot. Hold
   the room to that goal and park deep forensics for the postmortem.
6. **Make the go/no-go calls and record them.** Decide when to escalate, when
   to page a second team, when to pull in comms or legal for a data event, and
   when the incident is mitigated versus resolved. Every decision lands in the
   timeline with a timestamp so the postmortem is not reconstructed from memory.
7. **Declare resolved and hand to postmortem.** Confirm the signal is healthy,
   stand down the responders, thank them, and open the blameless postmortem
   with an owner and a due date. An incident that closes with no postmortem is
   an outage you have agreed to have again.

## Checks

- Does every person on the bridge know whether they are IC, ops, comms, or an
  observer, without asking?
- If a stakeholder joined right now, would the last status update tell them
  impact, current action, and the next update time?
- Is the mitigation being pursued the fastest safe one, or the most satisfying
  root-cause fix?
- Does the timeline let someone who was asleep reconstruct the decisions?

## Boundaries

The IC owns coordination and communication, not the technical fix or the
long-term remediation: those stay with the owning engineers and the SRE team.
The severity ladder, paging policy, and who may speak publicly are company
conventions the IC follows, not invents. When the incident is a security
breach or a legal disclosure event, the IC pulls in security and legal and
defers those calls rather than making them alone.

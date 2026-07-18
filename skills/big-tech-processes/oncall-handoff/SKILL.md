---
name: oncall-handoff
description: Hand off an on-call rotation by transferring open incidents, watch items, and the tribal context runbooks miss. Use at the end of a shift or rotation when the pager passes to the next responder and continuity of understanding matters.
---

# On-call handoff

A handoff passes the pager from the responder going off shift to the one coming
on, along with everything the incoming person needs to not start cold. It fails
when it becomes a dropped link and a "you've got it": the next engineer inherits
open incidents with no thread, misses the deploy that is about to page, and
rediscovers by outage the workaround that was never written down. The whole point
is to move understanding, not just the pager.

## Method

1. **Do it live, with overlap.** Hold a short synchronous call, ten to fifteen
   minutes, where the outgoing responder walks the incoming one through the state.
   A wall of text nobody reads before their first page is not a handoff; a
   conversation where questions get asked is.
2. **Walk every open incident.** For each one give current status, what has been
   tried, who else is involved, the next planned step, and the ticket. An incident
   handed over as "still investigating" with no linked thread is one the next
   person restarts from zero at the worst time.
3. **List the watch items.** Name what is not paging yet but might: a deploy that
   went out an hour ago, a degraded upstream dependency, a certificate near
   expiry, a batch job that occasionally wedges. The next page usually comes from
   this list, so it deserves as much care as the active incidents.
4. **Transfer the tribal context runbooks do not hold.** The alert that is flaky
   and safe to ignore, the dashboard that lies, the service owner who actually
   answers, the workaround nobody documented. This is the highest-value and most
   easily lost part of the handoff, so say it out loud and write it down.
5. **Verify access and tooling before you sign off.** Confirm the incoming
   responder can reach the pager, the dashboards, production, and the escalation
   contacts now, not when the first alert fires. A handoff to someone locked out of
   Grafana or PagerDuty is no handoff at all.
6. **Leave a written record beside the live call.** Timestamp open incidents,
   watch items, recent changes, and known-flaky alerts in the handoff doc. The
   call transfers understanding in the moment; the doc is what the responder reads
   back at 3 a.m. when the call is a blur.
7. **Confirm the pager actually moved.** Check that the rotation flipped and the
   escalation path now points at the new owner, then name who is primary, who is
   secondary, and until when. An ambiguous transfer leaves two people each
   assuming the other has it.

## Signals

- Could the incoming responder handle the next page on any watch item without
  calling you back?
- Does every open incident have a ticket and a stated next step, not just a
  status word?
- Did the pager and escalation path verifiably move, or was ownership assumed?

## Boundaries

A handoff transfers the current state; it cannot fix a broken rotation. Chronic
alert fatigue, missing runbooks, or incidents that live only in one person's head
are deeper problems for a production-readiness-review or a postmortem, not for the
shift change. Follow your team's on-call convention for cadence, tooling, and how
much overlap the schedule allows.

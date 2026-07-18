---
name: postmortem-review-board
description: Run an org-level board that grades incident postmortems against a quality bar, promotes cross-cutting fixes to owned work, and reads across incidents for trends. Use when your organization writes enough postmortems that reviewing them one at a time hides the systemic pattern.
---

# Postmortem review board

One postmortem closes one incident. A board exists to see what a single document
cannot: the third outage this quarter with the same trigger, the action items
filed and never shipped, the failure class spreading quietly between teams.
Without it, each team learns its lesson alone and the organization pays for the
same lesson again at a higher price.

## Method

1. **Gate entry on severity and impact, never on volunteering.** Every SEV1 and
   SEV2, plus any incident above a stated customer or revenue threshold, comes to
   the board. Route lower severities to team-local review so the board reads the
   incidents that carry org-wide signal instead of drowning in all of them.
2. **Grade against a written rubric before the discussion starts.** A pass needs
   a real timeline, a root cause that survives "five whys" past the first human in
   the chain, contributing factors, and action items with named owners and dates.
   "Operator error" is where the analysis quit, not a root cause. Bounce failing
   writeups instead of workshopping them live.
3. **Keep it blameless, out loud and every time.** The board judges the system
   and the writeup, never the responder. The first review that turns into a
   tribunal is the last honest postmortem you get: the next one arrives sanitized,
   and sanitized postmortems are the board's blind spot.
4. **Split team-local fixes from cross-cutting actions.** For each incident, ask
   whether the remedy protects only the team that got paged or a weakness others
   share. Promote the shared ones to tracked, owned work with an executive
   sponsor: a retry storm that sank one service will sink the next until the
   common client library changes.
5. **Age the action items and refuse to let them rot.** Report open action-item
   count and age at every session. Postmortem follow-ups are the first work
   dropped when a team gets busy, so a board that files them without tracking
   closure is theater. A recurring incident whose prior fix is still open is the
   board's sharpest indictment of itself.
6. **Read across the corpus, not just down each report.** Tag every incident by
   trigger class: deploy, config change, capacity, dependency failure, expiry.
   Each quarter, name the top classes and the teams they cluster in. That
   cross-sectional pattern is invisible in any single document and is the board's
   real output.
7. **Route the trends into planning.** Convert the recurring classes into roadmap
   input: a hardening project, a guardrail, a paved path off the sharp edge. A
   trend report that reaches no planning cycle changes nothing next quarter, and
   the board decays into a reading group.

## Signals

- Would a postmortem that blamed a person and stopped there get sent back, or
  wave through on a busy day?
- Can you state this quarter's top three trigger classes and who owns reducing each?
- Is open action-item age trending down, or does the backlog only accumulate?
- When an incident recurs, does the board notice that its prior fix never shipped?

## Boundaries

This is the org-level review of many postmortems, not the authoring of one:
writing an individual incident report belongs to your incident-response process.
The board sets a quality bar and finds patterns; it does not run the live
incident or approve releases. Match cadence and severity thresholds to your
existing incident taxonomy rather than inventing a parallel scale.

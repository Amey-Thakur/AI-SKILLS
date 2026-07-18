---
name: postmortem-review-board
description: Run an org-level board that reviews incident postmortems for quality, promotes cross-cutting fixes, and surfaces trends no single incident reveals. Use when your organization produces enough postmortems that reading them one at a time misses the systemic pattern.
---

# Postmortem review board

A single postmortem fixes one incident. A review board exists to catch what one
document cannot see: the fifth outage this quarter with the same root cause, the
action items that were filed and never done, the failure class spreading across
teams. Without the board, every team learns its own lesson in isolation and the
organization relearns the same lesson at increasing cost.

## Method

1. **Set the entry bar by severity, not by volunteering.** Every SEV1 and SEV2,
   plus any incident with customer or revenue impact above a stated threshold,
   comes to the board. Leave lower severities to team-local review so the board
   reads the incidents that carry organizational signal, not all of them.
2. **Grade each postmortem against a written rubric before discussing it.** A
   pass needs a real timeline, a root cause that survives "5 whys" past the
   first human, contributing factors, and action items with owners and dates.
   "Operator error" is not a root cause: it is where the analysis stopped.
   Send failing documents back rather than reviewing them.
3. **Keep it blameless out loud.** The board judges the writeup and the system,
   never the responder. The moment a review becomes a tribunal, the next
   postmortem gets sanitized and the board loses its only source of truth.
4. **Separate local fixes from cross-cutting actions.** For each incident, ask
   whether the fix protects only the team that had the outage or a shared
   weakness others share too. Promote the systemic ones to owned, tracked work
   with an executive sponsor: a retry storm that took down one service will take
   down the next unless the shared client library changes.
5. **Age the action items and refuse to let them rot.** Report open action-item
   count and age every session. Postmortem actions are the first work dropped
   when a team gets busy, so a board that files them without tracking closure is
   theater. A recurring incident whose prior action item is still open is the
   board's clearest indictment of itself.
6. **Read across postmortems for trends, not just down each one.** Tag incidents
   by trigger class: deploy, config change, capacity, dependency failure. Each
   quarter, name the top classes and the teams they cluster in. This pattern is
   invisible from any single document and is the board's real product.
7. **Feed the trends into planning.** Turn the recurring classes into roadmap
   input: a hardening project, a guardrail, a paved path. A trend report that
   reaches no planning cycle changes nothing next quarter.

## Signals

- Would a postmortem that blamed a person and stopped there get sent back, or
  wave through?
- Can you state this quarter's top three incident classes and who owns fixing
  each?
- Is the open action-item age trending down, or does the backlog only grow?
- When an incident recurs, does the board catch that its prior fix never shipped?

## Boundaries

This is the org-level review of many postmortems, not the writing of one: the
authoring of an individual incident report belongs to your incident-response
process. The board sets a quality bar and spots patterns; it does not run the
live incident or approve releases. Match cadence and severity thresholds to
your organization's existing incident taxonomy.

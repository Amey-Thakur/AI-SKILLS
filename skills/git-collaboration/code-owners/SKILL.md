---
name: code-owners
description: Design CODEOWNERS to route reviews and balance load without turning ownership into a gatekeeping bottleneck. Use when setting up review routing or fixing slow reviews and unclear responsibility.
---

# Code owners

A CODEOWNERS file routes review requests automatically: a change to a
path pulls in the people responsible for it. Done well it gets the
right eyes on changes fast; done badly it makes a few people a
bottleneck every PR waits on.

## Method

1. **Map ownership to teams, not individuals.** Assign paths
   to team handles (`@org/payments-team`), not personal
   accounts: individuals go on vacation, leave, and become
   single points of failure; teams distribute the load and
   survive turnover (the same reasoning as
   incident-commander-role's rotation). A CODEOWNERS file
   full of one person's name is a bus-factor-one review
   process.
2. **Scope ownership to real responsibility.** Owners are
   people who genuinely understand and are accountable for
   that code (see mentoring-engineers for growing them),
   not whoever is senior; a path with no real owner gets a
   default reviewer group, not a fictional expert. Ownership
   without knowledge is rubber-stamping with extra latency.
3. **Balance review load, watch for bottlenecks.** Monitor
   review queues: if one team owns paths touched by every
   PR (shared config, core types), they become the
   bottleneck the whole org waits on. Split ownership
   finer, grow more owners, or reconsider whether that code
   should be so central (see coupling-analysis: a
   review bottleneck often marks an architectural one).
4. **Require the right number of approvals, no more.**
   Owner approval for the code that needs domain judgment;
   do not require three teams to approve a one-line typo
   fix (see pull-request-size: friction should scale with
   risk). Over-broad ownership rules that pull five teams
   into every change train people to approve without
   reading.
5. **Distinguish ownership from gatekeeping.** CODEOWNERS
   should route and inform, mostly not block: default to
   owners-as-required-reviewers for genuinely sensitive
   paths (security, billing, public API: see
   api-change-management) and owners-as-suggested for the
   rest. A codebase where every change needs a gatekeeper's
   blessing moves at the gatekeeper's speed and breeds
   resentment (see the review-culture ethic in
   code-review-comments).
6. **Keep it current, review it periodically.** Ownership
   drifts as teams reorg and code moves; a stale CODEOWNERS
   routes PRs to people who left or teams that no longer
   own the code, silently delaying every affected review.
   Review it quarterly and update it when reorgs happen
   (see docs-maintenance's staleness discipline).

## Boundaries

- CODEOWNERS routes reviews; it does not replace the
  review itself (see code-review) or a healthy review
  culture. Automated routing to a disengaged owner is
  worse than no routing.
- Ownership as accountability is healthy; ownership as
  territory ("nobody touches my code") is toxic and
  slows the whole org: the goal is the right reviewer
  fast, not a fiefdom (see boy-scout-rule's shared-
  ownership spirit).
- Fine-grained ownership needs maintenance proportional
  to its granularity; start coarse (team-per-major-area)
  and refine where load or expertise genuinely demands.

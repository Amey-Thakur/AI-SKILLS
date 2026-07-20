---
name: product-launch
description: Launch features through tiered rollouts, a readiness checklist, coordinated comms, and a post-launch review. Use when shipping something users will notice or coordinating a cross-team release moment.
---

# Product launch

A launch is two separable things: the rollout (engineering risk
management) and the announcement (attention harvesting). Decouple
them: ship dark, ramp safely, announce when it is boringly stable.

## Method

1. **Tier the launch, size the ceremony.** Tier 3: quiet
   improvement, changelog only (see changelog-writing).
   Tier 2: notable feature, in-product announcement + docs +
   support briefing. Tier 1: strategic bet, full coordinated
   moment (PR, campaigns, sales enablement). Most launches
   are tier 2-3; treating everything as tier 1 exhausts every
   team and trains users to ignore you.
2. **Roll out behind flags, ramped, before any announcement.**
   Dark launch, internal dogfood (see dogfooding-program),
   beta cohort, percentage ramp with halt criteria (see
   canary-analysis, feature-flags-hygiene): the announcement
   date is *after* the ramp proves stable, never the day the
   code first meets production. Announcing a launch you then
   roll back converts a bug into a news story.
3. **Run the readiness checklist across functions.**
   Engineering: load tested at announcement-spike traffic
   (see load-testing), dashboards and alerts live (see
   product-metrics instrumentation), rollback rehearsed (see
   rollback-strategy). Support: briefed, macros ready, known
   limitations documented. Docs and pricing updated; legal/
   compliance cleared where applicable (see launch-review
   for the formal gate). One owner runs the list; unowned
   checklists are decoration.
4. **Write the announcement from the user's problem.** Lead
   with the outcome ("stop rebuilding reports by hand"),
   show it working, state availability and price plainly
   (see landing-page-strategy's message hierarchy); match
   channel to tier (in-product beats email for adoption of
   tier 2; see user-activation for converting attention to
   usage). Internal comms land *before* external: support
   discovering the launch from tickets is a process failure
   (see status-updates' no-surprises rule).
5. **Staff launch day like a mini-incident.** A war-room
   channel, the dashboard on screen (traffic, errors,
   activation funnel, support volume), owners named for
   decisions (ramp further, hold, roll back), and an
   end-of-day status note (see war-room-protocol scaled
   down; incident-commander-role if it goes sideways).
6. **Review at day 30 against the launch's own goals.**
   Adoption and activation vs targets (see product-metrics),
   support-ticket themes, what the ramp caught, what the
   checklist missed: fold into the next launch's checklist
   (see incident-postmortem's blameless mechanics applied
   to a happy event). Then decide the follow-through:
   iterate, expand, or admit the feature is done and move
   on (see feature-sunsetting when the numbers say so).

## Boundaries

- Marketing-driven date commitments invert the decoupling at
  real risk; when a date is immovable, scope becomes the
  variable (see mobile-release-strategy's train discipline)
  and the ramp starts earlier, not never.
- Platform launches (APIs, SDKs) add deprecation posture,
  versioning promises, and developer docs as first-class
  deliverables (see api-versioning, api-reference-docs).
- A launch cannot rescue a product discovery failure;
  attention on something users do not want just accelerates
  the learning you skipped (see mvp-scoping).

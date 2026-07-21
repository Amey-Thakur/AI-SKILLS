---
name: onboarding-ux
description: Design a first-run experience that gets users to their first success fast, teaching by doing rather than by tour. Use when designing signup, first-run, or activation flows for a product.
---

# Onboarding UX

Onboarding is the user's first minutes with a product, and it decides
whether they get to value or give up. The goal is not to explain the
product; it is to get the user to their first real success quickly, so
they experience the value rather than being told about it.

## Method

1. **Aim at the first value moment, and shorten the path to it.** Identify
   the moment a new user first gets real value (the "aha": the note taken,
   the report generated, the teammate invited; see user-activation), and
   design onboarding to reach it in as few steps as possible. Everything
   between signup and that moment is friction to minimize.
2. **Defer everything you can.** Do not front-load profile setup,
   settings, and permission requests before the user has seen value. Ask
   for what a step actually needs, when it needs it (progressive
   disclosure), not everything up front. A wall of setup before the payoff
   loses users (see user-flows, mvp-scoping).
3. **Teach by doing, not by touring.** Guided first actions and contextual
   hints (help them do the real thing) beat a carousel of feature slides
   or a modal tour the user dismisses reflexively. People learn an
   interface by using it; design the first use to be the lesson (see
   interaction-design).
4. **Use the empty state as the guide.** The first screen is empty; make
   it show what to do first, with a clear primary action and, where it
   helps, sample data or a template so the product demonstrates itself
   (see empty-and-error-states). An empty dashboard with no next step
   teaches nothing.
5. **Show progress and give early wins.** A short checklist of
   getting-started actions (with progress) gives direction and the
   satisfaction of completion; make the first action easy and rewarding so
   momentum builds. Respect skipping: let users who know what they are
   doing bypass the hand-holding.
6. **Reduce, do not add, over time.** The temptation is to bolt more
   onboarding onto every new feature until it is a gauntlet. Instead,
   design the product to be self-evident (good IA, clear affordances,
   sensible defaults; see information-architecture, usability-heuristics)
   so it needs less onboarding, and keep what remains lean.

## Boundaries

- Onboarding cannot rescue a product with unclear value or a confusing
  core; if users need a heavy tutorial to use it at all, the design is the
  problem (see usability-heuristics). Onboarding accelerates a good
  product's value, it does not manufacture one.
- Over-onboarding (forced tours, nagging tooltips, invite walls) annoys
  and can hurt activation more than help; measure it (see
  user-activation's guardrails). Attention is borrowed, not owned.
- B2B onboarding often involves multiple roles (admin sets up, team
  adopts): design each role's first experience, not one generic flow (see
  multi-tenancy, user-activation).

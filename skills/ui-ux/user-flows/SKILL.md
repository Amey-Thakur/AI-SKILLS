---
name: user-flows
description: Map and design the paths a user takes to complete a goal, minimizing steps and dead ends. Use when designing a multi-step task, checkout, signup, or any flow, or diagnosing where users drop off.
---

# User flows

A user flow is the path from a user's intent to its completion. Users do
not experience screens in isolation; they experience the journey between
them. Designing the flow (not just the screens) is what makes a task feel
easy or maddening, and where drop-off is won or lost.

## Method

1. **Start from the user's goal, and map the real path.** What is the user
   trying to accomplish, and what are all the steps (decisions, inputs,
   waits) between starting and done? Map the actual flow, including the
   branches (guest vs account, valid vs invalid input) and the error and
   recovery paths, not just the happy line.
2. **Count and cut the steps.** Every step, screen, field, and decision is
   friction and a chance to drop off. Question each: is it necessary here,
   can it be deferred, defaulted, combined, or removed? The shortest path
   that still gathers what is genuinely needed wins (see mobile-input-ux's
   field-cutting, user-activation's time-to-value).
3. **Design entry and exit for each step.** How does the user arrive at
   this step, and where can they go from it (forward, back, cancel, save
   for later)? No step should be a dead end or a trap (see
   usability-heuristics' control-and-freedom). Deep links and refreshes
   should land somewhere sensible (see frontend-routing).
4. **Handle the unhappy paths as first-class.** Invalid input, a failed
   payment, a lost connection, an abandoned-and-returned session: these
   are where flows break. Preserve the user's progress, explain what
   happened, and offer the way forward (see empty-and-error-states,
   optimistic-ui). A flow that only works when everything goes right is
   half-designed.
5. **Match effort to commitment.** Do not demand a full signup before the
   user has seen value; defer heavy asks until the user is invested (let
   them try, then ask to save; see user-activation, mvp-scoping). Front-
   loading friction kills flows before the payoff.
6. **Show progress in long flows.** Multi-step flows tell the user where
   they are and how much remains (a stepper, a progress bar), so the end
   feels reachable. Uncertainty about length causes abandonment (see
   loading-states, interaction-design).

## Boundaries

- Flows are the connective structure; individual screens still need good
  layout, interaction, and copy (see visual-hierarchy, interaction-design,
  ux-writing). A perfect flow of bad screens still fails.
- Fewer steps is usually better but not always: a deliberate confirmation
  step for an irreversible action, or a moment that builds trust before a
  payment, earns its place. Cut friction, keep the friction that protects.
- Real drop-off is found in the data (funnel analysis) and in watching
  users, not only in design review (see user-activation, usability-testing).

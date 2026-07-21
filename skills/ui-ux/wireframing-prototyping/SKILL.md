---
name: wireframing-prototyping
description: Use low- and high-fidelity wireframes and prototypes to test ideas cheaply before building. Use when exploring a design, aligning stakeholders, or validating a flow before committing engineering time.
---

# Wireframing and prototyping

Wireframes and prototypes are how you think through and test a design
before it is expensive to change. The core idea: work at the lowest
fidelity that answers the question you have, so you iterate on cheap
artifacts and only build what has earned it.

## Method

1. **Match fidelity to the question.** Testing structure and flow? A rough
   low-fidelity wireframe (boxes and labels, no color or polish) is faster
   and invites bolder feedback. Testing visual design or a real
   interaction? Higher fidelity. Do not polish pixels while the layout is
   still in question; low-fi first, detail later (see user-flows).
2. **Wireframe to decide layout and priority, not looks.** A wireframe
   settles what goes on the screen, where, and in what hierarchy, without
   the distraction of color and copy (see visual-hierarchy,
   information-architecture). Grayscale and placeholder content keep the
   conversation on structure. Resolve the big questions here.
3. **Prototype to test interaction and flow.** A clickable prototype
   (linked screens) lets people actually move through the flow and
   reveals what a static mockup cannot: is the path obvious, does the
   interaction make sense, where do they hesitate (see interaction-design,
   user-flows). You feel the friction only by moving through it.
4. **Use real content, not lorem ipsum, once fidelity rises.** Fake filler
   hides real problems: the label that is too long, the empty state, the
   name that wraps. Design with realistic content and the awkward cases
   (the long string, the zero-items view; see empty-and-error-states), or
   they surface only after build.
5. **Keep it disposable.** Wireframes and early prototypes are for
   learning and are meant to be thrown away; getting attached to one, or
   over-investing in polishing an exploration, defeats the purpose. Make
   several rough options rather than one precious one, early on.
6. **Put prototypes in front of users and stakeholders.** A prototype is
   the cheapest thing to test (see usability-testing) and the clearest way
   to align a team on what is being built before code (avoiding the
   "that's not what I meant" after launch). Feedback on a prototype costs
   nothing to act on; feedback on shipped code costs a rewrite.

## Boundaries

- Prototypes simulate; they are not the product. Interactions feel
  different at real speed with real data and edge cases, so a prototype
  that tested well still needs verification once built (see the verify
  ethic in usability-testing).
- Fidelity has a cost curve: high-fidelity prototypes approach the effort
  of building, so know when to stop prototyping and build (or build a
  thin real version instead; see mvp-scoping).
- Wireframes communicate design intent, not implementation; the
  engineering handoff (specs, tokens, states) is a separate step (see
  design-systems, empty-and-error-states).

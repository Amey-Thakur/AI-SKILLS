---
name: design-systems
description: Build and maintain a design system that keeps a product visually consistent and fast to build. Use when creating design tokens, component libraries, or UI guidelines.
---

# Design systems

A design system earns its cost when a new screen is faster to build and looks
like it belongs. It fails when it becomes a museum nobody uses or a cage
nobody can work in. Aim for the useful middle: shared decisions, room to move.

## Method

1. **Start from tokens, not components.** The primitives come first: a color
   scale, a type scale, a spacing scale, radii, shadows, motion durations.
   Everything else references these, so a change to the brand is a change in
   one place. Name tokens by role (surface, text-muted, accent), not by value
   (gray-200), so the meaning survives a repaint and themes are possible.
2. **Build components on the tokens, in layers.** Primitives (button, input,
   text) compose into patterns (form field, card) compose into layouts. A
   component that hardcodes a color or a pixel value instead of a token is a
   future inconsistency.
3. **Design the states, not just the default.** Every interactive component
   specifies hover, focus (visible, always), active, disabled, loading, and
   error. The default state is the easy 20%; the states are where consistency
   and accessibility actually live.
4. **Make the accessible path the default path.** Components ship with correct
   semantics, keyboard behavior, focus management, and contrast built in, so a
   product team gets accessibility by using the system, not by remembering to.
   An inaccessible component in a design system multiplies the failure across
   every screen.
5. **Document usage, not just appearance.** Each component says when to use it,
   when to use a different one, and the props that matter, with a live
   example. A gallery of components with no guidance produces creative misuse.
6. **Version and change with care.** The system is a dependency for every
   product using it, so treat changes like an API: additive freely, breaking
   changes with a version and a migration note. A silent restyle is a
   production incident distributed across teams.

## Judgment calls

- **Consistency versus flexibility:** enforce the decisions that carry the
  brand and the accessibility floor; leave room for product-specific layout.
  A system that forbids everything gets forked and abandoned.
- **When to add a component:** the third time a pattern is rebuilt by hand is
  the signal, not the first. Premature components ossify a shape before it is
  understood.
- **Tokens versus one-offs:** a value used in three places is a token; a value
  used once may stay local until it repeats.

## Litmus tests

- Can a new screen be built mostly from existing components, and does it look
  native without extra effort?
- Does a single token change repaint the product correctly?
- Is every component usable by keyboard and screen reader out of the box?
- Could a product team learn a component from its docs without reading its
  source?

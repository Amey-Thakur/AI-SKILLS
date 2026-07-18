---
name: layered-architecture
description: Organize a system into layers with one permitted direction of dependency and enforce that direction mechanically at the import level. Use when a codebase is sliding toward tangled cross-references and you need a rule a linter can check, not a convention people forget.
---

# Layered architecture

Layers are only useful if the arrows point one way. The moment the database
layer imports the web layer "just this once," the structure stops being a
structure and becomes decoration on a ball of mud. The discipline is not
drawing the diagram: it is refusing every dependency that runs uphill.

## Method

1. **Name the layers and fix the direction.** A common stack is presentation
   over application over domain over infrastructure, with dependencies allowed
   to point down only. Write the direction down before you write code, because
   every later argument is settled by this one sentence.
2. **Give each layer its own module namespace.** One package or directory per
   layer, so a dependency across layers is a visible import statement, not a
   buried function call. If layers share a namespace, no tool can see the
   boundary and neither can the reviewer.
3. **Invert dependencies that need to point up.** When the domain needs to save
   data, it defines a repository interface and infrastructure implements it. The
   arrow at compile time still points down even though control at runtime flows
   out. This is the one move that keeps the domain framework-free.
4. **Enforce the direction in CI, not in review.** Wire up import-linter
   (Python), ArchUnit (Java), dependency-cruiser or eslint-plugin-boundaries
   (JavaScript), or Go's internal packages. Fail the build on an upward import.
   A rule humans police is a rule that erodes on the busy week.
5. **Ban skip-layer calls too.** Presentation talking straight to
   infrastructure defeats the point as surely as an upward import. Allow each
   layer to see only the one directly beneath it unless you decide otherwise.
6. **Map data at the seams.** Convert ORM entities to domain models and domain
   models to response DTOs at the boundary, so a persistence detail cannot leak
   three layers up and pin the whole stack to your database vendor.

## Signals

- Does the import linter run in CI and fail on a violation, or is layering just
  a diagram in the wiki?
- Can you swap the web framework without touching the domain package?
- Does any file import from a layer more than one level away?

## Boundaries

For a small service the ceremony can cost more than the tangle it prevents:
reach for layers when the module count and team size make ad hoc references
unsafe. Hexagonal architecture is a stricter relative that isolates the domain
behind explicit ports: prefer it when the domain is the asset worth protecting.

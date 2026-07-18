---
name: module-boundaries
description: Split modules along axes of change so things that change together live together and dependencies point one way. Use when a codebase groups by technical layer and every feature edit spans many folders.
---

# Module boundaries

A module boundary is a bet about what changes together. Draw it well and a
feature change touches one module; draw it by technical layer and the same change
smears across controllers, services, and repositories in lockstep. The common
mistake is grouping by what code is, all the models here and all the views there,
instead of by why it changes, which splits related code and couples unrelated code.

## Method

1. **Group by reason to change, not by technical role.** Put the pricing rule,
   its data, and its tests in a `pricing` module rather than scattering them
   across a global `models/`, `services/`, and `controllers/`. Colocate what
   moves together when the business changes one thing.
2. **Run the cohesion test on each module.** Read its file list and state its
   responsibility in one sentence. If the sentence needs an "and" joining
   unrelated jobs, split it; if two modules always change as a pair, merge them.
3. **Point dependencies in one direction.** Stable general code, the domain and
   core, must not import volatile specific code like features and UI. Let
   features depend on the core so churn at the edges leaves the center untouched.
4. **Invert dependencies that cross a layer the wrong way.** When the core needs
   something a feature provides, define an interface in the core and have the
   feature implement it. The arrow flips without dragging in the coupling.
5. **Measure coupling with a dependency graph.** Run `madge`, `import-linter`, or
   `depcruise` to draw the actual imports. Heavy fan-out from one module or a
   dense clump of edges points at a boundary drawn in the wrong place.
6. **Keep each module's public surface narrow.** Export one entry point and treat
   the rest as internal, so callers cannot reach across a boundary into another
   module's guts and cement the wrong seam by depending on it.

## Signals

- A typical feature change lands inside one module, not across five layers.
- Each module's dependencies flow toward more stable code, never in a loop.
- You can name every module's single responsibility without saying "and".

## Boundaries

Boundaries are costly to move once code depends on them, so let them emerge as
duplication and change patterns reveal the real seams rather than imposing a
taxonomy up front. Framework conventions like Rails or Django may dictate layout,
and the mechanics of breaking cycles belong to the circular-dependencies skill.

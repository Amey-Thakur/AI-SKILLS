---
name: circular-dependencies
description: Find dependency cycles between modules and break them with layering, interface extraction, or dependency inversion. Use when imports form a loop that blocks compilation, isolated testing, or clear reasoning about load order.
---

# Circular dependencies

Two modules that import each other cannot be built, tested, or understood one at
a time: each needs the other to exist first. Cycles creep in when a helper reaches
back to its caller for a single convenience, and they compound until a whole
subsystem is one tangled unit. Breaking them is mechanical once you can see them,
so the first task is making the cycle visible.

## Method

1. **Detect cycles with a tool, not by eye.** Run `madge --circular src/`,
   `import-linter`, or `pycycle` in CI, and fail the build on any new cycle so
   the graph stays acyclic once you have cleaned it.
2. **Find the weakest edge in the loop.** In an A-imports-B-imports-A cycle,
   spot which direction carries the least: one module usually needs just a type
   or a single function from the other. Break the thinner edge.
3. **Extract a shared interface into a third module.** When A and B depend on
   each other for a contract, move that contract into a new module both import.
   The concrete implementations stop referencing each other directly.
4. **Invert the accidental back-reference.** If a low-level module calls up into
   a high-level one, pass the needed behavior in as a callback or injected
   dependency instead of importing upward. It depends on a parameter, not a module.
5. **Move shared code down.** When two peers both need a helper and reach through
   each other to get it, relocate that helper into a lower module both import
   cleanly. The peers stop touching each other entirely.
6. **Split the god module.** A file caught in many cycles is usually doing several
   jobs. Break it along its responsibilities so each piece sits at one level and
   imports only downward.

## Checks

- Does `madge --circular` report zero cycles, and does CI fail on a new one?
- Can you compile or import each module from the former loop entirely on its own?
- After the fix, do all edges point from more-specific toward more-stable code?

## Boundaries

Some cycles are language-visible yet harmless: a single module with mutually
recursive functions is fine, and this skill targets cross-module import loops.
Where the dependency graph itself is misdrawn, fixing individual cycles only
treats symptoms, so pair this with the module-boundaries skill.

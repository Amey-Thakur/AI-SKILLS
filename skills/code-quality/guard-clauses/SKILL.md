---
name: guard-clauses
description: Flatten nested conditionals into early returns that handle edge cases up front and keep the main path unindented. Use when logic marches rightward into deep nesting.
---

# Guard clauses

A guard clause handles a special case at the top of a function and exits at
once, so the rest of the body runs knowing the easy exits are already gone.
Without them, every precondition becomes another level of indentation, and the
real work ends up buried under a stack of `if` blocks whose braces no one can
match.

## Method

1. **Return early on every precondition failure.** Null inputs, empty
   collections, unauthorized callers, out-of-range values: check each at the top
   and `return` or `throw` immediately. Each guard you add is one nesting level
   the main logic sheds.
2. **Invert the leading `if` to un-nest the body.** Turn
   `if (valid) { ...long... }` into `if (!valid) return; ...long...`. The happy
   path drops back to the left margin, and the failure case is stated plainly
   instead of implied by a distant `else`.
3. **Cluster the exits before the main path, not woven through it.** All the
   guards sit together at the top; below them the reader knows the inputs are
   clean and can follow one straight line. Scattering guards into the middle
   forces a re-check of assumptions at each step.
4. **Drop the `else` after a return.** Once an `if` block ends in `return`, its
   `else` is redundant: remove it and let the following code run unindented.
   Chains of return-then-`else if` flatten into a clean sequence of guards.
5. **Keep each guard one concern wide.** Split
   `if (!user || !user.active || user.banned)` into three guards, each returning
   its own specific error. A merged condition saves lines but blurs which
   precondition failed and costs the caller a precise message.
6. **Stop flattening when the branches are genuinely balanced.** Guards fit
   lopsided logic: a few exits, then the real work. When two paths carry equal
   weight and both continue, a plain `if/else` is honest; forcing early returns
   there hides half the logic instead of revealing it.

## Litmus tests

- Is the function's main work at one or two levels of indentation rather than
  four?
- Does each guard return a specific reason, or do several failures share one
  vague exit?
- Reading top to bottom, are all the edge cases handled before the main path
  begins?

## Boundaries

Early returns can skip required cleanup in languages without automatic resource
management: use `defer`, `finally`, `with`, or RAII so no exit path leaks a lock
or file handle. Where teardown must run on every path, structure the guards
around it rather than jumping past it. For the branch-count view of the same
code, see cyclomatic-complexity.

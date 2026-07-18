---
name: premature-abstraction
description: Resist extracting shared code until a third real use reveals the true axis of variation. Use when tempted to add a helper, base class, config object, or generic layer on one or two examples.
---

# Premature abstraction

An abstraction is a bet that future code will share this shape. Made too
early, on one or two examples, it locks in the wrong shape and taxes every
reader who traces through the indirection to find almost nothing there.
Write the concrete thing first and let the abstraction earn its way in.

## Method

1. **Follow the rule of three.** Two call sites may duplicate; the third is
   when a shared abstraction pays. Before that you are guessing which parts
   vary. Copy the code twice, then extract from three real examples that
   show you the actual axis of variation.
2. **Inline the first implementation fully.** No helper, no strategy
   parameter, no config object until a second caller exists and disagrees
   with the first. A single-caller framework is indirection with no payoff.
3. **Wait for the variation to reveal itself.** The right parameters are the
   differences between real call sites, not the differences you imagine.
   Extract once you can see them, so the interface fits the data instead of
   your forecast.
4. **Prefer duplication to the wrong coupling.** Two copies with independent
   reasons to change should stay two copies. Merging them creates a shared
   edit point that forces unrelated features to move together, and that tax
   outlives the keystrokes it saved.
5. **Name the seam for its meaning.** When you do extract, call it
   `normalize_phone`, not `AbstractHandlerFactory`. A name that describes
   machinery hides what the code is for.
6. **Delete speculative flexibility.** Strip unused parameters, "just in
   case" hooks, and single-implementation interfaces. Obeying YAGNI now is
   cheaper than unwinding a hole three callers already depend on.

## Signals

- Does every abstraction have three real call sites, or a written reason it
  needs one today?
- Could you inline it back and leave the code clearer?
- Do its parameters map to actual differences between callers rather than
  hypothetical ones?

## Boundaries

Published library APIs and stable plugin boundaries are the exception: there
an interface with one implementation buys forward compatibility you cannot
retrofit later. Defer to a framework's expected extension points rather than
fighting them into concrete form.

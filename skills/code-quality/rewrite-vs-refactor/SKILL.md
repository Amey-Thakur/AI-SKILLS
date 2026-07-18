---
name: rewrite-vs-refactor
description: Decide whether to refactor code in place or rewrite it from scratch using risk math, not frustration. Use when a component feels beyond repair and someone proposes starting over.
---

# Rewrite vs refactor

The urge to rewrite is usually the code punishing you for not understanding
it yet. A rewrite trades a known, working system for an unknown one, and the
old system keeps shipping features while the replacement plays catch-up.
Choose with numbers, not with disgust.

## Method

1. **Start from refactor and make rewrite earn the switch.** In-place
   refactoring keeps the system green and shippable at every step. Reach for
   a rewrite only when the constraint is structural: a data model that cannot
   represent the new requirement, a framework two majors past support, or a
   runtime you can no longer hire engineers for.
2. **Do the risk math on paper.** Estimate rewrite effort, then multiply by 3
   for the requirements buried in the old code that nobody wrote down. Add the
   freeze cost: the months the old system stagnates while the team builds its
   replacement. Compare that against refactor effort plus the interest of
   living with the mess. If rewrite does not win by 2x, refactor.
3. **Inventory the hidden behavior before you commit.** Grep the old code for
   special cases: `if` branches on customer names, date cutoffs, retry counts,
   and workaround comments. Each is an undocumented requirement a rewrite must
   re-derive from scratch. A module dense with these is costly to refactor and
   lethal to rewrite blind.
4. **If rewriting, migrate with a strangler fig.** Put the new code behind the
   old interface, route one endpoint or one entity type through it at a time,
   and delete the old path only after the new one carries production traffic.
   Never run a big-bang rewrite in a long-lived branch: it drifts from the
   shipping system and the merge never lands.
5. **Dual-run to prove equivalence.** Send real traffic to both paths, compare
   outputs, and log every divergence (the GitHub Scientist pattern makes this
   cheap). Cut over only after divergences shrink to explainable rounding.
6. **Write kill criteria before the first commit.** Decide up front what
   result reverts the effort: "if migrating module one takes over 6 weeks, we
   stop and refactor instead." A rewrite with no abort condition becomes a
   sunk-cost march that no one can call off.

## Litmus tests

- Can you name the exact structural constraint refactoring cannot fix? If not,
  you want a rewrite for how the code feels, and feelings are cheaper to fix.
- Does the plan keep the old system shipping features the whole way through?
- Is there a defined checkpoint where you would cut losses and stop?

## Boundaries

This weighs one component's fate, not architecture strategy. When the question
is how services split or which boundaries to draw, defer to system design.
When the code is small enough that a rewrite fits in a day and a single
review, skip the math and just do it.

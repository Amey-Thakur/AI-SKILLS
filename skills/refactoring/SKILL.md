---
name: refactoring
description: Improve code structure in small, always-green steps without changing behavior. Use when asked to clean up, simplify, restructure, or de-duplicate working code.
---

# Refactoring

A refactor changes structure while behavior stays identical. The moment
behavior changes on purpose, it is a feature; by accident, a bug. Keep the
line sharp.

## Method

1. **Secure the net first.** Confirm the tests around the target pass and
   actually pin its behavior. If coverage is thin, write characterization
   tests *before* touching anything — capture what the code does now, even
   its oddities. An odd behavior may be load-bearing.
2. **Name the smell and the target shape.** "Three near-copies of this
   query builder → one function with two parameters." If you cannot state
   the after-state in a sentence, you are wandering, not refactoring.
3. **Move in reversible steps, green after each.** Rename; extract function;
   inline; move; then delete the old path. Each step compiles, passes, and
   could ship. Twenty two-minute steps beat one two-hour rewrite in every
   dimension that matters: reviewability, bisectability, abort-ability.
4. **Separate refactor commits from behavior commits.** A reviewer must be
   able to skim a refactor commit ("no behavior change") and scrutinize the
   small behavior commit. Mixed commits get neither reading.
5. **Follow the house style,** even where you prefer another. A codebase
   with one accent is maintainable; your improvement in a foreign accent is
   someone else's cleanup ticket.
6. **Stop at the target.** The neighboring mess you noticed goes on a list,
   not into this change. Scope creep is how refactors become rewrites and
   rewrites become incidents.

## Judgment calls

- **Duplication:** two copies are cheaper than the wrong abstraction; three
  copies with the same change-reason justify extraction. Extract for shared
  *meaning*, not shared characters.
- **Small functions:** extraction pays when the name says something the code
  cannot; a five-line function called once with a vague name is indirection,
  not clarity.
- **Dead code:** delete it, do not comment it out. Version control is the
  attic.

## Litmus tests

- Could every commit in the series ship alone?
- Did any test's *assertions* change? (Renames aside — that is the tell that
  behavior moved.)
- Is the diff smaller than the improvement it buys?

---
name: prompt-iteration
description: Improve a prompt through controlled changes measured against a fixed set of cases, rather than by rewriting until an example looks good. Use when a prompt underperforms and each edit is a guess.
---

# Prompt iteration

Prompt work degenerates into superstition without a test set: someone
changes wording, the example improves, and a regression appears
elsewhere unnoticed. Iteration means changing one thing and measuring
against fixed cases.

## Method

1. **Assemble the case set before editing.** Ten to fifty real inputs
   with expected outputs or acceptance criteria, including the failures
   that motivated the work.
2. **Change one thing per iteration.** Structure, examples, or
   constraints, so the effect is attributable (see prompt-testing).
3. **Re-run the whole set every time.** The regression on case seven is
   the reason for the set, and spot-checking misses it.
4. **Keep the failures that motivated the change.** They are the
   highest-value cases and should never leave the set.
5. **Prefer removing to adding.** Prompts accumulate instructions that
   no longer help, and deletion often improves adherence to what remains
   (see prompt-constraints).
6. **Stop at good enough.** Beyond a point, prompt changes trade one
   failure mode for another rather than improving.
7. **Record what was tried and why.** Prompt archaeology is otherwise
   impossible, and the same failed idea gets retried (see
   prompt-versioning).

## Boundaries

Iteration optimises against the case set, which risks overfitting to it,
so a held-out set matters. Model updates can invalidate tuning, making
prompts a maintenance commitment. Some failures are model limitations
that no wording fixes.

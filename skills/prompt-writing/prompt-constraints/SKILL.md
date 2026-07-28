---
name: prompt-constraints
description: Express limits on length, scope, style, and behaviour so they are followed rather than politely ignored. Use when a model consistently exceeds bounds or drifts outside the task.
---

# Prompt constraints

Constraints are the instructions models drop first, especially when
several compete. Making them followed is a matter of specificity,
placement, and reducing how many there are.

## Method

1. **Make constraints checkable.** Three bullets of at most fifteen
   words is followed; be concise is not, because the model cannot tell
   whether it complied.
2. **State the reason where it helps.** A constraint with a rationale is
   followed more consistently, since it lets the model generalise to
   cases the constraint did not anticipate.
3. **Put the most important constraint last.** Recency is the strongest
   position, and it should hold the one that matters most (see
   prompt-structure).
4. **Reduce the count.** Beyond a handful, adherence falls across all of
   them; pick the constraints that matter and drop the rest.
5. **Prefer bounds to prohibitions.** Answer in under 100 words works
   better than do not be verbose (see negative-instructions).
6. **Enforce hard limits in code.** Truncation, validation, and
   rejection belong outside the model for anything that must not be
   exceeded.
7. **Test the constraint under pressure.** Adherence falls with long
   inputs and complex tasks, so it must be tested at realistic scale
   rather than on short examples.

## Boundaries

Constraints shape output probabilistically and are never guarantees.
Over-constraining produces stilted output that satisfies every rule and
serves nobody. Conflicting constraints resolve arbitrarily, so
consistency between them is the author's job.

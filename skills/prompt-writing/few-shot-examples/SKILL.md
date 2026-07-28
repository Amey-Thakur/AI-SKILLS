---
name: few-shot-examples
description: Teach a task by showing worked examples, chosen and ordered so the model generalises the pattern rather than copying the specifics. Use when instructions alone produce inconsistent format or judgement.
---

# Few-shot examples

Examples communicate what description cannot: tone, edge handling, and
the exact shape of a good answer. They also teach whatever incidental
pattern they share, which is why example selection is the whole skill.

## Method

1. **Show the hard cases, not the easy ones.** Examples of the obvious
   waste tokens; examples of ambiguity and edge cases teach the
   judgement you actually need.
2. **Vary everything that should not be learned.** If every example has
   a short input, the model infers short inputs. Diversity prevents
   accidental pattern-matching.
3. **Include a negative or boundary case.** One example of correctly
   refusing or handling missing data teaches the limit far better than a
   sentence describing it.
4. **Keep format identical across examples.** The output shape is what
   examples teach most strongly, and inconsistency here undoes the
   benefit.
5. **Order from simple to complex.** The last example carries extra
   weight, so it should represent the typical case rather than an
   outlier.
6. **Use three to five for most tasks.** More rarely helps and consumes
   context that the actual input needs (see context-placement).
7. **Test with and without.** Modern models often need fewer examples
   than expected, and unnecessary examples cost tokens and constrain
   creativity.

## Boundaries

Examples teach pattern and format; they cannot convey knowledge the
model lacks. Poorly chosen examples actively mislead, and one wrong
example outweighs several correct ones. Examples containing real data
carry the privacy obligations of that data (see data-minimization).

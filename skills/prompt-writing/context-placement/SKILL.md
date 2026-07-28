---
name: context-placement
description: Decide where in a prompt to put documents, history, and instructions, given that models attend unevenly across a long context. Use when prompts are long and the model ignores material in the middle.
---

# Context placement

Attention across a long context is not uniform. Material at the
beginning and end is used more reliably than material in the middle,
which means placement is a real variable and not a formatting
preference.

## Method

1. **Put instructions at both ends for long prompts.** Task at the top,
   restated requirements at the bottom, with the bulk of material
   between.
2. **Place the most relevant material closest to the question.**
   Retrieval results ordered with the best last, adjacent to the
   instruction that uses them (see retrieval-reranking).
3. **Keep the total short.** Filling a large window degrades attention
   even within the limit, so relevance filtering beats inclusion (see
   context-compression).
4. **Delimit sections clearly.** Explicit boundaries let the model
   locate material rather than searching prose, and they also mark data
   as data (see prompt-structure).
5. **Put stable content first for caching.** Prefix caching rewards
   putting unchanging instructions ahead of variable input, which is a
   cost win at no quality cost (see prompt-caching).
6. **Summarise the middle when it must be long.** A brief index of what
   the long section contains helps the model use it.
7. **Test with material deliberately placed in the middle.** It is the
   position that fails, and it is invisible unless tested for.

## Boundaries

Placement effects vary by model and change between versions, so
conclusions need re-testing. Optimising placement cannot compensate for
including the wrong material. Very long contexts degrade regardless of
arrangement.

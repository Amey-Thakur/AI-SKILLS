---
name: attention-mechanism
description: Understand what attention computes and why its cost grows quadratically with sequence length, to reason about context limits and efficiency work. Use when working with transformer models or evaluating long-context claims.
---

# Attention mechanism

Attention lets every position look at every other position, weighting
them by learned relevance. That single property explains both the
capability of transformers and their central constraint: cost grows with
the square of sequence length.

## Method

1. **Understand it as weighted retrieval.** Each position forms a query,
   compares against keys from all positions, and takes a weighted sum of
   values. The weights are the attention pattern.
2. **Know why cost is quadratic.** Every position attends to every
   other, so doubling the sequence quadruples the comparisons, which is
   the hard limit long-context work fights.
3. **Recognise multiple heads as multiple relations.** Different heads
   learn different relationships, which is why interpreting a single
   head's pattern is misleading.
4. **Know that position is added, not inherent.** Attention is
   permutation invariant, so position information comes from encodings,
   and the scheme used affects extrapolation to longer sequences.
5. **Understand causal masking.** Generative models mask future
   positions so each token attends only backward, which is what makes
   left-to-right generation coherent.
6. **Treat efficient variants as approximations.** Sparse, linear, and
   windowed attention trade some capability for scale, and the trade is
   task-dependent.
7. **Remember the memory cost of caching.** Generation caches keys and
   values per position, and that cache dominates memory at long context
   (see gpu-memory-hierarchy).

## Boundaries

Attention patterns are not explanations of model reasoning, despite
being visualisable. Architectural understanding does not predict
behaviour on a specific task. Long-context capability claims need
empirical testing rather than architectural inference (see
rag-evaluation).

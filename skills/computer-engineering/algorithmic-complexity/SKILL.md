---
name: algorithmic-complexity
description: Reason about how running time and memory grow with input size, and know when the asymptotic answer is the wrong one. Use when choosing an approach, reviewing code that loops over data, or explaining why something slows at scale.
---

# Algorithmic complexity

Complexity describes growth, not speed. An algorithm with worse
asymptotics often wins on real input sizes, and one with good
asymptotics can be slow because of constants and memory behaviour.
Knowing both is what makes the analysis useful.

## Method

1. **Identify what grows.** Complexity is relative to a named input:
   number of records, size of text, number of users. Analysis without
   naming the variable is meaningless.
2. **Count the dominant operation.** The one inside the innermost loop
   or the recursive step. Everything else disappears into constants at
   scale.
3. **Watch for hidden loops.** A lookup inside a loop that is itself
   linear makes the whole thing quadratic, and library calls hide this
   routinely (see n-plus-one-queries).
4. **Analyse space alongside time.** An approach that is fast and holds
   everything in memory fails at a size the time analysis says is fine.
5. **Distinguish worst, average, and amortised.** Hash lookups are
   constant on average and linear in the worst case, and which one
   matters depends on whether an adversary chooses your input.
6. **Check the real input size before optimising.** Quadratic on twenty
   items is instant, and replacing it with a complex linear algorithm is
   a net loss (see performance-optimization).
7. **Measure to confirm.** Constants, cache behaviour, and allocation
   dominate at small sizes, so analysis predicts the shape and
   measurement gives the answer (see profiling-cpu).

## Boundaries

Complexity predicts scaling, not performance; two algorithms with the
same class can differ by an order of magnitude in practice. Real
workloads have distributions that average-case analysis may not match.
Parallelism and memory hierarchy change the picture in ways simple
counting does not capture (see cpu-architecture).

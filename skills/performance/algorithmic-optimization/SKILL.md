---
name: algorithmic-optimization
description: Replace a hot algorithm with one of better complexity, a fitter data structure, or memoized results instead of micro-tuning the slow one. Use when a profiler points at a function whose cost is inherent to its approach, not to constant-factor waste.
---

# Algorithmic optimization

When a hot function is slow because of what it does, not how it is written, no
amount of loop unrolling saves it. The win comes from a cheaper approach: a
better complexity class, a data structure that makes the operation trivial, or
caching a result you keep recomputing. These are the changes that turn seconds
into milliseconds instead of shaving percent.

## Method

1. **Confirm the hot spot with a profiler first.** Use `perf`, `py-spy`, a
   flame graph, or your language's sampler to prove this function owns the
   time. Rewriting an algorithm that costs 2% of runtime is effort spent where
   it cannot pay back.
2. **Name the current complexity and the operation that dominates.** Is it a
   nested scan that is O(n^2), a sort inside a loop, a repeated linear search,
   a recomputation of an unchanged value? Write the class down so the target is
   concrete: "O(n^2) pairwise compare, want O(n log n) or O(n)".
3. **Change the data structure before the algorithm.** Most quadratic loops die
   when a list becomes a hash set or map: repeated membership or lookup goes
   O(n) to O(1). A heap turns "scan for the min each iteration" into O(log n).
   A prefix-sum array answers range queries in O(1). The right structure often
   is the optimization.
4. **Reach for the standard better algorithm.** Sort once and two-pointer
   instead of nested compare. Binary search a sorted array instead of scanning.
   Use a sweep line or interval tree for overlap problems. These are known
   wins; do not reinvent them.
5. **Memoize pure, repeated computation.** If a function is deterministic and
   called with recurring inputs, cache by argument: `functools.lru_cache`, a
   memo table in dynamic programming, or a precomputed lookup. Confirm the
   inputs actually repeat and the function is side-effect free.
6. **Benchmark the replacement at production n.** Measure both versions on the
   real input size and shape. A better exponent can lose at small n to
   constant factors, so verify the crossover falls below your actual workload
   rather than assuming asymptotics win.

## Litmus tests

- Did a profiler, not a hunch, name this function as the bottleneck?
- Can you state the old and new complexity class in Big-O terms?
- At production n, is the replacement measurably faster, not just asymptotically?
- If you memoized, are the inputs genuinely repeated and the function pure?

## Boundaries

This covers CPU-bound in-memory work. Database access cost belongs to
sql-optimization and n-plus-one-queries; deciding whether complexity even
matters at your n is big-o-in-practice. Constant-factor tuning below the
algorithm is the last resort, not this skill's job.

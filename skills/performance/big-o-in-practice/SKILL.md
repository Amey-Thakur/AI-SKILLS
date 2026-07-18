---
name: big-o-in-practice
description: Apply complexity analysis where input size actually makes it decide performance, and ignore it where constant factors dominate. Use when choosing an algorithm or data structure and you need to know whether asymptotic cost or the real constant is what bites.
---

# Big-O in practice

Big-O predicts how cost grows, not how much cost you pay today. An O(n log n)
sort can lose to an O(n^2) one at n=20 because the constants and cache
behavior swamp the growth term. The skill is knowing which regime you are in
before you trust the exponent.

## Method

1. **Find the real n and its ceiling.** Trace where the collection comes from
   and what bounds it. n=50 tags on a product never justifies a hash index;
   n=10M rows in a nightly job does. If n is fixed and small, complexity is
   irrelevant and readability wins.
2. **Locate the loop that scales with n, and nesting inside it.** A `.includes`
   or `.find` inside a `for` over the same list is the quadratic pattern that
   hides in plain sight. Two independent loops are O(n); one inside the other
   over the same data is O(n^2).
3. **Compute the crossover, do not assume it.** Insertion sort beats quicksort
   below roughly n=10 to 20, which is why real sort libraries switch to it for
   small partitions. Benchmark the two candidates at your actual n rather than
   picking the better exponent on faith.
4. **Weigh constant factors that Big-O drops:** a linear scan over a
   contiguous array often beats a "faster" tree or linked structure because it
   is cache-friendly and branch-predictable. Memory locality is a constant the
   notation ignores and the CPU does not.
5. **Trade time for space when n is large and space allows.** A hash set turns
   repeated O(n) membership checks into O(1) at the cost of O(n) memory. State
   the memory bought and confirm it fits.
6. **Watch amortized versus worst case.** A dynamic array append is amortized
   O(1) but O(n) on the resize; a hash lookup is O(1) until collisions degrade
   it. If the worst case lands on a latency-critical path, size for it.

## Litmus tests

- Can you state n, its upper bound, and where it comes from without guessing?
- For the chosen structure, did you benchmark against the naive one at real n?
- Is the hot path quadratic in disguise: a linear search inside a loop?

## Boundaries

This decides algorithm and structure choice, not micro-tuning. Once complexity
is right, further speed comes from profiling the confirmed hot spot, which the
performance-optimization skill covers. Distributed and I/O-bound costs follow
different models than in-memory Big-O.

---
name: data-structure-selection
description: Choose the structure whose operations match how the data will actually be used, rather than defaulting to a list or a map. Use when designing anything that stores and queries data in memory.
---

# Data structure selection

Most performance problems in application code are a structure chosen for
convenience being used for a purpose it is bad at: a linear scan through
a list that should be a set, or a sort repeated on every access.

## Method

1. **List the operations and their frequencies.** Insert, lookup,
   delete, iterate in order, find minimum. The most frequent operation
   should be the cheapest one.
2. **Match membership tests to sets or maps.** Repeated containment
   checks against a list is the single most common avoidable quadratic
   pattern.
3. **Use ordered structures when order is queried.** Maintaining sorted
   order costs on insert and saves repeated sorting, which is a win only
   if you query in order.
4. **Prefer contiguous layouts for iteration.** Arrays traverse far
   faster than linked structures because of cache behaviour, whatever
   the asymptotics say (see cpu-architecture).
5. **Consider the amortised cost of growth.** Dynamic arrays reallocate,
   and preallocating when the size is known avoids repeated copying.
6. **Watch memory overhead per element.** Maps and node-based structures
   carry substantial per-entry cost that matters at scale.
7. **Reach for the specialised structure when the pattern fits.** Heaps,
   tries, ring buffers, and bloom filters each solve one problem
   decisively (see performance-optimization).

## Boundaries

Structure choice matters at scale and rarely below it, so clarity should
win for small collections. Language implementations differ in
performance characteristics for the same nominal structure. Concurrent
access changes everything and needs structures designed for it (see
concurrency-primitives).

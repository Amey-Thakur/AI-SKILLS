---
name: cpu-optimization
description: Speed up a CPU-bound hot path by fixing its algorithm and memory access first, then applying micro-optimization only where the profiler still points. Use when a function dominates CPU time and you need it faster without changing what it computes.
---

# CPU optimization

A hot path gets faster in a strict order: do less work, do it with better
memory access, then shave constant factors. Reaching for micro-optimization
first is how people spend a day on SIMD to beat an O(n^2) loop that a hash set
would have fixed in five minutes. Earn each layer by proving the one above it is
exhausted.

## Method

1. **Profile to the line, not the function.** Use a sampling profiler with call
   attribution: `perf record`, `py-spy`, `pprof`, or a flame graph. Confirm the
   suspect owns a real share of wall time, and find the exact inner loop, before
   changing anything.
2. **Exhaust the algorithm first.** Replace the quadratic scan, the sort inside
   the loop, the recomputation of an unchanged value. A better complexity class
   or a fitter data structure dwarfs any constant-factor trick; that swap is
   algorithmic-optimization's job and it comes before everything below.
3. **Make memory access sequential and cache-friendly.** A linear walk over a
   contiguous array beats pointer-chasing a linked structure at equal Big-O,
   because it hits cache and the hardware prefetcher. Lay data out to be scanned
   in order, and batch work over arrays rather than one scattered object at a
   time.
4. **Hoist invariants and kill redundant work in the loop.** Move constant
   computations, allocations, and bounds lookups out of the body. Cache a
   repeated property access in a local. Avoid per-iteration allocation that
   quietly invokes the allocator and collector on the hot path.
5. **Only now micro-optimize, guided by the profile.** Make the common case
   straight-line to cut branch misprediction, replace a division by a shift or
   multiply, let the compiler vectorize a tight numeric loop or drop to explicit
   SIMD where it pays. Each such change earns its place against a benchmark.
6. **Benchmark on production-shaped input after each step.** Measure with a
   stable harness (`hyperfine`, `perf stat`, a language microbench) at realistic
   size and distribution. Keep the change only if the number moved past noise.

## Litmus tests

- Did a profiler name this line, or are you optimizing on suspicion?
- Is the algorithm settled before any constant-factor work started?
- Does the data get walked in order rather than chased through pointers?
- Did each micro-optimization show a measurable win on real input, not just in
  theory?

## Boundaries

This is single-thread, CPU-bound work. Swapping the algorithm outright is
algorithmic-optimization; spreading work across cores or processes is
concurrency-tuning. Memory footprint, even when it drives the cache misses, is
memory-optimization's concern.

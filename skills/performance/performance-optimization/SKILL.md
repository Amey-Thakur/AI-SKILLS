---
name: performance-optimization
description: Make code measurably faster by profiling first and fixing the actual bottleneck. Use when something is slow, uses too much memory, or needs to handle more load.
---

# Performance optimization

The rule that outranks every technique: measure, change one thing, measure
again. Optimization without a profile is guessing with extra steps, and the
guess is usually wrong.

## Method

1. **Define fast enough before starting.** A target with units: "page loads
   under 800 ms on the median device", "the import handles 100k rows in
   under a minute". Without a target, optimization never ends and every
   trade-off is unjustifiable.
2. **Measure the real workload.** Profile the actual slow case with
   realistic data volume, not a toy benchmark. Capture where time or memory
   actually goes; the bottleneck is nearly always one or two spots, and
   nearly never where intuition points.
3. **Fix in order of leverage:**
   - Do less work: cache repeated computation, skip work whose result is
     unused, exit early, paginate instead of loading everything.
   - Do work fewer times: hoist the query out of the loop (the N+1 pattern
     hides everywhere), batch requests, debounce repeated triggers.
   - Do work with the right complexity: the list scan inside a loop is
     quadratic; a set or map makes it linear. Algorithmic wins dwarf
     micro-tuning.
   - Do work at a better time: precompute, defer off the hot path, move it
     to the background, stream instead of buffering.
   - Only then micro-optimize, and only with the profiler confirming the
     hot spot.
4. **Verify against the target with the same measurement,** then check what
   the change cost: memory for speed, freshness for caching, complexity for
   everything. State the trade honestly.
5. **Guard the win.** A performance fix without a regression check (a
   benchmark, a budget in CI, an alert) is a temporary loan.

## Rules

- Caching gets an invalidation story before it ships, or it is a
  correctness bug with good latency.
- Never trade correctness for speed silently; if a fast path returns
  slightly different results, that is a decision for the requester.
- Readable-but-fast beats clever-but-fragile; note when the optimized
  version costs clarity and quarantine the cleverness behind a well-named
  function.
- Report numbers, not adjectives: before, after, workload, machine.

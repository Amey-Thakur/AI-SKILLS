---
name: heisenbugs
description: Catch timing-dependent bugs that vanish under observation by amplifying the race and moving logging off the critical path. Use when a fault appears intermittently and disappears the moment you add a print or attach a debugger.
---

# Heisenbugs

A heisenbug changes behavior the instant you try to watch it: the print that
would reveal it also delays the thread just enough to hide the race. These
faults are timing-dependent, and the naive tools perturb the very timing that
causes them. The move is to stop fighting the clock and start bending it: make
the race wider and your observation lighter.

## Method

1. **Confirm it is timing, not input.** Run the identical input a hundred times
   in a loop. Failing some fraction of runs with the same input points to a race
   or ordering bug, not a data bug. Record the failure rate as your baseline.
2. **Amplify the race instead of shrinking it.** Inject small `sleep` or yield
   calls inside the suspect window, or run under heavy thread count and CPU
   contention. Widening the gap turns a one-in-a-thousand fault into one you can
   trigger on demand.
3. **Displace logging off the hot path.** Do not print inside the critical
   section: append timestamped records to an in-memory ring buffer and dump it
   after the failure. Observation that hits disk or console rewrites the timing
   you are trying to measure.
4. **Timestamp with a monotonic clock and thread id.** Log `perf_counter_ns`
   and the thread or task id per event, then sort after the run. The
   interleaving you reconstruct, not the source order, shows who raced whom.
5. **Force the losing schedule deterministically.** Once you suspect an
   ordering, pin it with a latch, a barrier, or an injected pause that makes the
   bad interleaving happen every time. A race you can schedule is a race you can
   fix and regression-test.
6. **Reach for a race detector.** Run ThreadSanitizer (`-fsanitize=thread`),
   Go's `-race`, or Helgrind. They flag unsynchronized shared access directly,
   without relying on the timing lottery to expose it.
7. **Prove the fix under amplification.** Keep the sleeps and contention from
   step two, then run thousands of iterations. A single green run means nothing
   here: only sustained passing under stress counts as fixed.

## Signals

- Does the same input fail intermittently, ruling out a data cause?
- Did added contention raise the failure rate, confirming a timing window?
- Does the fix survive thousands of amplified runs, not one clean pass?

## Boundaries

Amplification and scheduling stress live threads: bugs rooted in memory
corruption or flaky hardware need different tools. Once you can trigger the race
on demand, hand reduction to reproduction-first and isolation to
binary-search-debugging.

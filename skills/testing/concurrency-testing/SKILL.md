---
name: concurrency-testing
description: Force the thread interleavings that expose races by using barriers, stress loops, and linearizability checks instead of hoping the scheduler hits them. Use when testing locks, shared state, or lock-free code where a bug appears once in a thousand runs.
---

# Concurrency testing

A race condition is a bug a normal test run almost never triggers, because
the scheduler rarely lands two threads in the critical section at the same
instant. Waiting for it to happen by luck means it happens in production
instead. Concurrency testing manufactures the bad interleaving on purpose,
then asserts an invariant that a race would violate.

## Method

1. **Line threads up with a barrier.** Use `threading.Barrier`, a
   `CountDownLatch`, or a `CyclicBarrier` so every worker blocks until all are
   ready, then releases at once. This concentrates them on the critical section
   instead of trickling through it one at a time.
2. **Stress with many threads and iterations, assert an invariant.** Run 16
   threads incrementing a shared counter a million times and assert the total
   equals the expected sum. A short total means a lost update, which means a
   missing lock. Keep the assertion on final state, never on timing.
3. **Turn on the race detector.** Run under `go test -race`, ThreadSanitizer
   (`-fsanitize=thread`), or the JVM's equivalents. These flag unsynchronized
   access on paths your assertions never even reach, and they belong in the CI
   run, not only on a laptop.
4. **Use a deterministic scheduler for the hard cases.** Tools that explore
   interleavings systematically, loom for Rust, jcstress for the JVM, `rr
   chaos` for native code, turn "fails one run in ten thousand" into a
   repeatable failure. Prefer these over sleep-based ordering hacks.
5. **Check linearizability, not just absence of crashes.** Record the
   concurrent history of operations and verify it against a sequential
   specification with Porcupine or Knossos. A structure that never crashes can
   still return a value no legal ordering allows.
6. **Detect deadlock with a timeout, not a hang.** Wrap the run in a hard
   timeout, fail if it expires, and dump every thread's stack. A test that
   hangs forever tells CI nothing; one that times out and prints stacks names
   the cycle.

## Signals

- Does the test fail reliably on a version with the lock removed?
- Does it run under a race detector in CI, not only on a developer's machine?
- On failure, does it report a violated invariant or a thread dump, not just a
  bare timeout?

## Boundaries

This forces and detects races in code under test. Root-causing a specific
deadlock once found is deadlock-analysis, and diagnosing a test whose own setup
races is flaky-test-diagnosis. Some interleavings need a model checker like
TLA+ beyond what a stress test reaches: reach for one when the state space
demands it.

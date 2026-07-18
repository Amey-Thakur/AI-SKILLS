---
name: race-conditions
description: Diagnose data races by reasoning about happens-before order, running sanitizers, and stressing the timing until the bug shows. Use when a bug appears only under load, only sometimes, or vanishes when you add a print statement.
---

# Race conditions

A data race is two threads touching the same memory with no ordering between
them and at least one writing. The symptom is nondeterminism: it passes a
thousand times, then corrupts state once. It hides because a debugger, a log
line, or a single-core test all perturb the timing that triggers it. You
cannot patch what you cannot see, so first make it reproducible.

## Method

1. **Name the shared mutable state and the unsynchronized access.** A race
   needs three things: shared data, concurrent access, and no
   happens-before edge between the accesses. List every thread that reads or
   writes the suspect variable and which lock, if any, each holds. A field
   written under a lock but read without one is a race even though a lock
   exists.
2. **Run a sanitizer instead of guessing.** ThreadSanitizer (`-fsanitize=
   thread` in Clang/GCC, `go test -race`, `-race` in Rust nightly) reports
   the two conflicting accesses with both stacks and the missing
   synchronization. Java has the Java Concurrency Stress tests (`jcstress`);
   .NET has the concurrency analyzers. This finds races that never crashed
   in your runs.
3. **Reason about happens-before, not about "unlikely".** Two accesses are
   safe only if an ordering edge connects them: a lock released then
   acquired, a thread start or join, a channel send then receive, an atomic
   with acquire/release. If you cannot draw that edge, the timing that breaks
   it will eventually happen. "The window is tiny" is not synchronization.
4. **Stress the timing to force the failure on demand.** Wrap the suspect
   operation in a loop of thousands of iterations across more threads than
   cores, add randomized `sched_yield`/`Thread.sleep(0)` at the read-modify-
   write seam, and pin to fewer cores to widen the window. A test that fails
   1 in 10 now instead of 1 in a million is a test you can debug.
5. **Fix by establishing ordering, not by narrowing the window.** Put every
   access to the shared state under the same lock, replace a read-modify-
   write with an atomic compare-and-swap, make the data immutable after
   publication, or hand ownership to one thread. Adding a sleep or a second
   check narrows the race, it does not close it.
6. **Re-run the stress loop and the sanitizer clean.** The stress harness
   from step 4 must survive a long run, and the sanitizer must report zero
   races. A green sanitizer with a still-flaky stress test means a second
   race or a higher-level atomicity bug: repeat from step 1.

## Signals

- Does the failure rate rise with more threads and fall with fewer cores?
- Can you draw a happens-before edge for every access to the shared field?
- Does ThreadSanitizer report zero races after the fix, not just fewer?

## Boundaries

Sanitizers catch data races on memory, not higher-level atomicity or logic
races (check-then-act on a database row, a TOCTOU on the filesystem); those
need transactions or locks at the resource, and the deadlock-analysis skill
covers the locks you add here overreaching into mutual blocking.

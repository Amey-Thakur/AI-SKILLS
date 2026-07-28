---
name: concurrency-primitives
description: Use locks, atomics, channels, and barriers correctly, and know which class of bug each prevents. Use when writing code that shares state between threads.
---

# Concurrency primitives

Shared mutable state without synchronisation produces bugs that appear
under load, vanish under a debugger, and cannot be reproduced. The
primitives are few and the discipline of using them consistently is the
whole difficulty.

## Method

1. **Prefer not sharing.** Immutable data, message passing, and
   per-thread state eliminate whole classes of bug rather than managing
   them (see process-and-threads).
2. **Protect invariants, not variables.** A lock guards a set of state
   that must stay consistent together; locking each field separately
   protects nothing meaningful.
3. **Establish a lock ordering and keep it.** Deadlock comes from two
   threads acquiring the same locks in different orders, and a global
   ordering rule prevents it entirely.
4. **Hold locks briefly and never across input or output.** A lock held
   during a network call serialises the whole system on that call's
   latency.
5. **Use atomics for single values only.** They are cheap and correct
   for counters and flags, and they do not compose into multi-variable
   invariants.
6. **Prefer channels and queues for handoff.** Transferring ownership is
   easier to reason about than shared access, and it makes the
   concurrency visible in the design.
7. **Test concurrency deliberately.** Race detectors, stress under
   contention, and deterministic interleaving tests, because normal
   tests pass on broken concurrent code (see concurrency-testing).

## Boundaries

Correct primitives do not guarantee correct design; a race-free program
can still have a logical race in its business rules. Lock-free
programming is subtle enough that library implementations should be
preferred. Memory models differ between languages and hardware in ways
that matter for low-level code.

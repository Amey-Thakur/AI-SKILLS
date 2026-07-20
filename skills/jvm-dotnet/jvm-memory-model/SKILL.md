---
name: jvm-memory-model
description: Apply happens-before reasoning, volatile, and safe publication to write correct concurrent Java/Kotlin. Use when writing shared-state JVM code or diagnosing visibility and reordering bugs.
---

# JVM memory model

Without synchronization, threads may see each other's writes late,
reordered, or never. The JMM's contract is happens-before: a read is
guaranteed to see a write only when a happens-before chain connects
them. Every concurrent bug of the "impossible state" kind is a missing
link in that chain.

## Method

1. **Reason in happens-before edges, not intuition.** The edges that
   matter: monitor unlock then lock (synchronized), volatile write
   then read, thread start and join, executor submit then run, and
   everything a `java.util.concurrent` structure documents. If two
   threads touch a field and no edge connects them, the code is
   broken even if it passes every test today.
2. **Use volatile for flags, not for compound state.** `volatile`
   gives visibility and ordering for single reads/writes: perfect
   for shutdown flags and published references. It does not make
   check-then-act or `x++` atomic; those need `AtomicLong`,
   `compareAndSet` loops, or a lock (see race-conditions).
3. **Publish objects safely or see them half-built.** An object
   handed to another thread via a plain field can appear with
   default-valued fields. Safe publication routes: assign to a
   volatile/final field, hand through a concurrent collection or
   queue, or create before `Thread.start`. `final` fields get freeze
   semantics: immutable objects (all fields final, no this-escape in
   the constructor) are safely publishable by any route, which is
   why immutability is the JMM cheat code (see
   immutability-defaults).
4. **Prefer the built structures to hand-rolled synchronization.**
   `ConcurrentHashMap` (with `compute` for atomic read-modify-write),
   `BlockingQueue` handoffs, `CompletableFuture` chains, and executor
   pipelines encode the edges for you. Double-checked locking and
   clever lock-free fields are where JMM bugs breed; write them only
   with a documented happens-before argument (the unsafe-code-review
   ethic, applied to concurrency).
5. **Bound synchronized scope, keep it consistent.** Guard each piece
   of state by exactly one lock, documented on the field
   (`@GuardedBy`-style); small critical sections, never I/O inside
   (see deadlock-analysis for ordering, concurrency-tuning for
   contention). Mixed access (some reads locked, some not) is a
   visibility bug that profilers will never show you.
6. **Test with race-hunting tools, not sleeps.** jcstress for
   memory-model behavior of small primitives; stress tests with many
   threads and iterations under load for structures (see
   concurrency-testing). Sleep-based tests prove nothing about
   ordering; the JMM permits the interleaving your machine has not
   shown you yet.

## Boundaries

- Kotlin coroutines and virtual threads change the scheduling story,
  not the memory model; shared mutable state between coroutines on
  different threads needs the same edges.
- `Thread.stop`, benign-race folklore ("it's just a cache"), and
  piggybacking on unrelated volatiles are unmaintainable even when
  currently correct; reviewers reject them on principle.
- On-heap tuning and GC behavior are separate concerns (see
  jvm-gc-selection); the JMM governs correctness, not performance.

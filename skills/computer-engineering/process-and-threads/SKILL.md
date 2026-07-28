---
name: process-and-threads
description: Choose between processes, threads, and asynchronous concurrency based on isolation, memory sharing, and failure behaviour. Use when deciding how to run work concurrently.
---

# Processes and threads

The three models differ in what they share and what happens when one
part fails. Processes isolate memory and survive each other's crashes;
threads share everything including corruption; async concurrency shares
a thread and cannot use more than one core alone.

## Method

1. **Use processes for isolation and fault tolerance.** A crash kills
   one process rather than the whole application, which is why
   supervisors and workers are structured this way.
2. **Use threads for shared memory and parallel computation.** Cheaper
   to create and communicate, at the cost that any shared state needs
   synchronisation (see concurrency-primitives).
3. **Use async for input and output bound work.** Thousands of waiting
   operations on one thread, which is the right model for network
   services and the wrong one for computation (see async-io-patterns).
4. **Do not block the async loop.** A single CPU-bound call stalls every
   other task on that loop, which is the classic async failure.
5. **Match parallelism to cores for computation.** More threads than
   cores adds context switching without throughput, and the useful
   number is bounded by hardware.
6. **Design communication explicitly.** Message passing between
   processes and queues between threads are easier to reason about than
   shared mutable state.
7. **Plan the failure path.** What happens when a worker dies mid-task,
   and whether the work is lost, retried, or duplicated (see
   idempotency).

## Boundaries

Language runtimes constrain these choices, with global interpreter locks
and green threads changing what parallelism is achievable. Shared memory
between processes is possible and reintroduces the synchronisation
problem. More concurrency is not more throughput past the system's
bottleneck (see capacity-planning).

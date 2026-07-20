---
name: python-concurrency
description: Choose threads, processes, or asyncio from workload shape, and use concurrent.futures without deadlocks. Use when parallelizing Python work or debugging concurrency that is slower than sequential.
---

# Python concurrency

One decision drives everything: is the work waiting (I/O) or computing
(CPU)? Waiting scales with threads or asyncio; computing needs processes,
because the GIL serializes Python bytecode in one process.

## Method

1. **Classify the workload.** I/O-bound with few (< ~100) concurrent
   operations: threads. I/O-bound with hundreds-plus concurrent operations:
   asyncio. CPU-bound: processes, or a C-backed library that releases the
   GIL (numpy does; your pure-Python loop does not). Mixed: processes for
   the CPU stages, threads/async inside each for the I/O.
2. **Reach for concurrent.futures first.**
   `ThreadPoolExecutor` / `ProcessPoolExecutor` with `executor.map` or
   `as_completed` covers most fan-out. It beats raw `threading.Thread`
   (join bookkeeping, no results) and raw `multiprocessing` (lifecycle
   traps) for ordinary parallel work.
3. **Size pools from the resource.** Threads: bounded by what the remote
   ends tolerate, not CPU; 8-32 is common. Processes: `os.cpu_count()` or
   slightly under. Oversized process pools thrash memory since each worker
   is a full interpreter.
4. **Mind pickling at the process boundary.** Arguments and returns must
   pickle: no lambdas, no open sockets, no bound methods of unpicklable
   objects. Chunk small tasks (`map(..., chunksize=...)`) or IPC overhead
   eats the speedup.
5. **Share nothing; communicate results.** Between threads, guard any
   shared mutable state with one lock or hand items over a
   `queue.Queue`. Between processes, return values and let the parent
   aggregate. Two locks acquired in different orders is a deadlock you
   will meet in production, not in tests.
6. **Shut down deterministically.** Context-manage executors; on 3.9+ use
   `shutdown(cancel_futures=True)` to abandon queued work on error. A
   non-daemon thread blocked on a queue keeps the process alive forever.

## Boundaries

- Threads give zero speedup for pure-Python CPU work under the GIL; a
  free-threaded (no-GIL) interpreter changes this but is not the default.
- Do not mix fork-based multiprocessing with threads already running;
  forked locks inherit held state and hang. Use the spawn start method.
- For distributed scale (many machines) this skill stops; that is a job
  queue or dataflow engine, not stdlib concurrency.

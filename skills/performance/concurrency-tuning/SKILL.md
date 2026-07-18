---
name: concurrency-tuning
description: Size worker pools, queue depths, and batch widths against the real bottleneck so parallelism adds throughput instead of contention. Use when a parallel job stops scaling, saturates a resource, or spends more time coordinating than working.
---

# Concurrency tuning

Adding workers helps only until some shared resource saturates: a CPU core, a
connection pool, a disk head, a lock. Past that point every extra worker adds
context switches and contention while throughput flattens or drops. Tuning
means finding that knee and parking just short of it.

## Method

1. **Classify the work first.** CPU-bound work scales to roughly the core
   count: set the pool near `nproc` (or `os.cpu_count()`), not higher. IO-bound
   work waits on the network or disk, so it wants far more concurrency than
   cores, bounded by the downstream limit instead.
2. **Find the binding resource before touching worker count.** Run the job and
   watch `htop`, `iostat -x 1`, and the database's active-connection count at
   once. The resource pegged at 100 percent is your ceiling; raising workers
   past it only lengthens queues.
3. **Bound queue depth on purpose.** An unbounded queue turns a slow consumer
   into an out-of-memory crash. Cap it (a `Semaphore`, a fixed `maxsize`, a
   channel buffer) so producers block and apply backpressure rather than
   buffering gigabytes of pending work.
4. **Respect Amdahl's law.** If 20 percent of the wall time is serial (setup,
   a global lock, a final merge), maximum speedup is 5x no matter how many
   workers you add. Measure the serial fraction and attack it before buying
   more parallelism that cannot pay off.
5. **Match pool size to the scarcest downstream limit.** Forty workers hitting
   a database capped at 20 connections means 20 threads block on the pool. Set
   worker count at or below the connection ceiling, or the extra threads are
   pure overhead.
6. **Sweep, do not guess.** Run the job at 2, 4, 8, 16, 32 workers and plot
   throughput. Pick the point where the curve flattens; the setting past the
   knee costs memory and tail latency for no gain.

## Signals

- Does throughput actually rise between your current setting and the next step
  up, or has the curve already gone flat?
- Is exactly one resource pegged at 100 percent, confirming the real ceiling?
- Is every queue in the pipeline bounded, so a stall blocks rather than
  balloons memory?
- Does the measured speedup track the serial fraction Amdahl predicts?

## Boundaries

This skill sizes pools and queues for throughput. Correctly sharing mutable
state between those workers is a separate concern: race conditions, lock
ordering, and atomicity belong to concurrency-safety review. Distributing work
across machines rather than threads is a scheduling and partitioning problem,
not a pool-tuning one.

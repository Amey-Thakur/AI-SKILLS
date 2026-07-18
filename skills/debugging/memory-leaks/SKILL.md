---
name: memory-leaks
description: Find the object that never gets freed by comparing heap snapshots and following retention paths. Use when a process grows in memory over time, gets OOM-killed, or slows under a garbage collector that keeps working harder.
---

# Memory leaks

A leak is not memory that is high, it is memory that only goes up. Steady
high usage is a capacity question. A slope that never returns to baseline
after load stops is a reference someone forgot to drop, and guessing which
one wastes hours. Measure the growth, then let the heap name the culprit.

## Method

1. **Confirm it is a leak, not a plateau.** Plot resident memory (RSS) over
   a load cycle with `ps`, `/proc/<pid>/status`, or your platform metrics.
   A leak keeps climbing after the workload ends and never recovers across
   several GC cycles. A cache filling to its cap and holding is not a leak.
2. **Capture two heap snapshots under identical load.** Take one after
   warmup, run a fixed number of operations, take a second. In Node use
   `--inspect` and Chrome DevTools or `v8.writeHeapSnapshot()`; in Python
   use `tracemalloc.take_snapshot()`; on the JVM use `jmap -dump:live`.
   The `live` or comparison mode matters: you want survivors, not garbage.
3. **Diff the snapshots, sort by retained size delta.** DevTools comparison
   view, `tracemalloc.compare_to(old, 'lineno')`, or Eclipse MAT on a JVM
   dump. The type whose instance count grows by roughly your operation count
   is the leak. Ten thousand `Listener` objects after ten thousand requests
   is the answer pointing at itself.
4. **Follow the retention path to a GC root.** Right-click the leaked object
   and read "Path to GC Roots" (MAT) or the retainers tree (DevTools). The
   path ends at whatever holds the reference: a module-level list, an event
   emitter's handler array, a closure captured in a cache, a static map.
   That holder is the bug, not the leaked object.
5. **Cut the strongest reference, not every reference.** Remove the listener
   on teardown, bound the cache with an LRU or size cap, use `WeakMap`/
   `WeakReference` for incidental associations, or clear the collection when
   the owning scope ends. Fix the one edge on the retention path.
6. **Re-run the two-snapshot cycle to prove the slope is flat.** Same load,
   same operation count. Retained delta near zero means fixed. A smaller but
   nonzero slope means a second leak: repeat from step 3.

## Signals

- After N operations, does exactly one type grow by about N instances?
- Does RSS return to its warmup baseline after load stops and a forced GC?
- Does every leaked instance trace to the same holder on the retention path?

## Boundaries

Native allocations (C extensions, off-heap buffers, memory-mapped files) do
not show in a managed-heap snapshot; reach for Valgrind, ASan, or jemalloc
profiling there. Fragmentation and allocator overhead can raise RSS without
any leak, so trust the object-count trend over the raw RSS number.

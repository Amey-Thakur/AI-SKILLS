---
name: profiling-memory
description: Attribute memory growth and allocation churn to the exact call sites that produce it using an allocation profiler. Use when a process grows without bound, spends too much time in garbage collection, or allocates far more than its working set explains.
---

# Profiling memory

Memory problems come in two flavors that look identical from the outside: you
keep objects you should have dropped, or you allocate and free at a furious
rate that the collector cannot keep up with. Total usage tells you something
is wrong; only an allocation profile tells you which line to change.

## Method

1. **Decide first: live growth or allocation rate.** A heap that climbs and
   never falls is retention. A flat heap with high garbage-collection CPU is
   churn: short-lived objects born and killed in a loop. Watch RSS over time
   and the GC pause log to tell them apart before choosing a tool.
2. **For retention, take two heap snapshots and diff them.** Capture one
   after warmup and one after the leak has grown: `jmap -dump` then Eclipse
   MAT for the JVM, `tracemalloc.take_snapshot().compare_to(...)` in Python,
   Chrome DevTools heap snapshots for Node. The diff names the object type and
   the retaining path that is holding it alive.
3. **For churn, run an allocation profiler that keeps stacks.** `memray run
   app.py` for Python, `async-profiler -e alloc` for the JVM, `heaptrack
   ./app` for native code. These sample allocations with the call stack, so
   the flame graph shows which call site allocated the bytes, not just how
   many.
4. **Rank by allocation count, not only by size.** A million tiny objects
   costs more in GC pressure than one large buffer of equal bytes. Sort the
   profile by number of allocations to find the loop creating temporaries:
   boxed integers, intermediate lists, format strings, defensive copies.
5. **Follow the dominator tree to the real owner.** In a snapshot, the object
   at the top of memory is often innocent; the dominator, the single node
   whose removal frees the whole subtree, is the cache, listener list, or
   static map that never releases. Break that one reference and the subtree
   collapses.
6. **Fix the site, then confirm the curve flattens.** Pool the buffer, reuse
   the object, drop the stale reference, or bound the cache. Rerun the same
   workload and watch RSS plateau or GC time fall; if the curve still climbs,
   the diff pointed at a symptom and a second retainer remains.

## Signals

- Can you name the type and the call site responsible for the most bytes?
- Does the retaining path lead to something you can legitimately release?
- After the fix, does RSS reach a steady state under the same load?

## Boundaries

Profilers attribute managed and instrumented allocations; memory lost by a C
extension or a raw `mmap` outside the runtime stays invisible, and native
leak detection (Valgrind, ASan, LeakSanitizer) covers that ground. This skill
locates allocation; whether an object should live that long is design.

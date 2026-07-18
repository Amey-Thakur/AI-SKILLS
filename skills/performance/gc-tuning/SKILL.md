---
name: gc-tuning
description: Cut garbage-collection pauses and overhead by lowering allocation rate, sizing the heap, and reading pause logs before touching a flag. Use when a managed-runtime service shows latency spikes, high CPU in GC, or out-of-memory errors under load.
---

# GC tuning

A garbage collector trades throughput and pause time against heap size, and it
does that automatically until your allocation pattern fights it. Most "GC
problems" are allocation problems: the collector runs often because the code
produces garbage fast. Read the logs before reaching for a flag, because the
wrong flag hides the symptom and moves the pain.

## Method

1. **Turn on GC logging and read it first.** Start with data, not tuning:
   `-Xlog:gc*` on the JVM, `GODEBUG=gctrace=1` for Go, `gc.set_debug` or
   `tracemalloc` in Python. Look for pause durations, collection frequency, and
   how much the heap recovers each cycle before you change anything.
2. **Attack allocation rate before heap size.** A pause every second usually
   means the code allocates too fast, not that the heap is too small. Find the
   hot allocation with an allocation profiler (async-profiler in alloc mode,
   `pprof` heap profile) and cut it: reuse buffers, avoid boxing, stream
   instead of building giant intermediate lists.
3. **Size the heap to the live set, with headroom.** Watch the heap size right
   after a full collection: that is your live data. Set max heap (`-Xmx`) to
   roughly two to three times that so young collections stay cheap, and keep it
   under available RAM so the OS never swaps the heap.
4. **Separate the two pause causes.** Frequent short pauses point at a small or
   busy young generation; rare long pauses point at full/old collections or a
   growing live set that signals a leak. The fix differs, so name which one the
   log shows before acting.
5. **Match the collector to the goal.** Pick a low-pause collector (G1, ZGC,
   Shenandoah) when tail latency matters; a throughput collector when batch
   completion time matters. Change one collector or one flag at a time and
   re-measure, never a bundle.
6. **Rule out the leak.** If the live set climbs across full collections and
   never drops, no flag will save you: that is a leak. Capture a heap dump and
   find the retained root before you keep enlarging the heap.

## Checks

- Did you read a GC log showing pause times and frequency before changing a
  flag?
- Is the dominant lever allocation rate, confirmed by an allocation profile,
  rather than a guessed heap number?
- Does the live set stabilize after full collections, ruling out a leak?
- Did each flag change move a specific metric you were already measuring?

## Boundaries

This skill reduces collector pressure in a managed runtime. A steadily growing
live set is a memory leak, which is a debugging task with its own method, not a
tuning one. Runtimes with manual memory management have no collector to tune;
their allocation cost is an allocator and layout concern instead.

---
name: memory-optimization
description: Cut a program's memory footprint by fixing data layout, reusing allocations, and streaming input instead of buffering it whole. Use when a process is killed by the OOM killer, garbage collection dominates the profile, or heap growth tracks input size.
---

# Memory optimization

Memory is spent in three ways a CPU profile hides: how each object is laid out,
how many you allocate, and how much you hold at once. A program can be fast and
still get OOM-killed because it buffers a whole file it could have streamed. Cut
footprint by attacking layout, allocation rate, and retention, in that order.

## Method

1. **Measure the heap before touching layout.** Get a real allocation profile:
   `pprof` for Go, `tracemalloc` or `memory_profiler` for Python, a heap
   snapshot in Chrome DevTools, `jmap`/`jcmd` for the JVM. Find which type owns
   the most live bytes and which call site allocates most. Optimize the top one,
   not a guess.
2. **Shrink the hot object's layout.** Reorder struct fields so same-size
   members sit together and padding collapses; a naive Go or C struct can waste
   near a third to alignment. Use a narrower type where the range allows
   (`int32` over `int64`), and in Python give hot classes `__slots__` to drop
   the per-instance `__dict__`.
3. **Store many-of-a-thing column-wise.** A million small objects each carry
   header and pointer overhead. A struct-of-arrays layout (parallel typed
   arrays, a NumPy array, an Arrow column) cuts per-element overhead to near
   zero and packs the working set into fewer cache lines.
4. **Pool and reuse instead of churning.** For short-lived objects allocated in
   a hot loop, reuse buffers: a `sync.Pool` in Go, a slice you reslice to `[:0]`
   and refill, a reused `bytearray`. Fewer allocations means fewer collections,
   and GC time often falls faster than the byte count.
5. **Stream instead of buffering the whole payload.** Reading a file or response
   into one string peaks at its full size; iterate line by line or in fixed
   chunks so peak memory is a window, not the total. Use generators, `io`
   readers, or a SAX-style parser rather than loading a full document into a DOM.
6. **Cap what you retain.** Bound caches and queues with an eviction policy (LRU
   with a max size) so retained memory has a ceiling. A cache with no bound is a
   slow leak that a heap profile eventually blames on the wrong code.

## Checks

- Does peak resident memory stay flat as input grows, or track its size?
- Did the dominant type in the heap profile actually shrink after the change?
- Under load, has GC time or pause frequency dropped, not just live bytes?
- Does every long-lived cache or buffer carry an explicit size bound?

## Boundaries

This reduces intended footprint by design. Hunting an unbounded climb from
unintended retention is memory-leaks; reading the profile that finds the
offender is profiling-memory. Collector pause tuning past allocation rate
belongs to gc-tuning.

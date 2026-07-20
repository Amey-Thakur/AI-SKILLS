---
name: systems-profiling
description: Profile native code with perf and flamegraphs, then read cache, syscall, and allocation behavior to find the real bottleneck. Use when optimizing systems software or explaining why fast code is slow.
---

# Systems profiling

At the systems level, the question shifts from "which function is hot"
to "why is the CPU stalled": cache misses, branch mispredicts,
syscalls, lock contention, and allocator churn hide inside innocent-
looking hot functions.

## Method

1. **Get honest symbols first.** Profile optimized builds
   (`-O2 -g`, frame pointers on or DWARF unwinding configured);
   debug builds lie about what is slow, stripped builds tell you
   nothing. For JIT/interpreted layers in the stack, enable their
   perf-map support so mixed stacks resolve.
2. **Start wide with sampled stacks and a flamegraph.**
   `perf record -g` (or py-spy/async-profiler equivalents in mixed
   stacks) under representative load, rendered as a flamegraph:
   width = inclusive time. Read for the widest towers you did not
   expect: serialization, logging, allocator frames (`malloc` wide
   = allocation churn), and kernel time (`sys_` frames = syscall
   pressure). Fix the widest thing first (see
   performance-optimization discipline).
3. **Explain stalls with counters before rewriting.**
   `perf stat` for IPC, cache-miss and branch-miss rates: IPC well
   under ~1 on hot loops points at memory stalls, not instruction
   count. Then `perf record -e cache-misses` (or `perf c2c` for
   false sharing) to place them. The fixes are data-layout fixes:
   contiguous arrays over pointer chases, struct-of-arrays for
   scanned fields, hot/cold splitting, smaller working sets (see
   gpu-memory-hierarchy for the accelerator analog of the same
   idea).
4. **Attack syscall and I/O overhead as batching problems.**
   `strace -c`/`perf trace` summarize call counts: thousands of
   small read/write/futex calls per second are the smell; the cures
   are buffering, readv/writev, io_uring-class batching, and
   caching (see io-optimization). Futex storms mean lock
   contention: take the mutex profile (`perf lock`, TSan-adjacent
   tooling) and shrink critical sections or shard the lock (see
   concurrency-tuning, deadlock-analysis).
5. **Profile allocation when malloc towers appear.** Heap profilers
   (heaptrack, jemalloc/tcmalloc profiles, `pprof`) show allocation
   sites by rate, not just leaks: per-iteration allocations in hot
   loops become buffers reused across iterations, arenas per phase
   (see c-memory-safety), or value types that never hit the heap.
   Allocation rate also drives GC pressure in managed runtimes
   (see gc-tuning, jvm-profiling).
6. **Close the loop with benchmarks under the same conditions.**
   Each fix validated by the microbenchmark for the changed code
   *and* the macro metric under load (see benchmark-design);
   keep the flamegraph before/after pair in the PR as evidence.
   Production profiling (low-frequency continuous sampling) catches
   the regressions staging never sees (see profiling-cpu for the
   application-level workflow this extends).

## Boundaries

- Microarchitectural counters vary by CPU and virtualization often
  hides them; cloud instances may only offer software events, so
  validate counter availability before promising stall analysis.
- Sampling misses very short or sleeping behavior: off-CPU time
  (blocked on I/O, locks) needs off-CPU/wall-clock profiling
  explicitly; a CPU flamegraph of a waiting program shows nothing
  wrong.
- Optimizing below the algorithm is inverted effort; confirm the
  complexity story first (see algorithmic-optimization), then spend
  counters on the constant factors.

---
name: cpu-architecture
description: Understand caches, branches, and pipelines well enough to explain why equivalent code differs in speed by an order of magnitude. Use when optimising hot code or when performance does not match operation counts.
---

# CPU architecture

Modern processors are fast at predictable, local work and slow at
unpredictable, scattered work. Two algorithms with identical operation
counts can differ enormously because one respects the cache hierarchy
and the other does not.

## Method

1. **Treat memory access as the dominant cost.** A cache miss costs
   hundreds of cycles while an arithmetic operation costs about one, so
   data layout matters more than instruction count.
2. **Favour sequential access.** Prefetching rewards linear traversal
   and cannot help pointer chasing, which is why arrays beat linked
   structures in practice (see data-structure-selection).
3. **Lay out data by access pattern.** Grouping fields used together
   improves cache line utilisation, and splitting hot from cold fields
   can transform a hot loop.
4. **Avoid unpredictable branches in hot loops.** Mispredictions cost
   tens of cycles, and branchless arithmetic or sorted input can remove
   them entirely.
5. **Watch for false sharing between threads.** Independent variables on
   one cache line cause cores to fight over it, producing contention
   with no logical sharing (see concurrency-primitives).
6. **Let the compiler vectorise.** Simple loops over contiguous data
   with no aliasing get vectorised automatically, and complex code
   prevents it.
7. **Profile at the hardware level when it matters.** Cache miss and
   branch miss counters explain what time-based profiling cannot (see
   profiling-cpu).

## Boundaries

These effects matter in hot loops and are irrelevant in most application
code, where clarity should win. Architectures differ substantially, so
tuning for one may not transfer. Managed runtimes and interpreters add
layers that dominate these effects (see performance-optimization).

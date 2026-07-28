---
name: virtual-memory
description: Understand address translation, paging, and the memory hierarchy well enough to explain swap thrashing, page faults, and why memory usage numbers disagree. Use when memory behaviour is confusing or a process is slower than its CPU usage suggests.
---

# Virtual memory

Every process sees a private address space that the kernel maps onto
physical memory on demand. This is why allocating memory can succeed and
using it can fail, why memory numbers never agree, and why a process can
be slow while barely using the processor.

## Method

1. **Distinguish virtual from resident memory.** Virtual size includes
   what is mapped and not used; resident is what is actually in physical
   memory. Reading the wrong one causes false alarms constantly.
2. **Understand demand paging.** Memory is mapped on first touch, so
   allocation is cheap and first use is not, which distorts benchmarks
   that allocate up front.
3. **Recognise thrashing.** When the working set exceeds physical
   memory, the system spends its time paging and throughput collapses
   while the processor looks idle.
4. **Know that shared pages are counted repeatedly.** Summing per-process
   memory overstates total usage substantially, particularly with shared
   libraries and copy-on-write children.
5. **Watch for copy-on-write behaviour.** Forked processes share pages
   until written, so memory grows as the child writes rather than at
   fork time.
6. **Keep the hot working set small.** Locality matters more than total
   allocation for performance, since the hierarchy rewards reuse (see
   cpu-architecture).
7. **Set limits deliberately in containers.** A container memory limit
   causes termination rather than swapping, which is a very different
   failure mode to plan for.

## Boundaries

Details differ between operating systems and are heavily abstracted by
managed runtimes with their own memory management (see
memory-optimization). Overcommit policies mean allocation success does
not guarantee availability. Measurement tools report different figures
because they measure genuinely different things.

---
name: gpu-memory-hierarchy
description: Place data across the GPU memory tiers so a kernel is limited by math rather than by repeated trips to HBM. Use when a kernel is memory-bound, when deciding what to stage in shared memory or L2, or when register spills are stalling a hot loop.
---

# GPU memory hierarchy

The GPU memory pyramid is steep: registers run at compute speed, shared memory
and L1 live inside each streaming multiprocessor, L2 is shared across the whole
chip, and HBM below is vast but slow next to the math units. A kernel that
ignores the pyramid reloads the same value from HBM tens of times and stalls
on it. Winning means pulling each byte from far memory once and reusing it close
to the cores.

## Method

1. **Pin the tier sizes for the card you run on.** An A100 gives roughly
   2.0 TB/s of HBM2e, a 40 MB L2, up to 164 KB of shared memory per SM, and at
   most 255 registers per thread. An H100 raises HBM3 to about 3.35 TB/s and L2
   to 50 MB. Those numbers set what fits where and how fast the bottom tier
   feeds the top.
2. **Compute arithmetic intensity and read it on the roofline.** Divide the
   kernel's FLOPs by the bytes it moves from HBM. If that ratio sits left of the
   card's roofline ridge point, more math cannot help: you are bandwidth limited
   and must cut traffic or raise reuse.
3. **Confirm the bound type in Nsight Compute.** Read the Memory and Compute
   percentages in the Speed Of Light section. DRAM throughput near 90 percent
   with low compute means HBM-bound, which points at reuse, not at the ALUs.
4. **Tile reused data into shared memory.** Have each block load a chunk from
   HBM once into a `__shared__` tile, then let every thread read it many times
   at near-register speed. This is the core of fast tiled GEMM and stencils.
   Size the tile so enough blocks still stay resident.
5. **Break shared-memory bank conflicts.** Shared memory has 32 banks of 4
   bytes; when a warp hits one bank at different addresses, the accesses
   serialize. Pad the inner tile dimension by one (`float t[32][33]`) to skew
   the mapping and clear the conflict.
6. **Hold reused read-only data in L2 with a persisting window.** On Ampere and
   later, mark a hot buffer with a `cudaAccessPolicyWindow` set to persisting so
   it survives in L2 across kernels instead of being evicted. This pays when the
   working set is too big for shared memory but fits the 40 to 50 MB L2.
7. **Watch for register spills in the hot loop.** Registers are fastest and
   scarce; exceed the budget and the compiler spills to local memory in HBM.
   Compile with `-Xptxas -v` and treat any nonzero spill-stores line in a hot
   kernel as a signal to simplify the loop or shrink the tile.

## Signals

- Does measured DRAM read volume match the theoretical minimum (each input read
  about once), or several times more?
- Does `-Xptxas -v` report zero spill stores for the hot kernel?
- Did adding shared-memory tiling drop DRAM throughput while raising compute
  throughput in Nsight?
- Is the Nsight bank-conflict counter near zero on shared-memory accesses?

## Boundaries

This is staging and reuse inside one kernel on one GPU. Host-to-device transfer,
unified-memory paging, and CPU-GPU overlap are separate concerns. Deciding which
loads to coalesce belongs to cuda-kernel-basics; reading the profiler counters
in depth belongs to kernel-profiling-nsight. When the math units are themselves
the ceiling, tier tuning stops paying and tensor-core-utilization takes over.

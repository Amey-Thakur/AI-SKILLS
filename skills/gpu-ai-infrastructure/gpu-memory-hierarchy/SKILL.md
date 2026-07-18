---
name: gpu-memory-hierarchy
description: Move data through the GPU memory tiers deliberately so kernels are bound by compute rather than by HBM traffic. Use when a kernel is memory-bound, when you are deciding what to stage in shared memory, or when register spills are hurting a hot loop.
---

# GPU memory hierarchy

A GPU has a steep memory pyramid: registers at the top run at compute speed,
shared memory and L1 sit per streaming multiprocessor, L2 is shared across the
chip, and HBM at the bottom is huge but slow relative to the math units. Kernels
that ignore the pyramid read the same value from HBM dozens of times and stall
waiting on it. Winning means fetching each byte from far memory once and reusing
it near the cores.

## Method

1. **Know the numbers for your card.** On an A100, HBM2e delivers about
   2 TB/s, L2 is 40 MB, shared memory is up to 164 KB per SM, and each thread
   gets at most 255 registers. On an H100, HBM3 reaches roughly 3.35 TB/s.
   The gap between HBM bandwidth and the FLOP rate is why reuse matters:
   compute the kernel's arithmetic intensity (FLOPs per byte) and compare it
   to the roofline ridge point.
2. **Classify the kernel as memory-bound or compute-bound first.** In Nsight
   Compute, read the Memory and Compute throughput percentages. If DRAM
   throughput is near 90 percent and compute is low, you are HBM-bound and the
   fix is reducing traffic, not adding math.
3. **Stage reused data in shared memory.** Tile the problem so a block loads
   a chunk from HBM once into `__shared__`, then every thread reads it many
   times at near-register speed. This is the whole trick behind fast tiled
   matmul and stencils. Size the tile to fit alongside enough resident blocks.
4. **Avoid shared-memory bank conflicts.** Shared memory has 32 banks of
   4 bytes; when threads in a warp hit the same bank with different addresses,
   accesses serialize. Pad the inner dimension of a tile by one element
   (`__shared__ float t[32][33]`) to skew the mapping and break the conflict.
5. **Keep the hot working set in registers, and watch for spills.** Registers
   are the fastest storage but scarce. When a thread needs more than the limit,
   the compiler spills to local memory, which lives in slow HBM. Compile with
   `-Xptxas -v` to see registers per thread and spill bytes; a nonzero
   "spill stores" line in a hot kernel is a red flag to simplify or retile.
6. **Trade occupancy against reuse on purpose.** Larger tiles and more
   registers per thread raise reuse but lower how many warps stay resident.
   Test both directions: sometimes 50 percent occupancy with heavy reuse beats
   75 percent occupancy that re-reads HBM. Measure DRAM bytes moved, not a feel.

## Signals

- Does the kernel's measured DRAM read volume match the theoretical minimum (each input read about once), or many times more?
- Does `-Xptxas -v` report zero spill stores in the hot kernel?
- Did adding shared-memory tiling drop DRAM throughput while raising compute throughput in Nsight?
- Are shared-memory accesses conflict-free (Nsight bank-conflict counter near zero)?

## Boundaries

This is about staging and reuse within one kernel on one GPU. Host-to-device
transfer, unified memory paging, and CPU-GPU overlap are separate concerns.
Picking which loads to coalesce belongs to cuda-kernel-basics; interpreting the
profiler counters in depth belongs to kernel-profiling-nsight. When the math
units themselves are the limit, hierarchy tuning stops paying and tensor-core
work begins.

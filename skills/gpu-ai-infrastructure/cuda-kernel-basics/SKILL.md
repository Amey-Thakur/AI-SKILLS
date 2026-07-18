---
name: cuda-kernel-basics
description: Write correct, reasonably fast first CUDA kernels by mapping work to the thread hierarchy, coalescing global loads, and checking occupancy. Use when you are writing or reviewing a hand-written CUDA kernel and want it to run without wasting most of the GPU.
---

# CUDA kernel basics

A CUDA kernel launches thousands of threads that all run the same code on
different data. The first kernel most people write is correct and ten times
too slow, because they index memory the way a CPU loop would and leave the
hardware's parallelism and bandwidth on the floor. The fix is a small set of
habits applied every time.

## Method

1. **Map one thread to one output element first.** Compute a global index
   `int i = blockIdx.x * blockDim.x + threadIdx.x;` and guard it with
   `if (i < n) return;` so the tail block does not read past the array.
   Get this version correct before any optimization: it is your reference.
2. **Pick block size in multiples of the 32-thread warp.** Threads execute
   in warps of 32, so a block of 33 wastes 31 lanes in a second warp. Start
   at 256 threads per block and size the grid as `(n + 255) / 256`. Never
   launch a block dimension that is not a multiple of 32.
3. **Coalesce global memory access.** Consecutive threads in a warp must
   touch consecutive addresses so the hardware fuses them into one 128-byte
   transaction. `a[i]` where `i` is the global index coalesces; `a[i * stride]`
   or `a[threadIdx.x * width + row]` scatters and can cost 32 separate loads.
   For a 2D layout, make `threadIdx.x` walk the contiguous (innermost) axis.
4. **Keep divergence out of the warp.** When threads in one warp take
   different branches of an `if`, the warp runs both sides serially. Branch on
   `blockIdx` or on data that is uniform across the warp; avoid `if (threadIdx.x % 2)`
   style splits inside the hot loop.
5. **Check occupancy with the tools, not by feel.** Run
   `cudaOccupancyMaxPotentialBlockSize` or read the occupancy line in Nsight
   Compute. Registers per thread and shared memory per block cap how many
   warps a streaming multiprocessor holds; over-using either drops resident
   warps and starves the SM of work to hide memory latency. Aim for at least
   50 percent theoretical occupancy before blaming the algorithm.
6. **Check every CUDA call and sync before timing.** Wrap launches with a
   `cudaGetLastError()` plus `cudaDeviceSynchronize()` in debug builds, and run
   the kernel once under `compute-sanitizer` to catch out-of-bounds and races
   that silently corrupt results on some launches only.

## Checks

- Does `compute-sanitizer ./app` report zero errors on a representative input?
- Is every block dimension a multiple of 32, and does the grid cover the tail?
- Does Nsight Compute report the global loads as coalesced (high sectors-per-request efficiency), not scattered?
- Does the kernel match a CPU reference within floating-point tolerance?

## Boundaries

This covers single-kernel correctness and first-order speed on one GPU. It does
not cover multi-GPU or NCCL collectives, streams and overlap, or squeezing the
last percent from a matmul. Once loads are coalesced and occupancy is healthy,
move to a profiler-driven pass (see kernel-profiling-nsight) and to the memory
hierarchy (see gpu-memory-hierarchy) rather than tuning by intuition.

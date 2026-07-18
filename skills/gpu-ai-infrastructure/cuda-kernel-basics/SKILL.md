---
name: cuda-kernel-basics
description: Write first CUDA kernels that map work onto the grid, coalesce global memory, and keep enough warps resident to hide latency. Use when hand-writing or reviewing a CUDA kernel and it runs far below the bandwidth or FLOPs the card should reach.
---

# CUDA kernel basics

A kernel launches one function across thousands of threads, each working on its
own slice of data. The classic first attempt is correct but an order of
magnitude too slow: it indexes memory like a serial loop and sizes thread blocks
by guesswork. These habits, applied on every kernel, close most of that gap
before a profiler is even involved.

## Method

1. **Decompose the work onto grid, block, and thread.** Compute the global
   index as `int i = blockIdx.x * blockDim.x + threadIdx.x` and bound it with
   `if (i >= n) return;` so the last, partly full block does not read past the
   array. Keep this one-thread-per-element version as the reference you optimize
   against.
2. **Write a grid-stride loop for sizes larger than the grid.** Loop
   `for (int i = tid; i < n; i += blockDim.x * gridDim.x)` so a fixed grid
   handles any `n` and each thread covers several elements. This decouples the
   launch configuration from problem size and keeps blocks busy.
3. **Size blocks in multiples of the 32-thread warp.** Threads issue in warps of
   32, so a block of 200 wastes 24 lanes in its final warp. Start at 128 or 256
   threads and compute the grid as `(n + block - 1) / block`. Never launch a
   block dimension that is not a multiple of 32.
4. **Coalesce global loads and stores.** When the 32 threads of a warp touch
   consecutive addresses, the hardware fuses them into one 128-byte transaction.
   `a[i]` on the global index coalesces; `a[i * stride]` or indexing the outer
   axis of a 2D array scatters into up to 32 separate sectors. Make
   `threadIdx.x` walk the innermost, contiguous axis.
5. **Check occupancy with the tools, not by feel.** Call
   `cudaOccupancyMaxPotentialBlockSize` or read the occupancy line in Nsight
   Compute. Registers per thread and shared memory per block cap how many warps
   a streaming multiprocessor keeps resident; overspending either starves the SM
   of work to hide memory latency. Target at least 50 percent theoretical
   occupancy before blaming the algorithm.
6. **Prove correctness before timing anything.** Wrap launches with
   `cudaGetLastError()` and a `cudaDeviceSynchronize()` in debug builds, and run
   once under `compute-sanitizer` to catch out-of-bounds writes and races that
   corrupt results only on some launches.

## Checks

- Does `compute-sanitizer ./app` report zero errors on a representative input?
- Is every block dimension a multiple of 32, and does the grid cover the tail?
- Does Nsight Compute report global accesses as coalesced (high
  sectors-per-request efficiency) rather than scattered?
- Does the kernel match a trusted CPU reference within floating-point tolerance?

## Boundaries

This is single-kernel correctness and first-order speed on one GPU. It does not
cover streams and copy overlap, multi-GPU NCCL collectives, or wringing the last
percent from a GEMM. Once loads coalesce and occupancy is healthy, move to a
profiler-driven pass (kernel-profiling-nsight) and to staging data across the
memory tiers (gpu-memory-hierarchy) instead of guessing.

---
name: kernel-profiling-nsight
description: Profile GPU work with Nsight Systems and Nsight Compute to read the timeline, name the bottleneck class, and pull the metric that dictates the fix. Use when a GPU program is slower than expected and you need evidence before touching a kernel.
---

# Kernel profiling with Nsight

The two tools split the job cleanly: Nsight Systems shows the whole timeline of
where time goes across CPU, copies, and kernels, while Nsight Compute dissects
one kernel's internals. The common mistake is opening Compute first and missing
that the GPU sat idle 60 percent of the run waiting on the host. Profile
top-down, from timeline to kernel, so the change you make is the one costing
wall-clock time.

## Method

1. **Capture the whole run with Nsight Systems first.** Run `nsys profile -o out
   ./app` and open the report. Scan GPU utilization across the timeline: gaps
   between kernels mean the device is starved by host code, tiny launches, or a
   synchronous `cudaMemcpy`. Close idle time before optimizing any kernel.
2. **Annotate phases with NVTX ranges.** Wrap logical stages (data load, forward,
   backward) in `nvtxRangePush`/`nvtxRangePop` so the timeline reads as named
   bands instead of an undifferentiated wall of kernels. This makes the starved
   phase obvious at a glance.
3. **Name the bottleneck class before optimizing.** Every kernel is capped by
   one of three things: memory bandwidth, compute throughput, or latency from
   too little parallelism. Nsight Compute's Speed Of Light section reports Memory
   and Compute as percentages of peak; high memory and low compute is
   bandwidth-bound, both low is latency-bound and usually low occupancy.
4. **Capture the target kernel with the full set.** Run
   `ncu --set full -k kernel_name -c 1 ./app` to profile one invocation. Filter
   by name and count because profiling every launch is slow, and the full set is
   what lets the guided analysis rules fire.
5. **Read the metrics that name the fix, not raw counters.**
   `dram__throughput` and `sm__throughput` give the SOL split,
   `l1tex__t_sector_hit_rate` shows cache reuse, and low sectors-per-request
   flags uncoalesced loads. Warp State Statistics names the top stall: Long
   Scoreboard is waiting on memory, Barrier is `__syncthreads` contention.
6. **Follow the guided rules, change one thing, reprofile.** Compute prints
   findings like "uncoalesced global access" with an estimated speedup. Treat
   each as a lead, apply a single change, and reprofile, since a fix often shifts
   the bottleneck to a new class rather than removing it.
7. **Diff before and after to prove the win.** Open the two `.ncu-rep` files side
   by side and confirm both the targeted metric moved and kernel duration
   dropped. A counter that improved without cutting duration was not the
   bottleneck.

## Litmus tests

- Can you state memory-, compute-, or latency-bound with SOL percentages behind
  the claim?
- Did you rule out GPU idle time in Nsight Systems before opening a kernel?
- Does the profiler name a concrete stall reason rather than a vague "it's slow"?
- After the change, did kernel duration in the report actually fall?

## Boundaries

Nsight tells you where time goes and why a kernel stalls; it does not write the
faster kernel. Turning uncoalesced loads into coalesced ones is
cuda-kernel-basics; turning bandwidth-bound into compute-bound is
gpu-memory-hierarchy. Overhead from `ncu` is high, so profile a reduced input,
and never draw conclusions from a debug build.

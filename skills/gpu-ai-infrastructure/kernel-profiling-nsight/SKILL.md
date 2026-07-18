---
name: kernel-profiling-nsight
description: Profile GPU workloads with Nsight Systems and Nsight Compute to read the timeline, classify the bottleneck, and pull the metric that names the fix. Use when a GPU program is slower than expected and you need evidence for what to change before touching a kernel.
---

# Kernel profiling with Nsight

Two tools split the job: Nsight Systems shows the whole timeline (where time
goes across CPU, copies, and kernels), and Nsight Compute dissects one kernel's
internals. People reach for Compute first and miss that the GPU was idle 60
percent of the time waiting on the host. Profile top-down, from timeline to
kernel, so you fix the thing that is actually costing wall-clock time.

## Method

1. **Start with Nsight Systems for the timeline.** Run `nsys profile -o out
   ./app` and open the report. Look at GPU utilization across the run: gaps
   between kernels mean the GPU is starved by host code, small batches, or
   synchronous `cudaMemcpy`. Fix idle time before optimizing any kernel, since
   a faster kernel does nothing while the device is waiting.
2. **Classify the bottleneck before optimizing.** Every kernel is limited by
   one of three things: memory bandwidth, compute throughput, or latency
   (not enough parallelism to hide stalls). Nsight Compute's Speed Of Light
   section shows Memory and Compute as percentages of peak. High memory, low
   compute means bandwidth-bound; both low means latency-bound and usually low
   occupancy.
3. **Capture the target kernel in Nsight Compute with the right set.** Run
   `ncu --set full -k kernel_name -c 1 ./app` to profile one invocation with
   the full metric set. Profiling every launch is slow, so filter by kernel
   name and count. The full set is needed for the guided analysis rules to
   fire.
4. **Read the metrics that name the fix, not the raw counters.**
   `sm__throughput.avg.pct_of_peak_sustained_elapsed` and
   `dram__throughput...` give the SOL split.
   `l1tex__t_sector_hit_rate` shows cache reuse. Uncoalesced loads show as low
   sectors-per-request. The Warp State Statistics section names the top stall
   reason (Long Scoreboard means waiting on memory, Barrier means `__syncthreads`).
5. **Trust the guided analysis, then verify.** Nsight Compute prints rule
   findings like "uncoalesced global access" or "shared memory bank conflicts"
   with the estimated speedup. Treat these as leads, apply one change, and
   reprofile: the recommended fix sometimes shifts the bottleneck to a new
   class rather than removing it.
6. **Diff two reports to prove the win.** Open the before and after `.ncu-rep`
   files side by side and confirm the metric you targeted moved and total
   kernel duration dropped. A change that improves a counter but not duration
   was not the bottleneck.

## Litmus tests

- Can you state whether the kernel is memory-bound, compute-bound, or latency-bound, with the SOL percentages to back it?
- Did you rule out GPU idle time in Nsight Systems before diving into a kernel?
- Does the profiler name a specific stall reason (Long Scoreboard, Barrier) rather than a vague "it's slow"?
- After the fix, did kernel duration in the report actually drop?

## Boundaries

Nsight tells you where time goes and why a kernel stalls; it does not write the
faster kernel. Turning "uncoalesced loads" into coalesced ones is
cuda-kernel-basics; turning "bandwidth-bound" into "compute-bound" is
gpu-memory-hierarchy. Overhead from `ncu` is high, so profile a reduced input,
and never draw conclusions from a debug build.

---
name: jvm-gc-selection
description: Choose and size a JVM garbage collector from latency goals and allocation behavior, and read GC logs before tuning flags. Use when configuring JVM services or diagnosing pause and memory pressure problems.
---

# JVM GC selection

Pick the collector from the latency requirement, size the heap from
measured live-set, and let the collector's own ergonomics work.
Most "GC tuning" that matters is those two decisions plus fixing the
allocation behavior the logs reveal.

## Method

1. **Match collector to goal.** G1 (default): balanced throughput
   with pauses in tens of ms, right for most services. ZGC (or
   Shenandoah): sub-millisecond-to-few-ms pauses at some throughput
   and memory cost, for latency-critical paths with large heaps.
   Parallel GC: maximum throughput where pauses are irrelevant
   (batch, offline jobs; see data-pipeline-design workloads).
   Serial: tiny containers. Do not chase exotic flags before the
   collector choice is right.
2. **Size the heap from live-set, not from the machine.** Measure
   live data after full collections under real load; heap = live-set
   times 2.5-4x (G1 breathes in that range; ZGC likes more headroom).
   Set Xms = Xmx in containers (growth churn buys nothing), and
   leave real room for off-heap: metaspace, threads, direct buffers,
   and the container limit itself (OOMKilled with a healthy heap
   means the *native* side was unbudgeted; see kubernetes-workloads
   memory limits).
3. **Turn on GC logging always; read it before touching flags.**
   `-Xlog:gc*` is near-free in production. Read: pause distribution
   (p99, not average), frequency, promotion rates, and full-GC
   events (a G1 full GC is a red flag: heap too small, humongous
   allocations, or a leak). Allocation rate over ~1GB/s per core of
   young-gen churn says fix the code, not the collector (see
   memory-optimization).
4. **Cut allocation before adding heap.** The profiler's allocation
   view (see jvm-profiling) names the churn sites: per-request
   buffers to reuse, string concatenation in loops, boxing in hot
   paths, oversized intermediate collections. Halving allocation
   rate beats doubling heap in both pause behavior and cost.
5. **Diagnose leaks with heap dumps, not restarts.** Rising old-gen
   floor across collections = leak: dump
   (`jcmd GC.heap_dump`), open in MAT/VisualVM-class tools, walk
   dominator trees to the retaining root (static caches without
   bounds, listener registrations, ThreadLocals in pools are the
   usual suspects; see memory-leaks). Scheduled restarts are
   incident deferral, not management.
6. **Validate changes like performance work.** One change at a time,
   before/after GC logs under the same load (see benchmark-design),
   watching the service SLO alongside pause metrics: a collector
   "win" that costs 15% throughput may be a loss. Record chosen
   flags and why in the repo, next to the deployment config (see
   config-management).

## Boundaries

- Application pauses are not always GC: safepoint stalls from other
  VM operations and container CPU throttling read like GC in
  dashboards; the unified log attributes them (see
  kubernetes-workloads CPU-limit note).
- Generational hypotheses fail for some workloads (LRU caches of
  mid-lived objects); consider off-heap caches or different data
  retention shapes before fighting the collector.
- Exotic flag stacks copied from blog posts rot across JVM versions;
  prefer defaults plus the few flags you can defend with your own
  logs.

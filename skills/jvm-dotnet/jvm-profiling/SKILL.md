---
name: jvm-profiling
description: Profile JVM services with async-profiler and JFR, separating CPU, allocation, and lock evidence, safely in production. Use when a JVM service is slow, hot, or memory-hungry and you need the cause.
---

# JVM profiling

The JVM ships production-safe profilers; there is no excuse for
guessing. The craft is picking the right profile type for the symptom
and reading past the framework noise to your code.

## Method

1. **Match the profile to the symptom.** High CPU: CPU sampling
   (async-profiler `-e cpu`, or JFR's execution samples). High GC or
   heap pressure: allocation profiling (`-e alloc`, JFR allocation
   events: sites by rate, feeding jvm-gc-selection's step 4). Slow
   but idle CPU: wall-clock/off-CPU profiling (`-e wall`) and lock
   profiling (`-e lock`, JFR monitor-blocked events): a service
   waiting on locks or downstreams shows nothing in CPU samples
   (the systems-profiling off-CPU rule, JVM edition).
2. **Use the safe tools, even in production.** async-profiler and
   JFR sample via safepoint-bias-free mechanisms at low overhead
   (~1-2%): suitable for production during incidents. Old
   instrumenting profilers and `hprof`-style tracing distort hot
   paths and belong nowhere near load. Continuous JFR recordings
   (ring buffer, dumped on incident) give you the profile of the
   problem that already happened (see production-debugging).
3. **Read flamegraphs from your frames outward.** Framework stacks
   (server threads, serialization, logging) dominate visually;
   find your packages' widest frames first, then judge the
   framework towers: wide JSON serialization means fat DTOs
   (see rest-endpoint-design projections), wide logging means
   log-level or string-building waste (see log-levels), wide
   `malloc`/GC frames mean allocation churn (see
   java-collections sizing, memory-optimization).
4. **Correlate with GC and thread state before concluding.**
   A "slow service" profile taken during a GC storm profiles the
   symptom, not the cause: check GC logs first (see
   jvm-gc-selection). Thread dumps (three, seconds apart) reveal
   pool starvation and deadlocks that samples smear
   (see deadlock-analysis, stack-trace-reading); JFR's thread
   states put numbers on runnable vs blocked vs waiting.
5. **Diagnose heap with dumps and dominator trees.** For footprint
   and leaks: heap dump into MAT-class tooling, dominator tree for
   retained size by root, histogram diff between two dumps for
   growth (see memory-leaks, jvm-gc-selection step 5). For "what
   is allocating", the allocation profile beats the heap dump:
   one shows standing stock, the other flow.
6. **Benchmark micro-claims with JMH, not loops.** JIT warmup,
   dead-code elimination, and OSR make naive timing loops lie;
   JMH handles warmup/forking/blackholes (the zero-cost-
   abstractions verification ethic on the JVM). Macro changes
   validate under load against SLO metrics (see benchmark-design,
   load-testing); a micro win that disappears at p99 was noise.

## Boundaries

- Profiles are per-workload evidence: staging profiles with fake
  data mislead on cache hit rates, JIT decisions, and data sizes;
  prefer production or production-shaped load
  (see test-environment-parity).
- Native memory (direct buffers, Netty arenas, JNI) escapes heap
  tools; native memory tracking (NMT) and OS-level maps cover the
  gap when container RSS exceeds heap math (see
  kubernetes-workloads memory budgeting).
- Kotlin coroutines and virtual threads restructure stacks;
  use profiler versions aware of them, or frames attribute to
  schedulers instead of your code.

---
name: benchmark-design
description: Write benchmarks that do not lie, controlling warmup, isolation, and statistics so the number reflects the code and not the environment. Use when comparing implementations, defending a performance claim, or a microbenchmark result looks too good.
---

# Benchmark design

A benchmark is an experiment, and most of them are broken experiments that
measure the JIT warming up, the allocator settling, or the dead-code
eliminator deleting the thing under test. A confident wrong number is worse
than no number, because someone ships a decision on it. Design the
measurement so the result survives being run again on another machine.

## Method

1. **State the question and the unit first.** "Nanoseconds per `parse()`
   call on 1 KB inputs", not "is it fast". Fix the input size, the data
   shape, and what counts as one operation before writing any timing code.
2. **Warm up until steady state, then measure.** Run the workload untimed
   until the JIT compiles and caches fill (JMH `@Warmup`, Criterion and
   `pytest-benchmark` do this automatically). Discard warmup samples. A cold
   first run measures compilation, not the code.
3. **Defeat dead-code elimination.** Consume every result: return it, feed it
   to a blackhole (`Blackhole.consume` in JMH), or accumulate into a checksum
   you print. A loop whose output is unused legally compiles to nothing, and
   then you are timing an empty loop.
4. **Isolate the machine.** Pin to a core (`taskset -c 2`), disable turbo and
   frequency scaling (`cpupower frequency-set -g performance`), close
   background load, and run on hardware, not a shared CI runner or a laptop on
   battery. Report the CPU, OS, and runtime version alongside the number.
5. **Report a distribution, not a mean.** Collect many samples and show
   median plus p95 and the interquartile range. The mean hides multimodal
   results from GC pauses and context switches; the median with spread tells
   the truth. Flag any run whose variance exceeds a few percent as untrusted.
6. **Compare with a real significance test.** For A versus B, run interleaved
   samples and apply a Mann-Whitney U test or non-overlapping confidence
   intervals, not eyeballed averages. A 3% difference inside the noise band
   is not a difference.

## Litmus tests

- Does re-running the benchmark on a second machine preserve the ranking of
  the variants, even if absolute numbers shift?
- If you delete the code under test, does the benchmark get faster (it should
  break or error, proving the work was actually happening)?
- Do you report median and spread with hardware and runtime, not a lone mean?
- Would the measured difference survive a significance test on fresh samples?

## Boundaries

This governs microbenchmarks and small controlled comparisons. Whole-system
load behavior under concurrency belongs to throughput-scaling and
latency-analysis; catching drift over time in automation is
performance-regression-detection. Production numbers come from
real-user-monitoring, not a bench.

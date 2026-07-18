---
name: performance-testing
description: Benchmark code so the numbers mean something: warm up, fix inputs, report variance, and gate regressions in CI. Use when measuring the speed of a function or comparing two implementations.
---

# Performance testing

A benchmark that reports one number from one run is worse than no benchmark:
it invites decisions made from noise. Honest measurement accounts for warmup,
background variance, and input shape, and it states its uncertainty. Skip the
method and you end up optimizing against your cache state and a neighbor's
cron job rather than the code.

## Method

1. **Warm up before you measure.** The first iterations pay for JIT
   compilation, cold caches, and lazy allocation. Run a discard loop until
   timings stabilize, then start recording. Established harnesses like JMH,
   pytest-benchmark, and Criterion do this for you; respect it.
2. **Fix the input and the input size.** Benchmark a known, committed dataset
   at a stated size, not whatever happened to be in memory. Report the size
   with the result: "parse, 10k rows" means something, "parse is fast" does
   not.
3. **Run many iterations and report the distribution.** Collect hundreds of
   samples and report median plus a spread such as p95 and standard
   deviation. The mean alone hides a bimodal result where half the runs hit a
   slow path.
4. **Quiet the machine.** Close other load, pin to a core, and disable
   frequency scaling or turbo boost where you can. On a laptop on battery the
   numbers are fiction. `hyperfine` and `taskset` help isolate a run.
5. **Compare against a committed baseline, not a memory.** Store last known
   timings in the repo and diff against them. "20% slower than the baseline
   we committed" is actionable; "feels slower than last week" is not.
6. **Gate regressions in CI with a threshold and repeats.** Fail the build
   when the median exceeds the baseline by a set margin, say 10%, confirmed
   over repeated runs so a single noisy sample does not block a merge. Track
   the baseline as it legitimately improves.
7. **Profile to find the cost, benchmark to confirm the fix.** A profiler
   like perf, py-spy, or a flame graph tells you where time goes; the
   benchmark proves the change actually moved the median, not just your
   intuition.

## Signals

- Do two runs of the unchanged benchmark land within your CI threshold of
  each other? If not, the harness is too noisy to gate on.
- Does the report name the input size, iteration count, and a spread, not
  just a single millisecond figure?
- When the gate fails, can you point to the committed baseline it regressed
  against?

## Boundaries

This covers micro and function-level benchmarks on one machine. Multi-user
capacity, ramp profiles, and saturation belong to load-testing. Whether a
given speed is fast enough is a product call against a latency budget, not
something a benchmark decides.

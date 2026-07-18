---
name: test-speed
description: Keep the suite fast enough to run on every change by measuring the slow tests, shaping the pyramid, cutting IO from the fast tier, and sharding. Use when the suite is slow enough that developers skip it or batch changes to avoid the wait.
---

# Test speed

A suite that takes twenty minutes stops being run. People push without it,
batch unrelated changes to amortize the wait, and the fast feedback the suite
exists to give quietly collapses. Speed is not vanity: it is what keeps testing
inside the edit loop. Most slow suites are slow for a few measurable reasons,
and the culprits are rarely the tests you would guess.

## Method

1. **Measure before optimizing.** Run `pytest --durations=25`, Go's `-json`
   timing, or Jest `--verbose` and sort. A handful of tests usually own most of
   the wall clock; fix those and ignore the fast majority.
2. **Shape the pyramid toward the fast tier.** Where a unit test can cover a
   rule, delete the integration test that duplicates it and keep integration
   tests for the wiring only. To audit the current distribution, defer to
   test-pyramid-audit.
3. **Cut IO the fast tier does not verify.** Replace a real database with an
   in-memory one or transactional rollback, swap sleep-and-poll for an injected
   clock, and stub network calls. A unit test that opens a socket is misfiled:
   move it or fake the boundary. For choosing those doubles, defer to
   test-doubles.
4. **Reuse expensive setup instead of rebuilding it.** Start Testcontainers or
   a dev database once with `scope="session"`, not per test, and reset data
   with fast truncation. A per-test container start is often the single largest
   line in the durations report.
5. **Run in parallel across cores.** Turn on `pytest -n auto` (xdist), Go's
   default package parallelism, or Jest workers. This requires isolation to
   already hold, so fix order-dependence before expecting the gain.
6. **Shard across CI machines and cache the unchanging.** Split the suite by
   timing across runners so total time drops toward the slowest shard, and reuse
   built Docker layers and warmed dependency caches so cold-start cost is not
   paid every run.

## Checks

- Does `--durations` show a flat tail rather than a few tests dominating?
- Does the unit tier run with zero real network or disk access?
- Does wall-clock time roughly halve when you double the workers?

## Boundaries

Speed serves feedback: do not trade away coverage of real integration seams to
hit a number, and keep a slower e2e stage for genuine end-to-end confidence.
Micro-optimizing already-fast unit tests is wasted effort. What to cover at each
tier is testing-strategy's call. A system that is simply slow to boot is an
architecture problem this skill cannot paper over.

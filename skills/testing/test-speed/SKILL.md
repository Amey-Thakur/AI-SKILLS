---
name: test-speed
description: Keep the suite fast enough to run on every change by shaping the pyramid, cutting IO from the fast tier, and sharding. Use when the suite is slow enough that developers skip it or batch changes to avoid the wait.
---

# Test speed

A suite that takes twenty minutes stops being run. Developers push without it,
batch unrelated changes to amortize the wait, and the feedback loop that tests
exist to provide quietly collapses. Speed is not vanity: it is what keeps the
suite inside the edit loop. Most slow suites are slow for a few measurable
reasons, and each one has a concrete fix.

## Method

1. **Measure first: rank the slowest tests and read the shape.** Run
   `pytest --durations=25` or `jest --verbose` to sort tests by time, and count
   how many touch the network or DB versus pure functions. You usually find a
   top-heavy pyramid doing integration work a unit test could cover.
2. **Push logic down the pyramid.** Where a unit test can cover a rule, delete
   the integration test that duplicates it and keep integration tests for the
   wiring only. Roughly 100:10:1 unit to integration to e2e keeps the bulk of
   assertions in the millisecond tier.
3. **Eliminate IO from the fast tier.** Swap a real database for an in-memory
   one or transactional rollback, replace sleep-and-poll with an injected clock,
   and stub network calls. A unit test that opens a socket is misfiled: move it
   or fake the boundary.
4. **Reuse expensive setup instead of rebuilding it.** Start Testcontainers or a
   dev DB once with `scope="session"`, not per test, and reset data with fast
   truncation. Per-test container startup is often the single largest line in the
   durations report.
5. **Shard across cores and CI machines.** Run `pytest -n auto` locally and
   split the suite with `--shard` or test splitting across CI jobs. This depends
   on test-isolation holding, since parallel gains vanish the moment tests share
   state.
6. **Fail fast and skip the untouched.** Use `--ff` (failed-first) for tight
   local loops, and wire selection so a change runs its affected tests first.
   Reserve the full slow e2e set for a pre-merge or nightly stage, not every save.

## Checks

- Is the unit tier under a few seconds, so the tight edit loop stays instant?
- Do the top `--durations` entries have a real reason to be slow, or are they
  lazy integration tests?
- Does wall-clock time roughly halve when you double the workers?

## Boundaries

Speed serves feedback: do not trade away coverage of real integration seams to
hit a number, and keep a slower e2e-testing stage for genuine end-to-end
confidence. Micro-optimizing already-fast unit tests is wasted effort. What to
cover at each tier is testing-strategy's decision, not this skill's.

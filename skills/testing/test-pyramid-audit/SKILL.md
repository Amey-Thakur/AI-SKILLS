---
name: test-pyramid-audit
description: Rebalance a top-heavy test suite toward fast unit tests without dropping the coverage the slow tests provide. Use when end-to-end tests dominate the suite and CI is slow, flaky, or expensive to run.
---

# Test pyramid audit

An inverted pyramid is a suite where slow, brittle end-to-end tests carry the
coverage that cheap unit tests should. It feels safe because everything is
"tested through the UI", but each run is slow, each failure is vague, and one
timing flake blocks the whole merge queue. Rebalancing is not deleting the
slow tests on faith: it is moving each behavior down to the fastest layer that
can still prove it, then retiring the redundant climb.

## Method

1. **Count the current shape before touching anything.** Tally tests per layer
   (unit, integration, end-to-end) from your runner's tags or directories.
   Record wall-clock time and failure rate per layer over the last 50 CI
   runs. A pyramid with 70% end-to-end and a 3% flake rate is the problem
   stated in numbers.
2. **Measure coverage per layer, not just overall.** Run coverage with only
   unit tests, then only end-to-end, using a tool that supports merging
   (`coverage combine`, nyc). The lines only the slow tests touch are your
   real migration list; the rest is duplicate coverage you can drop safely.
3. **Push each behavior to the lowest layer that proves it.** A validation
   rule exercised through a browser click belongs in a unit test on the
   validator. Rewrite it there first, confirm it fails when you break the
   rule, then and only then remove the end-to-end path that covered it.
4. **Keep a thin end-to-end layer for true integration risk.** Retain
   end-to-end tests for the handful of full-stack journeys that no lower test
   can vouch for: login, checkout, a critical webhook round-trip. Target a
   rough 70/20/10 split of unit/integration/end-to-end and treat deviation as
   a smell, not a law.
5. **Migrate in vertical slices, never big-bang.** Move one feature's coverage
   down a layer, watch mutation or coverage numbers hold, then commit.
   Deleting a slow test and adding its fast replacement in the same commit
   keeps the safety net intact at every step.
6. **Guard the ratio so it does not re-invert.** Add a CI check that fails when
   end-to-end count grows faster than unit count, or when suite time crosses a
   budget (say 10 minutes). Without a ratchet the pyramid drifts back within a
   quarter.

## Checks

- For every line now covered only by an end-to-end test, could a unit or
  integration test genuinely not reach it?
- Did total coverage or mutation score stay flat while suite time dropped?
- Does a newly added end-to-end test now require a written justification?

## Boundaries

This rebalances an existing suite; choosing the right layers for a fresh
project is testing-strategy's job. The 70/20/10 shape is a starting heuristic,
not a target to hit for its own sake: a data pipeline or a UI-heavy app will
sit somewhere else and that can be correct.

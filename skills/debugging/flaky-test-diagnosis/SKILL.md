---
name: flaky-test-diagnosis
description: Turn a test that fails at random into one that fails on demand by controlling the seed, order, and clock. Use when a test passes on re-run, fails only in CI, or blocks a merge for reasons no one can reproduce.
---

# Flaky test diagnosis

A flaky test is a test whose result depends on something it does not
control: a random seed, another test's leftovers, the wall clock, or thread
timing. The trap is re-running until it passes and calling it fixed, which
just hides the same nondeterminism from the next person. The job is to seize
the hidden variable until the failure becomes reliable, then remove it.

## Method

1. **Reproduce the failure in a tight loop first.** Run the single test
   hundreds of times: `pytest --count=500 path::test`, `go test -run X
   -count=500`, or a shell loop until it fails. A flake you can trigger 1 in
   50 locally is debuggable; one you only see in CI needs the environment
   pinned before anything else.
2. **Pin the random seed and read what it was.** Frameworks randomize:
   capture and print the seed on failure, then replay it. `pytest
   -p randomly --randomly-seed=<n>`, a fixed `random.seed(n)`, or
   `Random(n)` in the test. A failure that reproduces under one seed is a
   data-dependent bug, not cosmic flakiness.
3. **Shuffle and isolate test order.** Order-dependent flakes come from
   shared state one test leaves for another: a mutated global, an unclosed
   connection, a row not rolled back. Run the suite shuffled
   (`pytest-randomly`, `go test -shuffle=on`) to expose it, then run the
   suspect test alone; if it passes alone but fails in the suite, hunt the
   leaked state.
4. **Freeze the clock and time zone.** Tests that read `now()` fail at
   midnight, month ends, or on a slow machine where a timeout expires. Inject
   a fixed clock (`freezegun`, `libfaketime`, `Clock` injection) and set
   `TZ`. Replace real `sleep`-and-poll waits with deterministic waits on a
   condition, never a bare timeout tuned to a fast laptop.
5. **Quarantine external and timing dependencies.** Network calls, real
   filesystems, and unordered concurrency each add nondeterminism. Stub the
   network, use a temp dir per test, and await completion rather than
   sleeping. If concurrency is the source, the race-conditions skill applies
   to the code under test, not the test itself.
6. **Prove it with the same loop, then re-enable randomness.** The loop from
   step 1 must pass a long run with the fix in place. Only then remove the
   pinned seed and fixed order so the test guards real variation again. A
   test kept green only by freezing every input has stopped testing.

## Litmus tests

- Under one captured seed and fixed order, does the failure reproduce every
  run?
- Does the test pass alone and fail in the suite, or fail both ways?
- After the fix, does a 500-iteration shuffled loop stay green?

## Boundaries

Some flakiness is the code under test being genuinely nondeterministic
(unsynchronized threads, ordering assumptions on a hash map); fix the code,
not the test. Skipping or retrying a flake is a stopgap that hides real
races, and it belongs behind a tracked ticket, not in the merged suite.

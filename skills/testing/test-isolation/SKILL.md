---
name: test-isolation
description: Make tests order-independent by resetting state, banning shared globals, and giving each worker its own resources. Use when tests pass in one order but fail when reordered, sharded, or run in parallel.
---

# Test isolation

A suite that passes in order and fails when shuffled is hiding coupling: one
test leaves state a later one quietly depends on. It shows up as the failure
that vanishes on rerun and the test that only passes with the whole suite
around it. Isolation means each test builds its own world and tears it down, so
neither order nor parallelism can change the result.

## Method

1. **Randomize order in CI and treat a break as a bug.** Turn on
   pytest-randomly, RSpec `--shuffle`, or Go's default ordering, and fix any
   order-dependent failure at the source rather than pinning a lucky seed. The
   failing seed reproduces it exactly.
2. **Reset every mutable global in teardown, or remove it.** Module caches,
   singletons, registered handlers, and environment variables outlive a test.
   Restore them in a fixture that runs even on failure (`addCleanup`, `finally`),
   or inject the dependency so no global exists to reset.
3. **Give each test its own database state via rollback.** Wrap the test in a
   transaction rolled back at teardown, or truncate the tables it touched. Never
   rely on tests running in an order that happens to leave the rows clean for
   the next.
4. **Isolate the filesystem and the clock per test.** Write only to a per-test
   temp directory (`tmp_path`, `mktemp`), never a fixed path in the repo, and
   pin time inside the test so a frozen clock cannot leak into its neighbor. For
   time control, defer to mocking-time.
5. **Make parallel safe: no shared mutable resource across workers.** Give each
   xdist worker its own schema keyed on `worker_id`, its own temp dir, and a
   unique port. Two workers writing the same filename or binding the same port
   is the classic parallel flake.
6. **Stub the network and seed randomness in the test body.** A test hitting a
   live service is order-dependent by definition; intercept it so each test
   controls its own responses, and seed RNGs locally rather than once at import.

## Signals

- Does the suite pass under pytest-randomly across several different seeds?
- Can you run any single test alone, from a clean checkout, and have it pass?
- Does doubling the worker count stay green, or surface filename and port
  clashes?

## Boundaries

This targets flakiness from shared state and order, not races in genuinely
concurrent code, which concurrency-testing covers, nor the budgeting of
irreducible flakes, which is test-flakiness-budget. A few tests legitimately
share an expensive read-only fixture; keep that data immutable and isolate each
test's writes within it rather than around the whole environment.

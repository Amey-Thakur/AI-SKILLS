---
name: test-isolation
description: Make tests order-independent by resetting state, banning shared globals, and giving each worker its own resources. Use when tests pass in one order but fail when reordered, sharded, or run in parallel.
---

# Test isolation

A suite that passes only in a fixed order is lying about which tests work. One
test mutates a module global, seeds a row, or sets the clock, and the next test
passes by accident on that residue. The moment you shard, parallelize, or
reorder, the accident evaporates and you get failures nobody can reproduce.
Isolation makes each test start from nothing and leave nothing behind.

## Method

1. **Randomize order in CI and fix what breaks.** Run pytest-randomly or Jest's
   randomized order so an order dependency fails loudly and early. A test that
   only passes at position N has hidden shared state, and the seed in the failure
   output reproduces it exactly.
2. **Reset every mutable global in teardown, or remove it.** Module caches,
   singletons, registered handlers, and environment variables outlive a test.
   Restore them in a fixture with `finally` or `addCleanup`, or better, inject
   the dependency so there is no global to reset.
3. **Give each test its own database state via rollback.** Wrap the test in a
   transaction rolled back at teardown, or truncate the tables it touched. Never
   depend on tests running in an order that happens to leave the DB clean for the
   next one.
4. **Isolate the filesystem and the clock.** Write to a per-test temp dir
   (`tmp_path`, `mktemp`), never a shared path in the repo. Freeze time with
   freezegun or an injected clock so a test neither reads real `now()` nor leaks
   a frozen clock into its neighbor.
5. **Make it parallel-safe: no shared mutable resource across workers.** Give
   each xdist worker its own schema (keyed on `worker_id`), its own temp dir, and
   a unique port. Two workers writing the same fixed filename or binding the same
   port is the classic parallel flake.
6. **Seed randomness and stub external calls inside the test.** Seed RNGs in the
   test body, not once at import, and fake network and time so no test shares a
   live connection or a cached token. A test hitting a shared live service is
   order-dependent by definition.

## Signals

- Does the full suite pass with `-p randomly` and again under a different seed?
- Can you run any single test alone, from a clean checkout, and have it pass?
- Does doubling the worker count stay green, or surface filename and port clashes?

## Boundaries

This concerns state between tests, not which collaborators to replace: that
belongs to test-doubles. Some end-to-end tests legitimately share an expensive
fixture, so isolate their data within it rather than the whole environment.
Chasing one specific order-dependent flake is flaky-test-diagnosis territory.

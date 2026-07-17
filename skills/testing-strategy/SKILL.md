---
name: testing-strategy
description: Decide what to test, at which level, and what to skip, so tests catch real regressions without freezing the design. Use when writing tests or planning coverage for a change.
---

# Testing strategy

Tests exist to let you change code without fear. A suite that blocks
refactoring or passes while the product is broken has failed at its one job.

## Method

1. **Test behavior, not implementation.** Assert what the caller observes , 
   return values, emitted events, stored rows, rendered text: never private
   internals or call sequences. The test that breaks on a faithful refactor
   is a bug in the test.
2. **Spend tests where the risk is.** Rank the change's code paths by
   (likelihood of being wrong) × (cost when wrong), and test from the top.
   Parsing, money, permissions, concurrency, and anything with an off-by-one
   opportunity outrank getters forever.
3. **Choose the cheapest level that catches the failure:**
   - *Unit* for pure logic and edge-case matrices: milliseconds, no mocks
     needed when the logic is genuinely pure.
   - *Integration* for the seams: real database, real serialization, real
     filesystem. Most production bugs live at seams; a mock at every seam
     tests your assumptions about a dependency, not the dependency.
   - *End-to-end* for the handful of flows whose breakage is an incident:
     keep them few, stable, and ruthlessly maintained.
4. **Name the case, cover the edges.** A good test name states the rule:
   `rejects_expired_token`, `merges_consecutive_same_role_turns`. For every
   happy path, ask: empty input, one item, maximum size, duplicate, wrong
   type, failure of the dependency. Each answered with a test or a written
   reason it cannot happen.
5. **One behavior per test.** Shared setup is fine; shared assertions are
   not. When `test_everything` fails, nobody knows what broke.
6. **A regression gets a test that fails without the fix**: before or with
   the fix, never "later". It is the only test guaranteed to be about a real
   bug.

## What not to test

Framework behavior, language features, third-party libraries, trivial
delegation, and anything a type checker already proves. Deleting a
worthless test is a contribution.

## Litmus tests

- Would this suite catch the last three real bugs this area had?
- Can you rename every private function without touching a test?
- Does the suite run fast enough that people run it before pushing, not
  instead of pushing?

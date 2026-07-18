---
name: test-maintenance
description: Refactor test code with the same care as production: extract helpers, remove duplication, and delete tests that no longer earn their place. Use when the test suite has become slow to change, repetitive, or full of tests nobody trusts.
---

# Test maintenance

Test code is production code with a longer memory: it outlives features and
gets read far more than it is written. Left untended it accretes copy-pasted
setup, tests that assert nothing, and duplicates that all break together on one
change. Maintaining it means the same moves you make in application code, plus
one nerve most people lack: deleting a test that has stopped paying for its
runtime.

## Method

1. **Extract setup into named builders, not shared mutable state.** Replace
   repeated arrange blocks with a factory or builder
   (`makeUser({suspended: true})`) that returns fresh objects. Avoid a shared
   `setUp` that mutates instance fields across tests, which couples them and
   breeds order-dependent flakiness.
2. **Dedupe the assertion, keep the intent visible.** Pull a repeated
   multi-line check into a custom matcher or a helper
   (`assertValidInvoice(inv)`), but leave the input and the expected outcome in
   the test body. A test whose meaning now lives entirely in a helper is
   unreadable at the call site.
3. **Delete tests that no longer earn their runtime.** Remove tests that assert
   a deleted feature, duplicate another test's coverage exactly, or only
   restate the implementation. Confirm the deletion is safe with a coverage or
   mutation run: if killing the test does not drop either number, it was not
   pulling weight.
4. **Fix or quarantine flaky tests on sight, never retry blindly.** A test that
   fails intermittently is worse than no test: it trains the team to ignore
   red. Diagnose the nondeterminism (time, ordering, shared state), fix it, or
   move it to a quarantined lane with an owner and a deadline rather than
   wrapping it in a retry.
5. **Refactor tests and production in separate commits.** When you change both,
   commit the test refactor while behavior is green first, then the behavior
   change. Mixing them means a red suite cannot tell you whether the refactor or
   the feature broke.
6. **Keep one behavior per test and one reason to fail.** Split a test that
   guards several behaviors so a failure names one cause. Rename tests whose
   description drifted from what they now check, since a lying test name costs
   more than no name.

## Signals

- Does changing one production behavior break exactly the tests about that
  behavior, and no unrelated others?
- Can you delete a test and immediately tell from coverage or mutation whether
  it mattered?
- Is there a flaky test currently failing that everyone has silently agreed to
  ignore?

## Boundaries

This keeps an existing suite healthy; it does not decide the initial mix of
tests, which is testing-strategy, or how to design a single test, which is
unit-test-design. Deleting a test is a judgment call: when coverage cannot tell
you whether it matters, keep it and ask a reviewer.

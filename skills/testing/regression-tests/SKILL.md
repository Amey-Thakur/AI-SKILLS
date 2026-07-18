---
name: regression-tests
description: Pin every fixed bug with a test that fails before the fix and passes after, kept beside the code it guards. Use when closing a bug so the same defect cannot return silently through a later refactor or merge.
---

# Regression tests

A bug you fixed without a test is a bug you will fix again. The same edge case
returns after a refactor, a merge, or a well-meaning cleanup, and nobody notices
because nothing was watching that exact behavior. The discipline is small and
non-negotiable: before you touch the fix, write the test that reproduces the bug
and watch it fail.

## Method

1. **Reproduce the bug as a failing test before the fix.** Turn the report into
   the smallest test that fails against the current, buggy code, and run it to
   confirm red. If you cannot make it fail first, you do not yet understand the
   bug well enough to fix it.
2. **Assert the behavior, not the stack trace.** Pin the correct output for the
   triggering input, `assert refund(-5) raises ValueError`, not the internal that
   happened to throw. The test must stay meaningful after you change how the fix
   works inside.
3. **Name the test for the defect and link the issue.** Use
   `test_refund_rejects_negative_amount_issue_1423` or a docstring with the
   ticket. When it fails in two years, the next reader should learn which
   real-world break it guards without archaeology.
4. **Watch it go green on the fix, and only the fix.** Apply the change, confirm
   the new test passes and none others break. If the test also passed before your
   change, it does not cover this bug: sharpen the input until it pins the actual
   defect.
5. **Reduce to the minimal triggering input.** Strip the reproducer to the
   smallest data that still fails: one field, one row, one byte. A three-line
   regression test survives refactors, while a replay of a 2 MB production payload
   rots and gets deleted.
6. **Keep the test with its feature, not in a junk drawer.** File it beside the
   unit tests for the code it protects, so it runs in the same fast tier and
   stays discoverable. A `regressions/` graveyard nobody reads is where these go
   to be skipped.

## Litmus tests

- Did the test fail before the fix and pass after, both confirmed by running it?
- Does the test name or comment tell the next reader what bug it prevents?
- Is the reproducer the smallest input that still triggers the defect?

## Boundaries

This pins known, fixed bugs; finding unknown ones is the work of
property-based-testing and fuzz-testing. A regression test does not substitute
for understanding the root cause, and a flaky reproducer belongs in
flaky-test-diagnosis before it is pinned. Follow the suite's existing layout for
where the test file lives.

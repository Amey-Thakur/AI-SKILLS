---
name: regression-tests
description: Pin every fixed bug with a test that fails before the fix and passes after, kept beside the code it guards. Use when closing a bug so the same defect cannot return silently through a later refactor or merge.
---

# Regression tests

A bug you fix without a test is a bug you will fix again. The same edge case
returns after a refactor, a merge, or a well-meaning cleanup, and nobody notices
because nothing was watching that exact behavior. The discipline is small and
non-negotiable: before you touch the fix, write the test that reproduces the
bug and watch it fail for the real reason.

## Method

1. **Reproduce the bug as a failing test first.** Turn the report into the
   smallest test that fails against the current, buggy code, and run it to
   confirm red. A test you cannot make fail on the broken code proves nothing
   about your fix.
2. **Assert user-visible behavior, not the stack trace.** Pin the correct
   output for the triggering input: `assert refund(-5) raises ValueError`, not
   the internal frame that happened to throw. The test must stay meaningful
   after you change how the fix works inside.
3. **Use the real triggering input, minimized.** Take the actual data from the
   bug report and strip it to the smallest case that still fails: one field, one
   row, one byte. A three-line reproducer survives refactors; a replay of a 2 MB
   production payload rots and gets deleted.
4. **Name the test for the defect and link the issue.** Use
   `test_refund_rejects_negative_amount_issue_1423` or a docstring with the
   ticket, so a reader two years out learns which real break it guards without
   archaeology and does not delete it as redundant.
5. **Watch it go green on the fix, and only the fix.** Apply the change, confirm
   the new test passes and nothing else breaks. If the test also passed before
   your change, it does not cover this bug: sharpen the input until it pins the
   actual defect.
6. **Place it at the lowest level that reproduces, beside its feature.** If a
   unit test triggers the bug, do not write it as end-to-end; cheaper tests run
   more often. File it with the unit tests for the code it protects, not in a
   `regressions/` graveyard nobody reads.

## Litmus tests

- Did the test fail before the fix and pass after, both confirmed by running it?
- Does the assertion describe behavior a user sees rather than an internal frame?
- Could a reader find the original bug report from the test's name or comment?

## Boundaries

This pins known, fixed bugs; finding unknown ones is the work of
property-based-testing and fuzz-testing. When a bug reveals a whole class of
inputs is mishandled, a property may guard it better than one example. A
regression test does not substitute for understanding the root cause. Follow the
suite's existing convention for where the file lives.

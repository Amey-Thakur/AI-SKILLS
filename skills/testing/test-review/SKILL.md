---
name: test-review
description: Review tests with the same rigor as production code, checking that assertions truly constrain behavior, that error and edge cases exist, and that no safety was quietly deleted. Use when reviewing a pull request that adds, changes, or removes tests.
---

# Test review

Tests get waved through review because they are "just tests," and that is
exactly how a suite fills with cases that pass no matter what the code does. A
weak assertion, a mock that verifies itself, or a safety check deleted to make
a build green all look green and prove nothing. Review a test by asking one
question relentlessly: would this fail if the code were wrong?

## Method

1. **Find the assertion and weigh it.** A test with no assert, one that ends in
   `assertTrue(true)`, or one that only checks a value is not null is theater.
   The assertion must pin the specific behavior the test name claims to cover.
2. **Mutate the code in your head.** Picture the off-by-one, the flipped
   comparison, the skipped branch. If the test still passes under that
   mutation, it does not cover what its name says. Run mutation testing
   (Stryker, mutmut, PIT) on the risky files to make this concrete.
3. **Hunt the missing cases.** A test for the success path with no error path,
   no empty input, and no boundary value is half a test. Ask specifically for
   the null, the zero, the duplicate, and the failure the code is supposed to
   handle.
4. **Read deletions and weakenings closely.** A diff that loosens an assertion,
   widens an expected range, or removes a case to make CI pass is deleting
   safety, not fixing a test. Make the author justify every relaxed check
   against the behavior it used to guard.
5. **Reject tests that assert on the mock.** Verifying that a mock was called
   with the arguments you just fed it tests the setup, not the code. Prefer
   asserting on the observable result or state change over `verify(mock)`
   restating the stub.
6. **Confirm the test has failed at least once.** Ask whether the author saw it
   red before green. A test that has never failed might be passing for the
   wrong reason, coupled to incidental data rather than the behavior under
   test.

## Checks

- For each new test, can you name the single production bug it would catch?
- Does any assertion in the diff get weaker, and is that change justified in
  words?
- Would the test fail on an implementation that is subtly wrong, not just
  entirely absent?

## Boundaries

This is reviewing tests as artifacts. Writing the assertions well in the first
place is unit-test-design, choosing what to cover at all is testing-strategy,
and measuring fault-catching power quantitatively is mutation-testing. Defer to
the project's review conventions for scope and tone rather than blocking on
personal style.

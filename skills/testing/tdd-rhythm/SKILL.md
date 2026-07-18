---
name: tdd-rhythm
description: Run red-green-refactor honestly with the smallest failing test first, refusing test-after backfill dressed up as TDD. Use when building code with a clear behavioral spec and you want the tests to drive the design.
---

# TDD rhythm

Test-driven development is a rhythm, not a ritual you perform for the commit
log. The value comes from writing the test first and watching it fail for the
right reason, which forces you to state the behavior before you build it.
Writing the code first and backfilling tests that pass on the first run is
theater: those tests echo the code's own mistakes and are blind to what it got
wrong.

## Method

1. **Red: write the smallest test that fails for a missing behavior.** One
   assertion about one new capability, `assert total(empty_cart) == 0` before
   any pricing logic exists. Small steps keep the feedback tight and the design
   honest.
2. **Confirm the failure is the one you expect.** A `NameError` or import error
   is a broken test, not a red bar. Drive to a real assertion failure, "expected
   0, got None", so you know the test exercises the behavior and will later pass
   for the right reason.
3. **Green: write the least code that makes it pass.** A hardcoded return is
   allowed here. The point is to close the loop and prove the test can pass; you
   earn generality by adding the next failing test, not by guessing ahead.
4. **Refactor only on green.** With the bar green, remove duplication, rename,
   and extract, running the suite after each change. No new behavior enters
   during a refactor; a new case is a fresh red test first, so you never mix "is
   it broken" with "is it messy".
5. **Take small steps: one test, one reason to change.** Keep each cycle to
   minutes. If you are writing five tests before any code, or a hundred lines to
   pass one assertion, the step is too big and the tight loop is already gone.
6. **Never backfill test-after and call it TDD.** Code first, then tests that
   mirror it, yields assertions that describe what the code does, not what it
   should do. If a test must come after, prove it can fail by breaking the code
   once, and do not fake a red-green history that never happened.

## Litmus tests

- Did you watch every test fail, for the intended reason, before making it pass?
- Is each cycle small enough that the last green state is only minutes behind?
- Do the tests describe required behavior, or merely echo the current code?

## Boundaries

TDD suits code with a behavioral spec you can state as a test. Exploratory
spikes where you do not yet know the interface are better thrown away and
rebuilt test-first, not forced through the loop. The rhythm does not replace
integration-testing or higher-level checks. To grade whether the resulting tests
actually catch bugs, defer to mutation-testing.

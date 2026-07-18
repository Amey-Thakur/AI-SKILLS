---
name: tdd-rhythm
description: Run the red-green-refactor loop honestly with the smallest failing test first, refusing test-after backfill dressed up as TDD. Use when building code with a clear behavioral spec and you want the tests to drive the design.
---

# TDD rhythm

Test-driven development is a rhythm, not a ritual you perform for the commit
log. The value comes from writing the test first and watching it fail for the
right reason, which forces you to state the behavior before you build it.
Writing tests after the code and backdating the story is theater: it yields
tests shaped like the code's own mistakes, blind to what the code got wrong.

## Method

1. **Red: write the smallest test that fails for a missing behavior.** One
   assertion about one new capability. Run it and read the failure: it must fail
   because the behavior is absent, not because of a typo or an import error. A
   test that passes on the first run told you nothing.
2. **Confirm the failure is the one you expect.** A `NameError` is not a red bar,
   it is a broken test. Drive to a real assertion failure, "expected 3, got
   None", so you know the test exercises the behavior and will later pass for the
   right reason.
3. **Green: write the least code that makes it pass.** A hardcoded return is
   allowed here. The point is to close the loop fast and prove the test can pass.
   Resist implementing the general case now: the next failing test will force it
   out of you.
4. **Refactor with the bar green, changing structure not behavior.** Now remove
   duplication, rename, and extract with the test as a safety net. No new
   behavior enters during a refactor; if you need a new case, that is a fresh red
   test first.
5. **Take small steps: one test, one reason to change.** Keep each cycle to
   minutes. If you are writing five tests before any code, or a hundred lines to
   pass one assertion, the step is too big and the tight feedback loop is already
   gone.
6. **Do not backfill test-after and call it TDD.** Code first, then tests that
   mirror it, produces assertions that echo what the code does rather than what
   it should do. If tests must come after, review them against the spec, not the
   implementation, and never fake a red-green history that never happened.

## Litmus tests

- Did you watch every test fail, for the intended reason, before making it pass?
- Is each cycle small enough that the last green state is only minutes behind?
- Do the tests describe required behavior, or merely echo the current code?

## Boundaries

TDD suits code with a clear behavioral spec. Exploratory spikes and throwaway
prototypes are often faster explored first, then covered once the design
settles. The loop does not replace integration-testing or higher-level checks.
Red-green-refactor is a design tool as much as a testing one: where it stops
earning its keep, stop performing it.

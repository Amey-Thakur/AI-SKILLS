---
name: coverage-strategy
description: Read coverage as a map of untested risk to guide where tests go next, rather than enforcing a percentage target. Use when deciding what to test next or when a team is tempted to mandate a coverage number.
---

# Coverage strategy

Coverage is a good flashlight and a terrible scoreboard. Aimed at the code, it
shows which branches no test has ever run, which is real information. Turned
into a target, it corrupts: people write assertion-free tests that execute lines
without checking anything, and 90 percent certifies nothing. Use the number to
ask questions about risk, not to answer them.

## Method

1. **Measure branch coverage, not just line coverage.** Run
   `pytest --cov --cov-branch` or `coverage run --branch`. Line coverage counts a
   half-tested `if` as covered; branch coverage exposes the untaken else, which
   is exactly where the unhandled case usually hides.
2. **Read the report as a map of risk, not a grade.** Open the HTML report and
   look at what is red: an error path, a retry, a validation branch. A missed
   branch in a payment refund is a finding worth a test; one in a debug log is
   noise worth ignoring.
3. **Gate on diff coverage, not total coverage.** Enforce coverage on changed
   lines with diff-cover or a Codecov patch status, so new code arrives tested
   without demanding a heroic sprint over legacy nobody is touching. A total-
   percentage gate punishes whoever edits an old file.
4. **Never chase 100 percent; mark the deliberate gaps.** Generated bindings,
   trivial getters, and `__repr__` are not worth testing. Exclude them with a
   deliberate `# pragma: no cover` so the remaining number reflects code that
   genuinely should be covered.
5. **Distrust high coverage with weak assertions.** A line runs green while
   asserting nothing. Spot-check with mutation testing (mutmut, Stryker): if
   flipping `>` to `>=` leaves the suite green, that covered line is executed but
   not tested.
6. **Track the trend on touched code, not the headline digit.** Watch whether
   coverage on new and changed files holds steady over time. A slow decline
   signals tests being skipped under deadline; one absolute percentage tells you
   almost nothing.

## Signals

- For each red branch, can you name the input that exercises it and decide
  whether it is worth a test?
- Does your gate fire on new untested code while staying quiet about untouched
  legacy?
- Would a mutation in a covered line actually fail a test, or merely run?

## Boundaries

Coverage measures execution, not correctness: it cannot tell you the assertion
was right or the case was worth testing, and it says nothing about concurrency
or integration seams. Use it to find gaps, then let testing-strategy and human
judgment decide which gaps to close. Whether covered code is truly tested is a
question for mutation testing.

---
name: coverage-strategy
description: Read coverage as a map of untested risk that steers the next test, rather than enforcing a percentage target. Use when deciding what to test next or when a team is tempted to mandate a coverage number.
---

# Coverage strategy

Coverage is a good flashlight and a terrible scoreboard. Aimed at the code, it
shows which branches no test has ever run, which is real information. Turned
into a target, it rots: people write assertion-free tests that execute lines
without checking anything, the number climbs, and the software stays fragile.
Read it the other way, as a map of where untested risk sits.

## Method

1. **Measure branch coverage, not just lines.** Run `pytest --cov --cov-branch`
   or `coverage run --branch`. Line coverage calls an `if` with only its true
   arm tested fully covered; branch coverage exposes the untaken else, which is
   exactly where the unhandled case usually hides.
2. **Read the report by file, not by headline percent.** Open the HTML report
   and scan for high-risk files sitting low: auth, money, parsing, error paths.
   A red branch in a refund path is a finding worth a test; one in a debug log
   is noise worth ignoring. The aggregate number hides both.
3. **Rank gaps by blast radius, then write top-down.** An uncovered branch in
   the payment flow outranks an uncovered getter. Order the red spots by how
   much breaks if they are wrong and how often the code runs.
4. **Gate on diff coverage, not a global floor.** Enforce coverage on changed
   lines with diff-cover or a Codecov patch status, so new code arrives tested
   without demanding a heroic sprint over legacy nobody is touching. A repo-wide
   percentage gate punishes whoever edits an old file.
5. **Reject coverage that comes without an assertion.** A test that calls code
   and checks nothing turns lines green while proving nothing. Catch it in
   review, and confirm the tests actually bite with mutation-testing: if
   flipping `>` to `>=` leaves the suite green, that covered line is run but not
   tested.
6. **Exclude the deliberately untested so real gaps show.** Mark generated
   bindings, trivial getters, and unreachable defensive branches with
   `# pragma: no cover`, so the remaining number reflects code that genuinely
   should be covered.

## Litmus tests

- Can you name the three riskiest files under 60 percent branch coverage now?
- Does your gate fire on new untested code while staying quiet about untouched
  legacy?
- Would a mutation in a covered line actually fail a test, or merely run?

## Boundaries

Coverage measures execution, never whether the assertion was right or the case
worth testing, and it says nothing about concurrency or integration seams. Use
it to find gaps, then let testing-strategy and human judgment decide which to
close. Whether covered code is truly tested is mutation-testing's question, and
the strength of the assertions themselves is test-review's.

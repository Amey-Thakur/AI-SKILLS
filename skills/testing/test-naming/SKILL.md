---
name: test-naming
description: Name tests as full behavior sentences so the suite reads as a specification of what the system guarantees. Use when naming a new test or renaming vague tests like test1 or testWorks.
---

# Test naming

A test name is read far more often than the test body: in run output, in
failure reports, in the file's table of contents when someone scans for the
rule that broke. A name like `testUser` or `test_process_2` forces the reader
into the body to learn what happened, and a red bar of such names says
nothing. Names that read as sentences turn the suite into a specification you
can audit without opening a single test.

## Method

1. **Name the behavior, not the method under test.** Prefer
   `withdrawing_more_than_balance_is_rejected` over `testWithdraw`. The method
   name already sits on the stack trace, so spend the test name on the rule
   the method must obey.
2. **State condition and expected result together.** Follow a
   `condition_then_outcome` shape: `expired_token_returns_401`,
   `empty_cart_shows_zero_total`. Both halves carry weight, a name with only
   the input or only the result leaves the reader guessing.
3. **Pick one convention and hold it.** snake_case sentences in Python and
   Ruby, backtick strings in Kotlin and Swift, `describe`/`it` phrases in
   Jest. Mixing styles across one suite reads as noise, so match the file you
   are editing.
4. **Ban placeholder and outcome-free names.** `test1`, `testWorks`,
   `happy_path`, and `edge_case` name nothing. If you cannot describe the
   behavior in the name, you do not yet know what the test asserts.
5. **Let the failure line stand alone.** When CI prints
   `refund_to_closed_account_is_reversed FAILED`, the reader should know the
   broken rule without the source. Scan your names as a flat list and check
   each still makes sense stripped of its class.
6. **Vary the noun, not just the verb.** Twenty `test_valid_*` names hide
   which case failed. Name the distinguishing input: `negative_quantity`,
   `unicode_name`, `leap_day`, so the list doubles as an index of the cases
   you cover.

## Signals

- Read only the test names in a file: do they list the rules the unit
  guarantees, roughly in order?
- Does a single failing name tell a triager which behavior regressed before
  they open the code?
- Could a new teammate guess each test's body from its name and be right?

## Boundaries

Naming does not decide what to test or how to structure the body: pair this
with unit-test-design for shape and testing-strategy for coverage. When a
framework or team imposes a naming pattern, that convention outranks the
templates here.

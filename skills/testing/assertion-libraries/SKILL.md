---
name: assertion-libraries
description: Pick an assertion style and write checks that fail with a message you can diagnose without a debugger. Use when test failures read as "expected true, got false" and you cannot tell what actually broke.
---

# Assertion libraries

An assertion is where a test states what it expects, and its output is the
first thing you read when it fails. A bare `assert result` prints "false" and
tells you nothing; a good assertion prints the expected value, the actual
value, and enough of the surrounding structure to locate the divergence. The
library and style you choose largely decide which of those two failures you get.

## Method

1. **Prefer expressive matchers over boolean asserts.** Reach for an assertion
   that captures both sides: `assertThat(actual).isEqualTo(expected)`,
   `expect(x).toEqual(y)`, `result.should.equal(...)`. On failure these print a
   structured diff; a hand-rolled `assert a == b` prints only the line, not the
   values.
2. **Assert the specific property, not a coarse truth.** `expect(list)`
   `.toContain(x)` and `assertThat(user.name).isEqualTo("Ada")` fail with a
   precise message. `assert x in list` reduced to a boolean throws away the
   values, so wrap the value, not the comparison result.
3. **Use deep and structural matchers for objects and collections.** Compare
   whole structures with `toEqual` or `isEqualTo` deep equality and pick out
   fields with matchers (`objectContaining`, `hasItem`, AssertJ extracting) so
   the failure shows which field of which element differs, not just "objects
   not equal".
4. **Keep one logical assertion per test, or group them.** A test that checks
   six unrelated things stops at the first failure and hides the rest. Split
   them, or use a soft-assertion block (`SoftAssertions`, `expect.soft`) that
   reports every failure in one run when the checks genuinely belong together.
5. **Write custom matchers for domain concepts.** When you repeatedly assert the
   same shape, define a matcher (`toBeValidOrder`, a Hamcrest
   `TypeSafeMatcher`) so the test reads in domain terms and the failure message
   speaks that language instead of dumping raw fields every time.
6. **Assert on errors by type and message, not just that something threw.** Use
   `assertRaises(ValueError, match="negative amount")` or
   `expect(fn).toThrow(/negative/)` so a test cannot pass on the wrong
   exception. Catching bare `Exception` hides the case where the code failed for
   an unrelated reason.

## Litmus tests

- From a failure message alone, without opening the test, can you tell what
  value was wrong?
- Does an equality failure on an object show a field-level diff, not "not
  equal"?
- Does an error assertion pin the exception type and message, so a different
  failure would not pass it?

## Boundaries

This is about assertion style and readable failures, not what to assert, which
is a design question the test's purpose answers. Snapshot assertions are a
distinct trade-off with their own failure mode. Stay with the assertion library
a project has adopted rather than mixing three dialects in one suite.

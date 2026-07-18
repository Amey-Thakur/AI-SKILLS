---
name: unit-test-design
description: Write unit tests that document behavior through explicit arrange-act-assert phases and a single assertion of intent. Use when writing or repairing a unit test that has grown hard to read.
---

# Unit test design

A unit test is documentation that runs: it names a rule, shows the inputs
that trigger it, and pins the result so a change cannot pass unnoticed. When
one test sets up state between assertions, calls the system three times, or
checks six unrelated fields, a failure points nowhere and the reader learns
nothing. Shape each test so the behavior it guards is visible at a glance.

## Method

1. **Separate arrange, act, and assert with a blank line each.** Arrange
   constructs inputs and the object under test, act is the one call you are
   exercising, assert pins the outcome. If the three blocks do not stand
   apart on screen, the test is carrying more than one behavior.
2. **Make act a single invocation.** The behavior under test is one call:
   `total = invoice.total()`. Needing two calls to reach the assertion means
   you are testing a sequence, so name it that way or split it in two.
3. **Assert one intent, not one line.** A test called `applies_bulk_discount`
   checks the discount and nothing else. Compare a whole result object when
   the fields express the same claim, and move unrelated claims, the
   timestamp, the audit log, into their own tests.
4. **Keep computation out of the test.** Write the literal `42`, never
   `qty * price`. A test that recomputes the expected value with the same
   formula as the code passes whenever both share the same bug.
5. **Build inputs with named factories.** A helper such as
   `an_order(status="shipped")` states the field that matters and defaults
   the rest, so the one variable under test is not buried in a valid object.
6. **Cover the behavior's edges as separate cases.** For the rule at hand add
   empty, single, many, boundary, and the failure path with an explicit
   `assertRaises` or `expect().toThrow`, each as its own named test rather
   than one parametrized block that reports a single pass.

## Litmus tests

- From the test name and assert block alone, can you state the rule without
  reading the arrange phase?
- On failure, does the message name one broken behavior instead of diffing a
  twelve-field object?
- Could you delete the implementation and rebuild its spec from the test
  names and assertions?

## Boundaries

This governs the shape of one unit test, not what to test or at which layer:
defer scope to testing-strategy and names to test-naming. Where a project
fixes an assertion library or factory style, follow it over the exact forms
shown here.

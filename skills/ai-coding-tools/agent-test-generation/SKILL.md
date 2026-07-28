---
name: agent-test-generation
description: Use an agent to write tests that check behaviour rather than restate the implementation, and verify they can actually fail. Use when adding coverage to existing code.
---

# Agent test generation

Agents produce tests quickly and default to tests that mirror the
implementation, which pass regardless of whether the code is correct.
The work is directing them toward behaviour and verifying the tests are
capable of failing.

## Method

1. **Ask for behaviour tests, not coverage.** Given this input, expect
   this output, rather than exercising every branch for its own sake
   (see unit-test-design).
2. **Specify the cases you care about.** Edge cases, boundaries, and
   error paths, since agents over-produce happy-path tests.
3. **Verify each test can fail.** Break the implementation deliberately
   and confirm the test catches it, which is the only proof it tests
   anything (see mutation-testing).
4. **Reject tests that assert the implementation.** Tests reproducing
   internal calls break on every refactor and prove nothing (see
   test-doubles).
5. **Keep tests readable.** Clear names and obvious arrangement, because
   a generated test nobody understands is deleted at the first failure.
6. **Do not let it change code to make tests pass.** That inverts the
   relationship, and any implementation change must be a deliberate
   separate decision.
7. **Review generated assertions carefully.** An agent can assert
   current behaviour that is itself the bug, freezing it in place.

## Boundaries

Generated tests encode current behaviour, which is only correct if
current behaviour is. Coverage is a weak proxy for quality (see
coverage-strategy). Tests for complex integration and concurrency need
human design (see concurrency-testing).

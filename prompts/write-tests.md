---
name: write-tests
description: Generate meaningful tests for given code, edge cases first, in the project's own style.
variables:
  - "{code}: the code under test"
  - "{framework}: the test framework and an example existing test if available"
settings: "Temperature 0-0.3."
---

Write tests for the code below using {framework}.

Method:
1. List the behaviors the code promises its caller (from its interface, not
   its internals). Then list the edge cases: empty, one, many, maximum,
   duplicate, wrong type, dependency failure.
2. Write one test per behavior/edge, named as the rule it pins
   (rejects_expired_token, merges_adjacent_ranges), assert on observable
   results only — no private internals, no call-count assertions unless the
   call IS the contract.
3. Match the style of the example test exactly: same setup pattern, same
   assertion library, same naming shape.

Rules:
- If a behavior cannot be tested without knowing something not shown (a
  fixture, a schema), write the test with a clearly named placeholder and
  list what is needed — never invent plausible-looking fixtures.
- Skip tests that only re-prove the language or framework.
- After the tests, one line each: any behavior you could NOT cover and why.

<code>
{code}
</code>

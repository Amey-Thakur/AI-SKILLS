---
name: write-integration-test
description: Write integration tests that exercise real boundaries and fail for real reasons rather than mirroring the implementation.
variables:
  - "{component}: what is being tested and which boundaries are involved"
  - "{behavior}: the behaviour that must hold, including failure cases"
settings: "Temperature 0.2-0.4."
---

Write integration tests for:

{component}

Required behaviour: {behavior}

Use the integration-testing and test-design skills, plus test-doubles for
what to fake.

Produce tests covering:
- The main path end to end across the real boundary.
- Failure of each dependency, and the expected behaviour.
- Boundary conditions in the data.
- Idempotency and retry safety where the operation can repeat.

For each test, state what breakage it would catch.

Rules: test observable behaviour, not internal calls. Fake only what is
genuinely outside the boundary under test. Every test must be able to
fail; if you cannot describe what would break it, it is not a test. Keep
setup readable, since unreadable tests are deleted at the first failure.

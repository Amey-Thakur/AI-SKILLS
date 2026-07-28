---
description: "Write integration tests that exercise real boundaries and fail for real reasons rather than mirroring the implementation."
argument-hint: "[component]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

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

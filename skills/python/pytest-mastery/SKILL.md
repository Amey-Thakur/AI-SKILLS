---
name: pytest-mastery
description: Structure pytest suites with fixtures, parametrize, and markers so tests stay fast, isolated, and readable. Use when writing Python tests or untangling a slow, fixture-heavy suite.
---

# Pytest mastery

Fixtures are dependency injection for tests: each test states what it needs,
pytest builds it, and scope controls how much is shared.

## Method

1. **Scope fixtures by cost, not convenience.** Default `function` scope for
   anything mutable; `session` scope only for expensive immutable resources
   (a container, a compiled artifact). A session-scoped mutable fixture is
   the classic source of order-dependent flakiness.
2. **Layer conftest.py by directory.** Repo-root conftest holds universal
   fixtures; each package's tests get their own conftest for local ones.
   Never import fixtures across test files; discovery through conftest is
   the mechanism.
3. **Parametrize instead of copy-pasting.**
   `@pytest.mark.parametrize("raw,expected", CASES, ids=str)` turns a table
   of cases into individual test items with readable names. Stack two
   parametrize decorators to get the cross product.
4. **Use markers as a vocabulary, registered in pyproject.** `slow`,
   `integration`, `requires_gpu`; select with `-m "not slow"` locally and
   run everything in CI. Unregistered markers are typos waiting to pass
   silently; set `--strict-markers`.
5. **Prefer tmp_path, monkeypatch, and capsys over hand-rolled setup.**
   `tmp_path` gives an isolated directory per test; `monkeypatch.setenv`
   and `.setattr` undo themselves; `capsys` asserts on output without
   redirecting streams manually.
6. **Assert one behavior per test, plainly.** Bare `assert` with pytest's
   rewriting gives rich diffs; `pytest.raises(ValueError, match="port")`
   pins the error and its message. If a test needs a comment to explain
   what it checks, its name is wrong.
7. **Keep the suite fast enough to run on every save.** Measure with
   `--durations=10`; push anything over a second behind a `slow` marker.
   `pytest -x --ff` (fail fast, failed first) is the debugging loop.

## Boundaries

- Do not mock what you own; restructure so the seam is a real interface.
  Mock only true externals (network, clock, randomness).
- Fixture chains deeper than three levels hide the arrange step; inline the
  setup or build an explicit builder function.

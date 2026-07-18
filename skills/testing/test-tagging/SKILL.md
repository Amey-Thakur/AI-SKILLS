---
name: test-tagging
description: Tag tests by speed and scope so CI can run the right slice at the right time. Use when the suite is one undifferentiated blob and you need fast feedback on pull requests without dropping slow coverage.
---

# Test tagging

When every test runs at once, the ten-millisecond unit tests wait behind the
ten-second browser tests, and a developer waits behind both for a typo fix.
Tagging gives each test a label for how fast and how broad it is, so the runner
can pull a fast slice for pre-merge feedback and the full set for nightly. The
discipline is a small, fixed vocabulary applied consistently, not a free-for-all
of ad hoc labels.

## Method

1. **Fix a small tag vocabulary and write it down.** Two axes cover most needs:
   speed (`fast` under ~100ms, `slow` above) and scope (`unit`, `integration`,
   `e2e`). Add at most one or two more (`external` for tests that hit a
   network, `smoke` for the release gate). More tags than that and nobody
   applies them consistently.
2. **Use the runner's native mechanism.** Apply pytest markers
   (`@pytest.mark.slow`), Go build tags, JUnit `@Tag`, or Jest project config.
   Native tags are selectable on the command line (`pytest -m "not slow"`) and
   fail loudly on a typo when you register them in config.
3. **Tag by measured cost, not by guess.** Run the suite with per-test timing
   (`pytest --durations=25`) and let the numbers assign `slow`. A test you
   assumed was fast because it looks small may spin up a container; the timing
   report, not intuition, decides the label.
4. **Map each CI stage to a tag selector.** Pre-merge runs `unit and not slow`
   for feedback in a couple of minutes; the merge queue adds `integration`;
   nightly runs everything including `e2e` and `external`. Each stage is one
   selector, so the split lives in config, not in scattered skip conditions.
5. **Enforce that new tests get tagged.** Add a lint or a collection-time hook
   that fails when a test has no scope tag, or default untagged tests into the
   slow lane so an unlabeled test never sneaks onto the fast path and blows the
   budget.
6. **Keep the fast lane honest with a time budget.** Assert the `fast` selection
   finishes under a hard ceiling (say 90 seconds) in CI. When it creeps over, a
   mislabeled test has crept in; find it with the durations report and retag or
   fix it.

## Checks

- Does running the fast lane have a single, memorable command every developer
  knows?
- Pick a random slow test: is it slow for a real reason, or mistagged?
- Does an untagged new test fail CI or land in the slow lane by default, never
  silently on the fast path?

## Boundaries

Tagging routes tests that already exist; it does not decide which tests to
write, which is testing-strategy. Parallelism and sharding are a separate lever
that composes with tags rather than replacing them. Keep the vocabulary aligned
with whatever the project already uses instead of inventing a parallel scheme.

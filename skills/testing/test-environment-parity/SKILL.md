---
name: test-environment-parity
description: Close the gaps between test and production by matching versions, data shape, and configuration paths so a passing suite actually predicts prod behavior. Use when tests are green but production breaks in ways staging never showed.
---

# Test environment parity

Every difference between where you test and where you run is a place a bug can
hide from the suite: a different database version, a smaller and cleaner
dataset, a config loaded from a hardcoded fixture instead of the path
production uses. The suite passes, production breaks, and the gap was
invisible because nothing measured it. Parity work is making those
differences small and known instead of large and surprising.

## Method

1. **Pin identical versions top to bottom.** Same language runtime, same
   database major and minor version, same library versions via a lock file,
   ideally the same container base image production ships. A test on Postgres
   14 does not vouch for behavior on Postgres 16.
2. **Load config through the production path.** Read settings from environment
   variables and the same secrets interface production uses, not a hand-built
   test config object. A bug in how config is parsed or defaulted only shows
   when tests exercise the real loader.
3. **Match the shape of the data, not just the schema.** Use a representative
   volume and distribution: an anonymized production snapshot or synthetic data
   with the same cardinality and skew. A query that flies over 100 clean rows
   can table-scan over 100 million real ones.
4. **Use the real infrastructure for the piece under test.** Test the cache
   against the actual cache engine and the queue against the actual broker. An
   in-memory substitute for the exact component you are validating hides its
   timeout, eviction, and ordering behavior.
5. **Reproduce production's environmental quirks.** Set the timezone to UTC,
   match the locale, mirror the same feature-flag defaults. These silent
   settings cause "works on my machine" failures that no logic test catches.
6. **Assert parity and track drift.** Add a CI check that compares runtime and
   dependency versions across environments and fails on divergence, and keep a
   written list of the gaps you knowingly accept so they stay decisions, not
   accidents.

## Checks

- Do test and production run the same database engine and major version?
- Is configuration loaded the same way in both, or does the test harness bypass
  it?
- Is the remaining prod-test gap written down and owned, or simply unknown?

## Boundaries

Parity reduces the surprises a suite cannot see; it does not replace verifying
under real load, which is testing-in-production. Provisioning the environments
themselves is a CI/CD and containerization concern, and matching data volume
for speed shades into performance testing. Full parity is rarely affordable:
the goal is to shrink and document the gaps that matter, not to clone
production.

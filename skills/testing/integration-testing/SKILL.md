---
name: integration-testing
description: Test the seams between modules with real dependencies where they are cheap and containerized ones where they are not. Use when verifying that components wired together honor the contracts unit tests assume in isolation.
---

# Integration testing

Unit tests prove each module works against its own assumptions. Integration
tests prove those assumptions match reality at the seams: the ORM writes the
column the code reads, the queue redelivers, the HTTP client parses the
vendor's error shape. Mock those seams and the suite stays green while
production fails at exactly the boundary nobody exercised. The craft is using
real dependencies without making the suite slow or flaky.

## Method

1. **Test one seam, not the whole app.** Pick a single boundary per test:
   code to database, service to service, handler to queue. A test that stands
   up everything to check one repository method is an end-to-end test wearing
   the wrong label.
2. **Use the real thing when it is cheap.** An in-process SQLite or an
   embedded HTTP server costs milliseconds and catches real serialization
   bugs. Reach for these before any container when the dependency has a
   lightweight real mode.
3. **Containerize the heavy, version-sensitive ones.** For Postgres, Kafka,
   or Redis, where behavior shifts by version, run the real image with
   Testcontainers so the test matches production's engine rather than a
   stand-in that lies about locking or JSON handling.
4. **Give each test a clean slate.** Run inside a transaction rolled back at
   teardown, or truncate and reseed per test. Shared mutable state across
   integration tests is the leading source of order-dependent failures.
5. **Fake only what you cannot run.** Third-party payment and email APIs stay
   behind contract-tested fakes or recorded interactions such as WireMock or
   VCR. Everything you can stand up locally, stand up for real.
6. **Keep the suite in its own tier.** Tag integration tests so `unit` stays
   sub-second on every save while integration runs on push or in CI. Blending
   the tiers trains people to skip the slow ones, and then all of them.

## Litmus tests

- Would this test have caught a migration that renamed a column the code
  still reads?
- Does each test target one seam, so a failure names which boundary broke?
- Can the suite run on a laptop with `docker` available and no shared staging
  database?

## Boundaries

Integration tests cover component seams, not full user journeys or single
functions: defer journeys to e2e-testing and isolated logic to
unit-test-design. Where a team standardizes on a fixture or container
harness, use it over the tools named here.

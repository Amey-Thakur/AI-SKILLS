---
name: sandbox-testing
description: Test integrations against provider sandboxes, recorded fixtures, and fakes, knowing what each misses. Use when building or changing an integration.
---

# Sandbox testing

You cannot test against production, and every alternative diverges from
it somewhere. Knowing where each approach lies is what prevents an
integration that passes every test and fails on first contact.

## Method

1. **Use the provider's sandbox for the happy path.** It exercises real
   request and response shapes, which no fake reproduces faithfully.
2. **Know how the sandbox differs.** Sandboxes have different limits,
   simplified validation, and often stale API versions, which is exactly
   where surprises come from.
3. **Record real interactions as fixtures.** Captured responses replayed
   in tests are fast, deterministic, and reflect actual behaviour rather
   than documentation.
4. **Refresh fixtures periodically.** Recorded responses go stale as the
   provider changes, and stale fixtures give false confidence (see
   integration-migration).
5. **Test the failure cases explicitly.** Timeouts, rate limits,
   malformed responses, and authentication failure, which sandboxes
   rarely produce on demand (see integration-resilience).
6. **Keep a small suite against the real API.** Run on a schedule rather
   than per commit, since it is the only thing that detects provider
   drift.
7. **Never let test code reach production credentials.** Environment
   separation is what prevents a test suite charging real cards (see
   api-credential-rotation).

## Boundaries

Sandboxes model the provider's intent rather than their production
behaviour. Fixtures test your code against a snapshot and cannot detect
provider changes. Some providers offer no sandbox, forcing careful use
of real accounts.

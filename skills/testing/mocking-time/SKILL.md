---
name: mocking-time
description: Control the clock in tests through an injectable time source so "now" is frozen and timezone behavior is explicit. Use when code reads the wall clock and a flaky or time-dependent test needs deterministic results.
---

# Mocking time

Code that calls `Date.now()`, `time.time()`, or `datetime.now()` directly
reads a value that changes every run, so any test over it is a coin flip near
a boundary and silently wrong across a daylight-saving shift. The fix is not
sprinkling sleeps or widening tolerances: it is making time an input you
control, then pinning it to the exact instant the test cares about.

## Method

1. **Inject the clock, never reach for the global.** Pass a time source into
   the unit: a `Clock` interface, a `now: () -> datetime` callable, or a
   constructor argument. Production wires the real clock, tests wire a fake.
   A function that closes over the global module clock cannot be frozen from
   the outside.
2. **Freeze now with a purpose-built library.** Use freezegun
   (`@freeze_time("2026-03-08T12:00:00Z")`), Sinon fake timers
   (`sinon.useFakeTimers`), or `Clock.fixed(instant, zone)` on the JVM. Set
   one explicit instant per test so the assertion reads against a literal you
   can see, not "roughly today".
3. **Advance time on purpose, do not sleep.** For timeouts, retries, and
   debounces, tick the fake forward (`clock.tick(30_000)`,
   `frozen.move_to(...)`) and assert the effect fired. A real `sleep(30)`
   makes the suite slow and still races; a controlled tick is instant and
   exact.
4. **Store and compare in UTC, render in a zone.** Keep every persisted and
   compared timestamp in UTC. Convert to a local zone only at display, and
   assert on the UTC value so a test that passes in one CI region passes in
   all of them.
5. **Pin real timezones for the cases that bite.** Test a US/Pacific spring
   DST gap (a wall time of 02:30 that does not exist), a fall overlap (01:30
   occurring twice), and a non-hour offset like Asia/Kolkata. Use named IANA
   zones (`ZoneInfo("America/New_York")`), never a fixed `-05:00`, so the
   rules travel with the data.
6. **Cover the ugly boundaries explicitly.** Add cases for midnight rollover,
   month and year ends, February 29, and epoch-second overflow if you touch
   32-bit time. These are where off-by-one date math surfaces.

## Litmus tests

- Grep the code under test for `now(`, `today(`, `Date.now`, `time.time`: any
  hit that is not the injected source is a hole.
- Does the suite pass with the machine clock set to December 31, 23:59 and
  again in a +13 timezone?
- Can you read the expected instant as a literal in each assertion?

## Boundaries

This covers making time deterministic in a test, not scheduling or cron
correctness in production, which needs its own integration coverage. Follow
the clock abstraction a project already has rather than introducing a second
one.

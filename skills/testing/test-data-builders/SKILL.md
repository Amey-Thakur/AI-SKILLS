---
name: test-data-builders
description: Construct test objects through builders and factories with valid defaults so each test states only the fields it cares about. Use when shared fixture files couple unrelated tests and drift as the schema grows.
---

# Test data builders

A shared fixture file starts as a convenience and ends as a liability. Twenty
tests read the same `users.json`, so nobody dares edit it, and each new case
bolts on a field that unrelated tests now silently depend on. A builder
constructs exactly the object a test needs at the point of use, filling every
required field with a sensible default and making only the salient one explicit.

## Method

1. **Give every builder valid defaults so tests set only what matters.**
   `aUser().build()` returns a complete, persistable user with plausible values
   for every required field. A test about suspension writes
   `aUser().withStatus(SUSPENDED).build()` and the reader sees status is the
   whole point.
2. **Put the field under test on the line, hide the rest.** For an expired-card
   case, `.withExpiry(yesterday)` belongs in the test body; the name, address,
   and SKU do not. Required-but-irrelevant data lives in defaults so the test
   reads as its own intent.
3. **Use a factory library for persistence and unique fields.** factory_bot,
   Factory Boy, or a factory function handle database insertion and sequences
   (`sequence(:email) { "user#{n}@x.test" }`) so no two rows collide. Prefer an
   in-memory `build` over `create` unless the test truly needs the database.
4. **Compose builders for object graphs.** Nest them,
   `anOrder().withCustomer(aCustomer().inTier(GOLD)).withLines(3)`, so a whole
   related structure is one readable expression instead of hand-wired foreign
   keys.
5. **Keep randomness deterministic or absent.** Fill fields a test never
   asserts on with Faker, but seed the generator per run so a failure replays.
   Values that change every run turn a real bug into a flake.
6. **Name reusable shapes as traits, then delete the fixtures.** Express common
   states as methods (`aUser().admin()`, an `expired` trait) so a change to what
   "admin" means lands in one place, and remove the JSON fixtures once builders
   cover the domain.

## Litmus tests

- Can a reader tell what a test cares about from its builder calls alone?
- Does adding a required field to the model touch one builder default, not
  every test?
- Is any test asserting on a value it never set explicitly?

## Boundaries

Builders construct inputs for unit and integration tests, not the assertions
themselves. A tiny value object is often clearer built inline with its
constructor. A large volume of realistic data for a running environment is a
different job: defer to seed-data-management. A specific captured payload from
production stays an explicit file rather than being forced through a builder.

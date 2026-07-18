---
name: test-data-builders
description: Construct test objects through builders and factories with valid defaults so each test states only the fields it cares about. Use when shared fixture files couple unrelated tests and drift as the schema grows.
---

# Test data builders

A shared fixture file starts as a convenience and becomes a liability. Every
test reads the same `users.json`, so nobody dares change it, and each new case
bolts on a field that three unrelated tests now silently depend on. A builder
constructs exactly the object a test needs at the point of use, with valid
defaults and only the salient fields made explicit.

## Method

1. **Give every builder valid defaults so tests set only what matters.** An
   `anOrder()` returns a complete, persistable order with sensible values, and a
   test overrides just the field under scrutiny: `anOrder().withStatus(REFUNDED).build()`.
   The reader sees status is the point and nothing else is.
2. **Put the salient field on the line, hide the rest.** For an expired-card
   test, `.withExpiry(yesterday)` belongs in the test body; the customer name,
   address, and SKU do not. Irrelevant-but-required data lives in defaults so
   the test reads as its own intent.
3. **Prefer a fresh builder over a shared fixture file.** A JSON fixture loaded
   by many tests couples them, so it grows append-only and stale because editing
   it for one test risks the others. A builder is constructed per test, leaving
   nothing shared to drift.
4. **Use a factory library for persistence and associations.** factory_boy or
   FactoryBot handle DB insertion, `sequence(:email)` for unique fields, and
   `SubFactory` for related rows. Reach for `build` (in-memory) over `create`
   (hits the database) unless the test genuinely needs persistence.
5. **Fill noise fields with Faker, not fixed literals.** For data a test never
   asserts on, generate it with `faker.email()` so no test accidentally leans on
   a hardcoded value. Seed the generator per test so a failure still replays.
6. **Compose builders instead of copying setup.** Nest them for complex graphs,
   `anInvoice().withLine(aLineItem().withQty(3))`, and expose named presets like
   `aPremiumCustomer()`, so a new required field ripples through one builder, not
   fifty tests.

## Litmus tests

- Can you read a test's builder calls and know exactly which fields drive its
  assertion?
- Does adding a required field to the model break one builder default rather
  than every test?
- Is any test asserting on a value it never set explicitly?

## Boundaries

Builders construct inputs, not the assertions themselves. A tiny value object
can be clearer built inline with its constructor than behind a builder. A large
reference dataset, such as a seeded database for integration-testing, is a
fixture by nature: keep it separate and versioned. Follow whichever factory
library a project already standardizes on.

---
name: database-testing
description: Exercise data-access code, migrations, and transactions against the real database engine so constraints, rollbacks, and schema changes are proven rather than assumed. Use when tests for queries or migrations run on SQLite while production runs Postgres.
---

# Database testing

Data code fails on the specifics an ORM hides: the dialect a query compiles
to, the constraint that fires on a duplicate, the migration that locks a
table under load. A test against SQLite when production runs Postgres proves
your mock of the database, not the database. Run against the real engine and
the surprises show up in CI instead of at 3 a.m.

## Method

1. **Run against the production engine and version.** Start Postgres 16 (or
   whatever prod runs) with Testcontainers or a docker-compose fixture, not
   SQLite. Dialect differences in JSON operators, upserts, and case sensitivity
   are exactly where the bugs are.
2. **Test migrations both directions.** Apply the up migration to an empty
   schema, assert the tables and indexes exist, then apply the down and assert
   it returns clean. A down migration nobody runs is a rollback that fails
   during an incident.
3. **Isolate each test in a transaction and roll back.** Open a transaction in
   setup, run the test, roll back in teardown. This keeps tests
   order-independent and fast, and no test sees rows another one wrote.
4. **Prove the constraints fire.** Insert a duplicate against a unique index,
   an orphan against a foreign key, a null into a NOT NULL column, and assert
   the IntegrityError. A constraint no test triggers is a comment, not a
   guarantee.
5. **Verify rollback on partial failure.** Drive a multi-statement unit of work
   that errors midway and assert nothing persisted. An application-level
   transaction that leaves half its writes behind is the classic
   data-corruption bug.
6. **Test concurrency where the code relies on it.** For `SELECT FOR UPDATE`,
   optimistic version columns, or a chosen isolation level, run two concurrent
   transactions and assert the serialization failure or the correct winner, not
   just the single-threaded path.

## Checks

- Do the tests run on the same engine and major version as production?
- Does a broken migration or a violated constraint fail a test rather than pass
  silently?
- After a mid-transaction error, does an assertion confirm zero rows landed?

## Boundaries

This is the persistence layer under your code. The HTTP surface above it
belongs to api-testing, cross-service seams to integration-testing, and the
shape of the schema itself to schema-design. Reuse the project's fixture and
container setup instead of standing up a parallel one.

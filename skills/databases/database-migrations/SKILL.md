---
name: database-migrations
description: Change schemas safely with expand-contract, online DDL, batched backfills, and rollback awareness. Use when altering a production schema or when a migration risks locking or downtime.
---

# Database migrations

A schema migration on a live database is surgery on a running patient:
the old code and new code both run during the transition, the change
may lock a table users depend on, and a botched migration can lose
data. Expand-contract and online techniques make it survivable.

## Method

1. **Split every breaking change into expand and contract.**
   Never change schema and code in one incompatible step.
   Expand: add the new (column, table) in a backward-
   compatible way; deploy code that writes both old and new;
   backfill existing data; switch reads to new; only then,
   a release later, contract (drop the old). This is what
   makes deploys rollback-able across the change (see
   rollback-strategy, blue-green-deployments: the same
   compatibility window).
2. **Make each step backward-compatible.** During the
   migration, the currently-running (old) code must keep
   working against the new schema, and the new code must
   tolerate the old data: because both run simultaneously
   during a rolling deploy (see deployment-pipelines). A
   migration that breaks the running version turns a deploy
   into an outage.
3. **Avoid locks that block production.** A naive
   `ALTER TABLE` can lock the whole table for the duration
   (catastrophic on a large hot table); use online/
   concurrent DDL (`CREATE INDEX CONCURRENTLY`, online
   schema-change tools) that build without blocking reads
   and writes. Know your database's locking behavior for
   each operation before running it on a big table.
4. **Backfill in batches, not one statement.** Updating
   millions of rows in a single transaction holds locks,
   bloats, and can time out; batch it (a few thousand rows
   at a time, with pauses, resumable: see script-
   idempotency, incremental-processing) so it does not
   overwhelm the database or block other work (see
   backpressure). Backfills are their own careful operation,
   separate from the DDL.
5. **Run migrations forward-only, decoupled from code
   deploys.** Migrations apply as their own step, additive
   and forward (see rollback-strategy: you roll back code,
   not schema); a migration framework tracks what has run
   so it applies once and in order. Down-migrations for
   destructive changes are often impossible (the data is
   gone): design so you never need them.
6. **Test on production-like data, back up before
   destructive steps.** A migration that works on an empty
   dev table can lock for an hour on production volume: test
   against a realistic copy (see test-environment-parity),
   and take a verified backup before any irreversible
   contract step (see backup-restore). The migration you
   cannot undo is the one you must be able to restore from.

## Boundaries

- Migrations manage schema evolution within one database;
  changes to schemas other teams consume (events, shared
  contracts) are api-change-management and schema-evolution
  territory, with their own coordination.
- Expand-contract adds steps and calendar time (a breaking
  change spans multiple releases); this is the price of
  zero-downtime and rollback safety, and skipping it is how
  migrations cause outages.
- NoSQL "schemas" migrate differently (often lazily, in
  application code on read: see nosql-modeling); the
  expand-contract *thinking* transfers even where the DDL
  does not.

---
name: seed-data-management
description: Version and share seed datasets so they stay small, realistic, and reproducible across a team. Use when tests or local environments depend on fixture data that is drifting, ballooning, or diverging between developers.
---

# Seed data management

Seed data is the starting state a test or a fresh dev environment loads before
doing anything. Left unmanaged it rots: a multi-megabyte SQL dump nobody can
read, rows that no longer match the schema, and three developers each patching
their own copy. Good seed data is small enough to review in a diff, honest
enough to catch real bugs, and versioned so everyone loads the same thing.

## Method

1. **Define seeds as code, not a database dump.** Write factories or builders
   (factory_bot, Faker-backed factories, a `seeds.ts` that inserts through the
   real models) checked into the repo. A binary `.sql` dump cannot be
   reviewed, merges as a conflict blob, and drifts silently from the schema.
2. **Keep the set minimal and representative.** Include one row per meaningful
   variant: an active user and a suspended one, an order in each state, a
   record with a null in the tricky column. Do not seed 10,000 rows to "feel
   real"; seed the ten that exercise a branch.
3. **Make generation deterministic.** Fix the random seed (`Faker.seed(42)`, a
   constant RNG seed) so the same command produces the same data every run.
   Non-deterministic seeds turn a failing test into a heisenbug that
   reproduces on one laptop and not the next.
4. **Run seeds through migrations, never around them.** Load seed data by
   inserting through the current schema and its migrations, so a column rename
   breaks seeding loudly at the next run instead of leaving stale fixtures that
   pass tests against a shape that no longer exists.
5. **Anonymize anything sourced from production.** If you snapshot real data for
   realism, strip or fake names, emails, and payment fields before it lands in
   the repo. Seed data lives in version control forever; a leaked customer
   record cannot be un-committed.
6. **Version the seed format alongside the schema.** Tag the seed script to a
   migration version and fail loudly when they disagree, so a developer on an
   old branch gets a clear "reseed needed" error instead of cryptic insert
   failures.

## Litmus tests

- Can a teammate go from a clean checkout to a working dataset with one
  documented command?
- Does the whole seed set fit in a diff a reviewer will actually read (roughly
  under a few hundred rows)?
- If you drop the database and reseed twice, are the two results identical?

## Boundaries

This is about fixture and starter data for tests and local development, not
production data migration or backfills, which carry live-data risk and belong
in a migration process. Large realistic performance datasets are a separate
concern: generate those on demand rather than committing them.

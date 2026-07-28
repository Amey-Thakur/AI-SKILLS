---
name: upsert-patterns
description: Insert or update in one statement without races or lost updates, using the engine's conflict handling rather than check-then-write. Use when writing records that may or may not already exist.
---

# Upsert patterns

The naive approach, checking whether a row exists and then inserting or
updating, is a race in every concurrent system: two callers both check,
both find nothing, and one insert fails or duplicates. Upsert exists so
the database resolves that atomically.

## Method

1. **Use the engine's conflict clause.** ON CONFLICT, MERGE, or the
   equivalent performs the decision inside one statement, which is what
   makes it safe under concurrency.
2. **Target a real unique constraint.** Conflict handling needs a
   constraint to detect against, so the uniqueness must exist in the
   schema rather than in your intent.
3. **Decide what update means on conflict.** Overwrite everything, merge
   selected columns, or do nothing. Blindly overwriting can discard
   concurrent changes made between read and write (see
   transactions-isolation).
4. **Preserve creation metadata.** created_at and similar columns should
   not be overwritten by the update branch, which is an easy detail to
   miss and hard to notice later.
5. **Make bulk upserts deterministic.** A batch containing two rows with
   the same key needs a defined winner, since some engines error and
   others pick arbitrarily.
6. **Consider idempotency for retried writes.** An upsert keyed on a
   natural or client-supplied key makes a retried request safe, which is
   what you want in any queue or API path (see idempotency).

## Boundaries

- Upsert resolves existence races; it does not resolve semantic
  conflicts about which version of the data is correct.
- Conflict syntax and behaviour differ substantially between engines, so
  this is one of the less portable parts of SQL.
- Heavy upsert traffic on the same keys creates contention, which is a
  throughput problem rather than a correctness one.

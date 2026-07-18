---
name: schema-design
description: Design database schemas that stay correct under growth and change. Use when creating tables, modeling relationships, or planning schema migrations.
---

# Schema design

The schema outlives every application that reads it. Model the domain's
truths, enforce them in the database, and leave a migration path, because
requirements will change and the data must survive the change.

## Method

1. **Model nouns and their real relationships first,** on paper: what
   things exist, what identifies them, how they relate (one-to-many,
   many-to-many), and which facts must always hold ("an order always has a
   customer", "an email is unique per workspace"). The invariants list is
   the schema's spec.
2. **Enforce invariants in the database, not in hope:** primary keys,
   foreign keys with deliberate on-delete behavior (cascade only where the
   child is meaningless without the parent), NOT NULL by default with null
   as a considered exception, unique constraints for real-world
   uniqueness, checks for closed sets and ranges. Application-level
   enforcement alone lasts until the second writer shows up.
3. **Choose keys and types for the long run:** synthetic ids for
   stability (natural keys drift), the precise type over the permissive
   one (timestamps with timezone, decimal for money, never float),
   text with constraints over enum columns that need migrations to extend,
   normalized by default with duplication only as a measured performance
   decision that names its sync strategy.
4. **Design the access paths with the schema:** the queries the product
   will actually run decide the indexes (foreign keys, filter columns,
   sort columns). Every index taxes writes; every missing one taxes reads.
   Write the top five queries down before finalizing.
5. **Migrate in expand-and-contract:** add the new column or table, write
   both, backfill in batches, switch reads, then drop the old in a later
   release. A destructive step (drop, rename, type change) ships only when
   nothing running still touches the old shape, and never inside the same
   deploy that introduces the new one.
6. **Plan the deletes on day one.** Soft delete or hard, retention rules,
   cascade blast radius: deciding at delete time means deciding during an
   incident.

## Litmus tests

- Can bad data exist? For each invariant, could a raw INSERT violate it?
  If yes, the database is not enforcing it.
- Could you run yesterday's application against today's schema during a
  rolling deploy?
- Does every relationship have a defined answer to "what happens when the
  parent goes away?"

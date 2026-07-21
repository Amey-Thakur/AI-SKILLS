---
name: database-normalization
description: Apply normal forms pragmatically and denormalize deliberately, weighing update anomalies against read performance. Use when designing a relational schema or deciding whether to denormalize.
---

# Database normalization

Normalization organizes relational data so each fact lives in exactly
one place, eliminating the update anomalies that duplication causes.
The pragmatic practice is normalizing to third normal form by default,
then denormalizing specific spots for performance with eyes open to
the cost.

## Method

1. **Normalize to 3NF as the default.** Each table
   represents one entity, each column depends on the whole
   key and nothing but the key: no repeating groups (1NF),
   no partial-key dependencies (2NF), no transitive
   dependencies (3NF). This is the sensible starting point
   for transactional data: one fact, one place, so updates
   touch one row (see schema-design). Most schemas should
   live here.
2. **Understand the anomalies normalization prevents.**
   Update anomaly (a fact duplicated in many rows must be
   updated everywhere, or they disagree), insertion anomaly
   (cannot record a fact without an unrelated one), deletion
   anomaly (deleting a row loses a fact it incidentally
   held). These are correctness bugs, not just tidiness;
   denormalization reintroduces them, which is why it is a
   deliberate trade (see nosql-modeling's denormalization
   cost).
3. **Denormalize for measured read performance, not
   preemptively.** When profiling shows that a join is a
   real bottleneck (see query-plan-reading), duplicating a
   column or precomputing an aggregate can speed reads: but
   only after the join is proven slow, not by assumption.
   Premature denormalization takes on the anomaly cost with
   no confirmed benefit (see premature-abstraction's
   instinct, schema edition).
4. **When you denormalize, own the consistency.** Duplicated
   data must be kept in sync: application logic, triggers,
   or a rebuild process that updates every copy on change
   (see the update-anomaly you just reintroduced). Undocumented
   denormalization where copies silently diverge is a data-
   integrity bug factory; make the sync mechanism explicit
   and tested.
5. **Enforce integrity with constraints, normalized or
   not.** Foreign keys, unique constraints, check
   constraints, and not-null: the database enforcing
   invariants beats application code hoping to (see
   defensive-programming's fail-closed instinct). A
   normalized schema without constraints still permits the
   corruption normalization was meant to prevent.
6. **Match the model to the workload (OLTP vs OLAP).**
   Transactional systems (many small writes, integrity-
   critical) favor normalization; analytical systems (heavy
   reads, aggregations) favor denormalized star schemas
   (see warehouse-modeling): the same data is modeled
   differently for different jobs, often with the
   analytical copy derived from the normalized source (see
   etl-vs-elt). Do not force one model to serve both.

## Boundaries

- Higher normal forms (BCNF, 4NF, 5NF) address rare
  specific anomalies; 3NF plus judgment covers almost all
  practical cases, and chasing perfect normalization can
  produce impractically many tables. Normalize for
  correctness, stop at usable.
- Normalization is a relational-model discipline; document
  and other NoSQL stores model from access patterns and
  denormalize by default (see nosql-modeling): the anomaly
  awareness transfers, the default inverts.
- The normalize-then-denormalize sequence matters: start
  normalized (correct), denormalize specific hot spots
  with a sync mechanism (fast where measured). Starting
  denormalized "for performance" usually buys anomalies
  before any measured need.

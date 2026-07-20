---
name: data-retention
description: Implement retention tiers, legal holds, and deletion pipelines that actually delete, including GDPR-style erasure. Use when defining how long data lives or building the machinery that enforces it.
---

# Data retention

Retention is a promise in two directions: data the business needs stays
available, and data past its purpose actually disappears, everywhere,
provably. Most organizations keep the first promise and quietly break
the second.

## Method

1. **Classify data with owners and clocks.** Per dataset: class
   (PII, financial, telemetry, derived), business owner, retention
   period with its reason (regulation cites, business need), and the
   clock start (creation, last activity, contract end). This table,
   kept where lineage metadata lives (see data-lineage), is the spec
   everything else implements.
2. **Tier before you delete.** Hot store for the active window,
   warm/cold object tiers for the tail (see cloud-storage-selection),
   delete at the end: lifecycle rules automate the transitions.
   Aggregate-then-drop is the analytics pattern: keep the rollups
   (see warehouse-modeling) with long retention, expire the raw
   events; most "we might need it" arguments are satisfied by
   aggregates at 1% of the cost.
3. **Build deletion as a pipeline, not a script.** Scheduled jobs
   that find expired data by the classification table, delete across
   *all* stores (primary DB, warehouse, lake partitions, search
   indexes, caches, logs), and emit an audit record of what was
   deleted when and by which rule. Partition-aligned layouts (see
   data-partitioning) turn expiry into cheap partition drops instead
   of row-by-row deletes.
4. **Handle erasure requests (GDPR/CCPA) as their own path.**
   Subject-keyed deletion within the statutory window: locate via
   lineage/catalog everywhere the subject's data lives, delete or
   anonymize, and handle the backup problem: either restore-time
   re-deletion (documented, tested) or crypto-shredding (per-subject
   keys destroyed on request; see event-sourcing for the immutable-
   log variant). Log the fulfillment as evidence.
5. **Implement legal hold as an override switch.** Holds pause
   deletion for named scopes (custodian, matter, dataset) above all
   retention rules; release resumes normal expiry. The deletion
   pipeline checks holds before every run; a hold discovered after
   deletion is a sanctions conversation, so this check fails closed.
6. **Audit the machinery quarterly.** Sample expired data and prove
   it is gone from every store; reconcile the classification table
   against reality (new tables appear constantly; see
   data-quality-checks for the scanning muscle); review retention
   periods with legal yearly. Deletion code that never gets audited
   is deletion theater.

## Boundaries

- Retention policy content (how long, what law) is a legal decision;
  this skill builds the enforcement, not the numbers. Get the table
  signed off.
- Derived data (models, embeddings, aggregates) containing personal
  data inherits erasure obligations; whether an aggregate is
  sufficiently anonymized is a privacy-review question
  (see pii-handling), not an engineering assumption.
- Soft-delete flags are UX, not retention compliance; flagged rows
  still exist for every purpose a regulator cares about.

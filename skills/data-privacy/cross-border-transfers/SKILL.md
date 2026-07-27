---
name: cross-border-transfers
description: Know where personal data physically goes and keep transfers lawful when it crosses a border. Use when choosing a region, adding a vendor, or designing replication and backups.
---

# Cross-border transfers

Data location is an architectural decision with legal consequences.
Replication, CDN edges, backups, support tooling, and vendor
subprocessors all move data across borders quietly, often without
anyone choosing it deliberately.

## Method

1. **Know where every copy physically rests.** Primary region, replica
   regions, backup destinations, log aggregation, analytics, and each
   vendor's processing location. The map is the prerequisite for every
   other decision here (see data-lineage).
2. **Pin regions explicitly rather than accepting defaults.** Cloud
   services default to convenient regions, and a default is how data
   ends up somewhere you did not intend.
3. **Check the vendor chain, not just the vendor.** Subprocessors move
   data further, and their locations are part of your transfer picture
   (see vendor-data-processing).
4. **Keep the transfer mechanism documented per flow.** Whichever legal
   instrument applies, record which flow relies on which mechanism so
   the answer exists before an auditor asks.
5. **Design for residency when it is required.** Some customers or
   jurisdictions require data to stay in region, which affects sharding,
   routing, backups, and support access, and it is far cheaper as an
   architectural choice than a later migration.
6. **Watch support and debugging paths.** An engineer pulling
   production data to a laptop in another country is a transfer, and it
   is the one least likely to appear in any diagram.

## Boundaries

- The lawfulness of a transfer mechanism is a legal question that
  changes with rulings and adequacy decisions; engineering provides the
  facts, counsel provides the judgement.
- Encryption in transit does not by itself make a transfer lawful,
  though it is usually necessary.
- Residency guarantees you cannot enforce technically should not be
  promised commercially.

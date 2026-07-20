---
name: change-data-capture
description: Replicate database changes via log-based CDC with correct snapshot handling, ordering, and schema-change survival. Use when streaming OLTP changes to warehouses, caches, or search without touching app code.
---

# Change data capture

Log-based CDC tails the database's own replication log, so you get
every change, in commit order, without touching application code or
adding query load. The craft is in the bootstrap, the semantics, and
surviving schema changes.

## Method

1. **Choose log-based over the alternatives.** Polling `updated_at`
   misses deletes and intermediate states and hammers the source;
   triggers add write latency and operational fragility. Log-based
   (Debezium-class reading WAL/binlog) captures inserts, updates,
   deletes with before/after images. The application-level
   alternative when you control the code is transactional-outbox:
   business events instead of row changes.
2. **Bootstrap with a consistent snapshot, then stream.** Initial
   load = snapshot at a known log position, then apply changes from
   exactly that position: gap or overlap between the two is the
   classic silent-corruption window. Use the connector's coordinated
   snapshot mode; for huge tables, incremental snapshot features
   interleave chunks with live changes.
3. **Deliver with CDC's semantics understood.** At-least-once
   delivery (consumers dedupe or upsert; see idempotent-consumers),
   ordering per key only when partitioned by primary key (see
   message-queues), and commit-order within a table but not
   transactions across topics: cross-table transactional consistency
   downstream needs buffering by transaction id or acceptance of
   eventual alignment (see consistency-models).
4. **Plan for schema changes on day one.** DDL at the source flows
   as schema-change events: pair CDC with a schema registry and
   compatibility rules (see schema-evolution), and test the
   full path (add column, widen type) in staging. The default
   behavior of many sinks on unexpected DDL is stall-or-drop; know
   which yours does before production teaches you.
5. **Operate the replication slot like a disk-space liability.** An
   unconsumed slot retains WAL until the source database fills its
   disk: monitor slot lag in bytes and age, alert well before
   retention limits, and have the resnapshot runbook ready for when
   a slot must be dropped. Connector restarts resume from stored
   offsets; losing offsets means resnapshotting, so back them up.
6. **Materialize downstream by merge.** Sinks apply changes as
   upserts/deletes keyed by primary key (see incremental-processing
   merge strategies); soft-delete flags or tombstone handling decided
   explicitly, and a periodic row-count/checksum reconciliation
   against the source (see data-quality-checks) as the drift
   backstop.

## Boundaries

- CDC emits row deltas, not business meaning: "status changed to
  shipped" is inference downstream; where consumers need intent,
  outbox events beat reverse-engineering rows.
- Sources you cannot get log access to (many SaaS apps, managed DBs
  without logical replication) force API polling; treat that as a
  different, lossier contract.
- CDC is replication infrastructure, not stream processing; computing
  on the change stream inherits all of batch-vs-streaming's
  complexity ladder.

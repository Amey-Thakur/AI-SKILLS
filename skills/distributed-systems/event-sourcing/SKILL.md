---
name: event-sourcing
description: Persist state as an append-only event log with projections and snapshots, and know when the pattern is overkill. Use when audit history is a first-class requirement or evaluating event sourcing against CRUD.
---

# Event sourcing

State becomes derived data: the log of what happened is the truth, and
current state is a fold over it. You buy perfect history and temporal
queries; you pay with schema-for-life discipline and eventual-read
plumbing.

## Method

1. **Adopt only for log-shaped requirements.** Audit that cannot lie,
   temporal reconstruction ("what did we believe on May 3"), domains
   that are natively event streams (ledgers, orders, inventory
   movements). "It might be nice to have history" is what changelog
   tables are for; see the Boundaries.
2. **Design events as immutable business facts.** Past tense, aggregate
   id, sequence number, occurred_at, schema version:
   `OrderShipped{order_id, carrier, at}`. Facts, not CRUD deltas
   (`RowUpdated{diff}` is a changelog, not a domain event) and not
   commands (`ShipOrder` is a request; it can be rejected).
3. **Write through the aggregate with optimistic concurrency.** Load the
   aggregate's events (or snapshot + tail), validate the command against
   current state, append new events with expected-version
   compare-and-swap. A version conflict means someone else wrote first:
   reload and retry. This is the consistency boundary; keep aggregates
   small enough that conflicts are rare.
4. **Read from projections.** Consumers fold events into read models
   (SQL tables, search indexes, caches), each rebuildable from the log.
   Projections lag: this is CQRS's eventual consistency (see cqrs), so
   session tricks (read-your-writes via in-memory apply) cover the UI
   where lag shows.
5. **Snapshot for load time, never for truth.** When replay exceeds
   tens of milliseconds, store `(aggregate_id, version, state)` every N
   events and replay the tail. Snapshots are disposable cache;
   correctness never depends on them.
6. **Version events additively, upcast on read.** New optional fields
   are free; shape changes get a new event version plus an upcaster
   (old shape to new) applied at read/replay. You will replay
   five-year-old events; every schema decision is permanent in a way
   CRUD migrations are not.
7. **Handle mistakes with compensating events.** Wrong shipment gets
   `ShipmentCorrected`, not an edited log. For legal erasure (GDPR),
   crypto-shredding (per-subject encryption keys, deleted on request)
   keeps the log immutable while the data dies.

## Boundaries

- Most systems need an audit trail, not event sourcing: an append-only
  changelog table beside CRUD state (or CDC feeding one) delivers 80%
  of the value at 20% of the cost. Choose that first.
- Cross-aggregate invariants do not fit inside one append; they become
  sagas (see saga-pattern) or process managers, with real complexity.
- The event log is a poor query engine; without projections you have
  written a database with no indexes.

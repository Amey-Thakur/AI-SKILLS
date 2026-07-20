---
name: transactional-outbox
description: Publish events reliably by writing them in the same transaction as state changes and relaying asynchronously. Use when a service must update its database and emit a message without losing either.
---

# Transactional outbox

Writing the database and publishing to a broker are two systems; there is
no transaction across them. The outbox makes the event part of the
database write, then moves it to the broker afterward, turning dual-write
data loss into at-least-once delivery.

## Method

1. **Recognize the dual-write.** Any handler that commits state and then
   publishes (or publishes and then commits) loses one side on a crash
   between them. If both "order saved" and "order-created event" must
   survive, you need the outbox (or its cousin, CDC).
2. **Write the event with the state, atomically.**
   `outbox(id, aggregate_id, type, payload, created_at, published_at
   NULL)` inserted in the same transaction as the business change. The
   commit is now the single point of truth: both happened or neither.
3. **Relay with a poller or CDC.** Poller: select unpublished in
   created_at order (SKIP LOCKED for competing relays), publish, mark
   published; simple, adds polling latency. CDC (Debezium-style, reading
   the WAL): lower latency and no polling load, one more moving system
   to operate. Start with the poller unless you already run CDC.
4. **Deliver at-least-once, order per aggregate.** The relay can crash
   after publish before marking: consumers will see duplicates, so they
   dedupe on event id (see idempotent-consumers). Preserve ordering only
   per aggregate_id (partition key), which the single-writer transaction
   already gives you.
5. **Design the payload as a contract.** Event type, schema version,
   occurred_at, aggregate id, and the fact that happened (past tense).
   The outbox does not exempt events from api-change-management; additive
   evolution applies.
6. **Operate the table.** Metrics on unpublished count and oldest age
   (relay health), alerting like a queue; delete or archive published
   rows on a schedule, since an unbounded outbox slows the transaction
   it protects.

## Boundaries

- If nobody needs the event beyond the service's own async work, a job
  row (see background-jobs) is the same pattern without a broker.
- The inbox side (dedup store) belongs to consumers; the outbox
  guarantees delivery, not uniqueness of processing.
- Do not query the outbox as an event store; if replayable history is a
  requirement, that is event-sourcing, a different commitment.

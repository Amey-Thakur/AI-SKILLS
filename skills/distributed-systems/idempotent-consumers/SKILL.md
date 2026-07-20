---
name: idempotent-consumers
description: Make message consumers safe under at-least-once delivery with natural idempotency or a transactional dedup store. Use when building queue/stream consumers or debugging duplicate side effects.
---

# Idempotent consumers

At-least-once delivery is the only delivery you really get, so every
consumer will see duplicates: after crashes, after rebalances, after
redeliveries. Processing must make "again" equal "once".

## Method

1. **Prefer natural idempotency.** Upserts keyed by entity id, setting
   absolute state (`status = shipped`) instead of applying deltas
   (`count += 1`), writes guarded by unique constraints. When the
   operation is naturally idempotent, duplicates cost nothing and need
   no bookkeeping.
2. **Otherwise, dedupe transactionally (the inbox).** A
   `processed_messages(message_id)` table written in the same
   transaction as the side effect: insert id; on conflict, ack and skip.
   The atomicity is the entire point; a Redis SET checked before a DB
   write re-creates the crash window it was meant to close.
3. **Use version/sequence gates against stale updates.** Carry the
   entity's sequence number or updated_at in each message; consumers
   apply only if newer than what they hold
   (`WHERE seq < incoming_seq`). This handles both duplicates and the
   reordering that retries and partitions produce (see message-queues).
4. **Ack only after the transaction commits.** Effect and dedup record
   commit together, then acknowledge. Crash before ack = redelivery =
   conflict on the inbox row = skip. This ordering is what turns
   at-least-once delivery into exactly-once effect.
5. **Contain non-transactional side effects.** Calling an external API
   inside consumption cannot join your transaction: pass the message id
   through as that API's idempotency key (see idempotency-keys), or
   split the flow so the external call is its own keyed step. Two
   effects in one handler means partial-completion duplicates; one
   effect per message is the safe shape.
6. **Expire the inbox pragmatically.** Retain ids beyond the broker's
   maximum redelivery horizon (days, typically), then prune; pair with
   the sequence gate so a very late duplicate still cannot regress
   state.

## Boundaries

- Broker "exactly-once" features cover broker-to-broker or
  broker-to-transactional-sink scopes; your database write next to an
  HTTP call is still your problem.
- Dedup keys must be producer-stable (event id minted at creation, not
  delivery id); a new id per redelivery dedupes nothing.
- For pure projections, deterministic replay (see cqrs) can substitute
  for an inbox: rebuild instead of dedupe.

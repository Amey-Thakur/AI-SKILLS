---
name: message-queues
description: Choose between queues and streams, and configure ordering, consumer groups, and dead letters correctly. Use when introducing async messaging or debugging lost, duplicated, or reordered messages.
---

# Message queues

Queues distribute work (each message consumed once, then gone); streams
record facts (each message read by many, retained). Most messaging pain
comes from using one where the other fits.

## Method

1. **Pick the model from the consumption pattern.** One consumer pool
   doing jobs: queue (SQS, RabbitMQ). Multiple independent readers,
   replay, event history: stream/log (Kafka, Kinesis, Redpanda). "We
   might need replay later" is how queues get misused; be honest about
   whether messages are commands or events.
2. **Scope ordering to a key, or drop it.** Global ordering caps
   throughput at one consumer. Order per entity (partition key =
   order_id) covers real needs: same entity in sequence, entities in
   parallel. With plain queues, do not rely on FIFO-ish behavior;
   retries reorder. Consumers discard stale updates via sequence numbers.
3. **Design consumer groups around partitions.** In streams, one
   partition serves one consumer per group: more consumers than
   partitions idle; hot keys skew load. Pick partition counts with 2-3x
   headroom and keys with even cardinality; rebalancing pauses the
   group, so keep processing fast or use cooperative rebalancing.
4. **Ack after effect, expect redelivery.** Acknowledge (or commit
   offsets) only after the side effect is durable; the crash between
   effect and ack is why every consumer must dedupe or be idempotent
   (see idempotent-consumers). Auto-ack/auto-commit-on-receive silently
   converts crashes into data loss.
5. **Configure the failure path day one.** Per-queue DLQ with alerting
   on depth and age (see background-jobs); for streams, a parking-lot
   topic plus a skip-and-log policy, because one poison message
   otherwise halts its whole partition forever.
6. **Watch lag, not just depth.** Consumer lag (offset delta or oldest
   unacked age) trending up under steady input is the earliest
   overload signal; alert on lag age, scale consumers before the
   retention window becomes the deadline.

## Boundaries

- A message broker between two services you own, deployed together, is
  often just latency; direct calls with timeouts-and-retries may serve
  better until there is a real fan-out or buffering need.
- Broker-side retention is not a database; if consumers need queries,
  land events into one (see event-sourcing for when the log is the
  source of truth).
- Exactly-once delivery claims mean exactly-once processing within one
  vendor's brackets; across your side effects it is still idempotency.

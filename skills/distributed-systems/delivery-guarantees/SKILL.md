---
name: delivery-guarantees
description: Reason honestly about at-most-once, at-least-once, and effectively-once semantics end to end. Use when specifying messaging behavior or auditing where a pipeline can lose or duplicate data.
---

# Delivery guarantees

Between unreliable networks and crashing processes, a sender can either
give up after silence (at-most-once: may lose) or retry after silence
(at-least-once: may duplicate). Exactly-once delivery is not on the
menu; exactly-once *effect* is, and it is built, not configured.

## Method

1. **Derive the guarantee from ack placement.** Ack before processing:
   at-most-once (crash after ack loses the message). Ack after durable
   effect: at-least-once (crash before ack duplicates). Every hop in
   the pipeline (producer to broker, broker to consumer, consumer to
   store) makes this choice; the end-to-end guarantee is the weakest
   hop.
2. **Pick per data class.** Must-not-lose (orders, payments, audit):
   at-least-once everywhere plus dedup. May-lose-some (metrics,
   telemetry, presence pings): at-most-once is cheaper and simpler;
   dropping under pressure is a feature (see backpressure). Write the
   classification down; mixed pipelines mislabeled cause both data loss
   tickets and needless dedup plumbing.
3. **Producers: send with retries, mark with ids.** Publish with
   acks-required and retries (accepting broker-side duplicates), stamp
   a producer-minted event id and per-entity sequence at creation.
   Those ids are what every downstream dedup and ordering repair hangs
   on (see idempotent-consumers); delivery-time ids are worthless.
4. **Build effectively-once at the effect.** At-least-once delivery
   plus an idempotent or deduplicating consumer (transactional inbox,
   upserts, sequence gates) yields exactly-once *state change*. Vendor
   exactly-once features (Kafka transactions, EOS sinks) achieve this
   within their bracket (topic-to-topic, topic-to-supported-sink);
   outside the bracket, the duty returns to you.
5. **Audit the crash windows.** For each hop ask: crash here, what
   happens? Between effect and ack (duplicate: fine if dedup exists),
   between ack and effect (loss: only acceptable for may-lose data),
   buffered in memory (loss on kill: bound and flush on shutdown, see
   graceful-shutdown). The answers are the guarantee, whatever the
   brochure says.
6. **Reconcile as the backstop.** Counts/checksums between source and
   sink on a schedule, and a re-request path (a `/events` range
   endpoint, replayable log) for gaps. Mature pipelines are
   at-least-once plus dedup plus reconciliation; the third leg catches
   what the first two leak.

## Boundaries

- Ordering is a separate promise from delivery; retries and partitions
  reorder even when nothing is lost (see message-queues, clock-skew).
- Guarantees end at your boundary: emails, SMS, third-party APIs offer
  their own semantics, and your idempotency key mapping is the only
  bridge (see idempotency-keys).
- Latency SLAs and delivery guarantees trade off; at-least-once with
  durable acks costs fsyncs and waits that at-most-once paths skip.

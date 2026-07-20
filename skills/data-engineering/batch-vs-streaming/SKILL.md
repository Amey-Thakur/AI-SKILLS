---
name: batch-vs-streaming
description: Choose batch or streaming from honest latency requirements and operate the complexity you actually need. Use when designing a data flow or reviewing whether a streaming system earns its cost.
---

# Batch vs streaming

The deciding question is what the freshest useful result is worth.
Batch is simpler to build, test, and rerun; streaming buys latency with
a permanent operational tax. Interrogate the latency requirement before
paying it.

## Method

1. **Get the latency requirement in numbers, from the consumer.**
   "Real-time" usually decomposes: fraud checks (sub-second, genuinely
   streaming), operational dashboards (minutes: micro-batch),
   executive reporting (hours: batch). Ask what decision changes if
   the data is 15 minutes old; if the answer is "none", the
   requirement is batch wearing a costume.
2. **Default batch; escalate in steps.** Hourly/daily batch (see
   data-pipeline-design), then frequent micro-batch (5-15 min, same
   tooling, most of the perceived streaming value), then true
   streaming (Flink/Kafka Streams-class) only for event-time
   correctness at low seconds or sub-second reaction. Each step up
   trades away rerun simplicity.
3. **If streaming, adopt the semantics package whole.** Event time vs
   processing time, watermarks for lateness, windows (tumbling,
   sliding, session) with allowed-lateness policy, and stateful
   operator checkpointing for effectively-once results (see
   delivery-guarantees, idempotent-consumers on the sink side).
   Streaming without watermark discipline produces answers that are
   fast and quietly wrong.
4. **Plan the reprocessing path either way.** Batch replays from raw
   naturally; streaming needs retained log history (see
   message-queues) plus rewind-and-replay runbooks, or a batch
   backfill path beside it. A streaming pipeline that cannot reprocess
   yesterday's bug is append-only regret.
5. **Avoid dual codebases when both latencies are needed.** Prefer one
   engine/framework expressing both (unified APIs, streaming with
   batch backfill mode) or micro-batch covering both requirements,
   over maintaining separate streaming and batch implementations of
   the same logic that drift apart (the classic lambda-architecture
   failure).
6. **Budget the operational delta.** Streaming means: 24/7 stateful
   jobs with checkpoint storage, lag monitoring and paging (see
   backpressure), rebalance/upgrade choreography, and skills on-call.
   Cost it against the batch alternative explicitly; latency that
   nobody consumes does not pay this bill.

## Boundaries

- CDC replication is streaming infrastructure but not stream
  *processing*; moving rows continuously is far simpler than computing
  on them continuously (see change-data-capture).
- Operational event-driven services (see event-driven-architecture)
  react to single events; this skill is about analytics computation
  over flows.
- Latency requirements harden over time; revisit the decision when
  consumers change, not just when infrastructure fashion does.

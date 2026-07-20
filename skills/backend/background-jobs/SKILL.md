---
name: background-jobs
description: Run asynchronous work through queues with safe retries, poison-message handling, and idempotent jobs. Use when moving work out of the request path or fixing duplicated, stuck, or lost jobs.
---

# Background jobs

A job system's contract is at-least-once execution at some later time.
Design every job for the "at least" and the "later": it will run twice,
and it will run after the world changed.

## Method

1. **Enqueue references, not state.** The payload is IDs plus intent
   (`{"type": "send_receipt", "order_id": 123}`); the job reloads current
   state at run time. Snapshotting state into payloads acts on stale data
   after any delay or retry.
2. **Make every job idempotent.** Natural idempotency where possible
   (setting a status, upserting), otherwise an idempotency key checked in
   the job's own transaction. The queue will redeliver after crashes
   between work and ack; only the job can make that safe.
3. **Retry with backoff, jitter, and a ceiling.** Exponential backoff
   starting at seconds, jittered to avoid thundering herds, capped
   attempts (5-10). Distinguish retryable failures (timeouts, 429s) from
   permanent ones (validation): permanent failures skip retries and go
   straight to the dead-letter queue.
4. **Dead-letter with context, and staff the queue.** Failed-forever jobs
   land in a DLQ with error, attempt count, and first-failure time. A DLQ
   nobody monitors is a silent data-loss pit: alert on depth and age, and
   build the one-click requeue for after the fix ships.
5. **Set visibility timeouts above p99 runtime.** Too short and the queue
   redelivers mid-run (guaranteed duplicates); heartbeat/extend for long
   jobs. Bound job runtime hard; a job that can run for an hour needs to
   be a resumable sequence of smaller jobs.
6. **Separate queues by latency class.** User-facing (email, receipts) on
   a fast queue with tight alerting; batch/reporting on another. One queue
   means a backfill starves every password-reset email behind it.
7. **Instrument the four numbers.** Queue depth, oldest-message age,
   per-type failure rate, per-type duration. Age is the alert that
   matters; depth alone lies when throughput is high.

## Boundaries

- Scheduled recurrence (cron) is a different concern; see scheduled-jobs.
  A cron that enqueues jobs beats a job that sleeps.
- Exactly-once execution is not purchasable from the queue; it is
  idempotency plus at-least-once, end of list (see idempotent-consumers).
- Workflows with dependencies between steps deserve an orchestrator or
  the saga-pattern, not job-spawning-job chains you cannot observe.

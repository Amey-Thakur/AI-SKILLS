---
name: webhooks-design
description: Deliver webhooks with signatures, retries, and ordering rules consumers can actually build against. Use when adding webhooks to a product or hardening delivery and verification on either side.
---

# Webhooks design

A webhook program is a promise about delivery semantics. State the
promise precisely (at-least-once, possibly out of order, within N hours)
and build both sides to it.

## Method

1. **Send facts, fetch details.** Payload carries event type, IDs,
   timestamps, and a version; consumers fetch the full object if needed.
   Thin payloads survive schema evolution and avoid shipping stale or
   sensitive data to endpoints you do not control.
2. **Sign with a shared-secret HMAC over timestamp + body.**
   `signature: t=1712..., v1=hex(hmac_sha256(secret, t + "." + body))`.
   The timestamp bounds replay (reject > 5 minutes old); constant-time
   compare; support two active secrets for rotation.
3. **Retry on schedule, disable on despair.** Anything but a 2xx within
   a short timeout (5-10s) is a failure; retry with exponential backoff
   over 24-72 hours. After exhaustion, mark the endpoint failing, notify
   the owner, and auto-disable persistent offenders; expose recent
   deliveries and a manual redeliver in the dashboard.
4. **Guarantee at-least-once, number the events.** Do not promise
   ordering; parallel delivery and retries reorder everything. Give each
   event a unique ID (consumer dedup key) and a per-resource sequence or
   `updated_at` so consumers can discard stale updates.
5. **Consume via ack-fast-process-later.** Receiver verifies signature,
   persists the raw event, returns 200, then processes from its own
   queue. Processing inline behind the response is how consumers turn
   your retries into their duplicated side effects.
6. **Ship the consumer-side kit.** Verification snippets per language,
   a CLI or dashboard test-fire, event catalog with sample payloads, and
   a `whsec_`-style prefixed secret. Every hour you spend here removes a
   thousand support tickets.

## Boundaries

- Webhooks complement polling and event streams, not replace them: a
  `/events` list endpoint is the reconciliation path after consumer
  downtime.
- Do not send webhooks to unverified URLs without SSRF controls: resolve
  and block private ranges, disallow redirects (see ssrf-defense).
- Mutual TLS and static-IP allowlists are enterprise asks with real ops
  cost; price them consciously rather than promising ad hoc.

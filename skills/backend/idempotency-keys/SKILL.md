---
name: idempotency-keys
description: Implement idempotency keys so retried requests produce one effect and one canonical response. Use when making POST endpoints retry-safe, especially payments and order creation.
---

# Idempotency keys

A retry after a network timeout must not charge the card twice. The
client names the operation with a key; the server ensures one execution
and replays one recorded response.

## Method

1. **Client generates, server scopes.** Client sends
   `Idempotency-Key: <uuid>` per logical operation (same key on retry,
   new key for a genuinely new attempt). Server scopes stored keys by
   authenticated caller and endpoint so keys cannot collide across
   tenants or routes.
2. **Reserve the key atomically before doing work.** Insert
   `(key, scope, request_hash, status=in_progress)` with a unique
   constraint in the same database as your business data. Lost race =
   key exists: this is the whole mechanism; check-then-insert without
   the constraint is a duplicate generator under load.
3. **Bind the key to the request body.** Store a hash of the payload;
   same key + different hash returns 422. Otherwise a client bug replays
   order A's response to order B's request.
4. **Record the outcome, replay it verbatim.** On completion, store
   status code and response body against the key; any later duplicate
   gets exactly that response with an `Idempotent-Replay: true` header.
   Concurrent duplicate while in_progress: 409 with Retry-After, do not
   run the work twice in parallel.
5. **Choose the failure policy explicitly.** Recommended: store the
   error response for deterministic failures (validation) but clear the
   key on infrastructure failures so a retry can succeed. Document which
   you do; clients build their retry loops on it.
6. **Expire pragmatically.** 24-72h TTL covers real retry windows;
   sweep expired rows. An unbounded key table is a slow-motion outage.

## Boundaries

- GET/PUT/DELETE are idempotent by contract already; keys are for POST
  and other effectful non-idempotent operations.
- The key dedupes the request; it does not make your downstream calls
  safe. Inside the execution you still need transactional effects (see
  transactional-outbox).
- If the operation's effect happens outside your database (external
  charge API), execute it via that provider's own idempotency mechanism
  and store their reference before acking yours.

---
name: offline-first-mobile
description: Build a mobile app where the local database is the source of truth, the UI reads and writes it directly, and a background sync engine reconciles with the server. Use when the app must work on flaky or no connectivity, or when network-coupled screens feel slow and fragile.
---

# Offline-first mobile

An offline-first app treats the network as an unreliable peer, not a
dependency. The UI reads and writes a local database and never blocks on a
request; a separate sync layer pushes local changes and pulls remote ones.
The hard part is not caching, it is reconciling two histories that diverged.

## Method

1. **Make the local store the single source of truth.** The UI queries and
   mutates SQLite, Room, Core Data, or a sync-native store (Realm,
   WatermelonDB, PowerSync), and observes it reactively. No screen awaits a
   network call to render. Writes commit locally first and return
   immediately, so the app is fully usable at zero bars.
2. **Queue mutations as an ordered, durable outbox.** Every local change
   becomes a persisted operation record with a stable client-generated id,
   a type, and a payload. A background worker drains the queue when
   connectivity returns, retries with backoff, and only removes an entry on
   server acknowledgment. Never drop a queued mutation because a retry
   failed once.
3. **Sync by deltas, not full refetches.** Track a server cursor or
   `updated_since` timestamp per collection and pull only what changed.
   Assign ids client-side (UUIDs) so records exist and relate before the
   server ever sees them, avoiding the round-trip-for-an-id trap that
   forces online-only creation.
4. **Choose a conflict policy per field, and write it down.** Last-write-
   wins is acceptable for independent scalar fields with trustworthy
   timestamps; it silently destroys data on concurrently edited text or
   counters. Use per-field merge for documents, server-authoritative
   resolution for money and inventory, and CRDTs only where true concurrent
   editing is a product requirement, since they add real complexity.
5. **Surface sync state honestly without blocking on it.** Show pending,
   synced, and failed at the record level, not a global spinner. Let the
   user keep working while a background sync runs. Escalate to the user only
   for conflicts the policy cannot resolve, and present both versions
   plainly.
6. **Handle deletes and clock skew as first-class cases.** Use tombstones,
   not hard deletes, so a delete propagates instead of a record
   reappearing on next pull. Never trust device clocks for ordering; use
   server-assigned sequence numbers or logical clocks, since a wrong phone
   clock corrupts last-write-wins.

## Failure modes

- Duplicate records after reconnect: mutations were keyed by server id,
  which did not exist offline. Key by client id end to end.
- Resurrected deletes: a hard delete lost the tombstone on the next pull.
- Silent data loss: last-write-wins on a field two users edited at once.

## Boundaries

This covers local-truth architecture and reconciliation. Transport
security and token refresh for the sync endpoint are api-security and
oauth-flows. Real-time collaborative editing at scale needs a dedicated
CRDT or OT engine beyond this method. If the app is read-mostly with rare
writes, a plain cache with revalidation may be enough; do not adopt a full
sync engine for it.

---
name: offline-sync
description: Let clients work disconnected and reconcile changes on reconnect without losing edits or resurrecting deletions. Use when building an application that must work on an unreliable network.
---

# Offline sync

Offline capability turns every client into a replica that will diverge.
The work is not caching but reconciliation: deciding what happens when
two versions of the truth meet, and making sure nothing the user did is
silently discarded.

## Method

1. **Queue intents, not final states.** Recording that the user
   completed a task merges better than recording that the document now
   looks like this, which overwrites concurrent work.
2. **Make every queued operation idempotent and identified.** Reconnect
   retries duplicate requests routinely, and without an id the server
   cannot tell a retry from a repeat (see idempotency).
3. **Handle deletes explicitly with tombstones.** Without them, a client
   that was offline during a delete will happily recreate the record on
   sync.
4. **Decide the conflict policy per data type.** Last write wins is
   acceptable for a preference and unacceptable for a document body or a
   balance; choose per field rather than globally.
5. **Bound the offline window.** State how long a client may be offline
   and still sync cleanly, since unbounded divergence eventually cannot
   be reconciled and needs a full refresh path.
6. **Show sync state honestly.** Pending, syncing, synced, and failed,
   visible to the user, because silent failure is how offline apps lose
   trust and data.
7. **Test the ugly paths.** Reconnect mid-sync, conflicting edits from
   two devices, clock skew, and a server that rejects a queued
   operation (see clock-skew).

## Boundaries

- Offline sync guarantees convergence at best; it cannot preserve the
  intent of two people who edited the same thing differently.
- Local storage has quota limits and can be evicted by the platform, so
  it is not durable storage (see browser-storage-safety).
- Sensitive data cached on a device needs its own protection and a
  wipe path (see data-classification).

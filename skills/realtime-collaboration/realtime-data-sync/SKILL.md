---
name: realtime-data-sync
description: Keep client state current with server changes using subscriptions, deltas, and resync, without drift or memory growth. Use when a UI must reflect data that other users or systems are changing.
---

# Realtime data sync

Most realtime features are not collaborative editing but live data: a
dashboard, a list, a status that must not go stale. The failure mode is
quiet drift, where the client believes something the server stopped
believing an hour ago.

## Method

1. **Subscribe narrowly.** Push only what this client is displaying,
   because broad subscriptions waste bandwidth and leak data the user
   should not receive (see realtime-permissions).
2. **Send deltas with a sequence number.** Changes rather than whole
   payloads, numbered so the client can detect a gap rather than
   silently missing one.
3. **Resync on gap or reconnect.** Detecting a missed sequence triggers
   a full refresh of that resource, which is the only reliable recovery
   from divergence.
4. **Reconcile push with fetch.** Data arriving by subscription and by
   request must merge under one rule, or the two paths overwrite each
   other in ways that depend on timing.
5. **Bound what the client holds.** Live subscriptions accumulate state
   in long-lived sessions, so eviction is part of the design rather than
   an afterthought.
6. **Coalesce high-frequency updates.** Rendering every change to a fast
   moving value wastes the frame budget; batch to the refresh rate the
   user can perceive (see batching-and-debouncing).
7. **Show staleness when the connection drops.** An interface that looks
   live while disconnected is actively misleading, particularly for
   operational data.

## Boundaries

- Push keeps data fresh; it does not guarantee delivery, so periodic
  reconciliation remains necessary.
- Realtime for data that changes rarely is usually unjustified
  complexity over simple polling.
- Ordering guarantees come from your protocol rather than the transport
  (see delivery-guarantees).

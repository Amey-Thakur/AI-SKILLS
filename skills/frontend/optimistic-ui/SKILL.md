---
name: optimistic-ui
description: Apply optimistic updates with correct rollback, conflict handling, and pending cues so mutations feel instant without lying. Use when a mutation feels slow, or when adding or debugging optimistic updates and their rollbacks.
---

# Optimistic UI

Optimistic UI shows the expected result before the server confirms it. It is a
promise the UI makes on the server's behalf, so the whole craft is honoring or
retracting that promise cleanly when the server disagrees.

## Method

1. **Apply it only to high-confidence, low-cost actions.** Likes, toggles,
   reorders, adding a comment, checking a box: cheap to reverse, almost always
   succeed. Do not apply it to payments, irreversible deletes, or anything
   where a wrong optimistic result misleads a consequential decision. When in
   doubt about reversibility, show a pending state and wait.
2. **Snapshot before you mutate.** Capture the previous state before applying
   the optimistic change so rollback is a restore, not a guess. With TanStack
   Query, do this in `onMutate`: cancel in-flight refetches, snapshot the
   cache, write the optimistic value, and return the snapshot as context.
3. **Roll back to the snapshot on error, and tell the user.** On failure,
   restore the snapshot and surface a specific, non-blocking message ("Couldn't
   save, changes reverted") with a retry. Silent rollback is worse than a
   spinner: the user saw success, looked away, and the truth changed with no
   signal. Never leave the optimistic value stranded after a failed request.
4. **Reconcile with the server's authoritative response.** On success, replace
   the optimistic value with the server's returned entity (real id, server
   timestamps, computed fields) rather than trusting your guess. Invalidate or
   refetch the affected queries in `onSettled` so the cache converges to truth
   regardless of success or failure.
5. **Handle conflicts, not just failures.** If the server returns a newer
   version or a 409, the optimistic assumption was stale, not wrong-format.
   Decide the policy: last-write-wins, merge, or prompt the user. Send a
   version token or updated-at so the server can detect the conflict rather
   than clobbering a concurrent edit.
6. **Signal pending state subtly, without blocking.** Keep the optimistic value
   fully interactive and add a quiet in-flight cue (reduced opacity, a small
   inline spinner, a disabled duplicate action). Do not overlay a modal spinner
   that defeats the point. Debounce or queue rapid repeated mutations on the
   same entity so they do not race.

## Boundaries

- Not for irreversible or high-stakes actions; use explicit pending states
  and server confirmation there.
- Multi-user real-time conflict resolution (CRDTs, OT) is a deeper problem
  than single-user optimism and out of scope.
- Requires a cache or store that supports snapshot and rollback; ad-hoc local
  state makes correct rollback hard.

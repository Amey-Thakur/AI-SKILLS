---
name: presence-and-awareness
description: Show who is here, where they are, and what they are doing, at a cost that scales and without leaking more than intended. Use when adding cursors, avatars, or typing indicators to a shared surface.
---

# Presence and awareness

Presence is what makes collaboration feel live: seeing a cursor move
tells you not to edit that paragraph. It is also ephemeral, high
frequency, and privacy sensitive, which makes it a different problem
from document state.

## Method

1. **Keep presence out of the persistent store.** It is transient by
   nature, and writing cursor positions to a database is a load problem
   with no benefit.
2. **Throttle and interpolate.** Send positions at a modest rate and
   smooth between them on the client, since users perceive continuity
   rather than sample rate.
3. **Expire presence rather than trusting disconnect.** Clients vanish
   without saying goodbye, so a heartbeat with a timeout is what removes
   ghosts (see websockets-at-scale).
4. **Scale by room, and cap what is broadcast.** Full presence for
   everyone in a large room is quadratic traffic; above a threshold show
   a count and a sample rather than every cursor.
5. **Make presence a deliberate disclosure.** Being visibly present, and
   visibly idle, is information about a person. Offer invisible or
   view-only modes where the context warrants it (see
   data-minimization).
6. **Distinguish presence from permission.** Seeing someone in a
   document is not the same as knowing what they may do, and the UI
   should not imply otherwise.
7. **Degrade gracefully.** When the presence channel drops, the document
   must keep working; presence is an enhancement, never a dependency.

## Boundaries

- Presence indicates attention approximately; typing indicators and
  idle states are inferred and often wrong.
- Showing identity in shared spaces has privacy implications in some
  contexts, particularly anonymous or public documents.
- High-frequency presence traffic can dominate costs at scale and
  deserves its own budget.

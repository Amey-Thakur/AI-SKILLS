---
name: realtime-scaling
description: Scale collaborative sessions across instances with room routing, shared state, and controlled fan-out. Use when one server can no longer hold all active sessions.
---

# Realtime scaling

Collaboration is stateful, which breaks the usual scaling story of adding
identical instances. Two users in the same document must reach the same
authoritative state, so the architecture question is how rooms map to
instances.

## Method

1. **Make the room the unit of scale.** Route every participant in a
   document to the same instance so ordering and state live in one
   place, which is far simpler than distributed consensus per keystroke.
2. **Route by consistent hashing on the room id.** It keeps routing
   stable as instances come and go, minimising how many rooms move
   during a change.
3. **Persist authoritative state outside the instance.** An instance
   must be replaceable, which means the document state survives its
   death rather than living only in memory (see graceful-shutdown).
4. **Plan room migration deliberately.** Deploys move rooms, so
   participants need to reconnect and resume without losing unsent
   changes (see offline-sync).
5. **Bound room size.** Very large rooms need different behaviour such
   as read-only broadcast beyond a threshold, because fan-out cost grows
   with participants (see websockets-at-scale).
6. **Separate the broadcast path from the persistence path.** Delivering
   an update to peers and durably storing it have different latency
   requirements and failure modes.
7. **Measure per-room, not per-instance.** Averages hide the one
   enormous room that is degrading everyone on its instance.

## Boundaries

- Room affinity trades load-balancing flexibility for simplicity, which
  is usually the right trade and is still a trade.
- Cross-region collaboration adds latency that no architecture removes,
  only manages.
- Very large concurrent editing is a research-grade problem, and most
  products should cap it instead.

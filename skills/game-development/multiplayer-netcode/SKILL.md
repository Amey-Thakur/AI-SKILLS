---
name: multiplayer-netcode
description: Build multiplayer with an authoritative server, client prediction, reconciliation, and lag compensation. Use when adding networking to a game or fixing rubber-banding and desync.
---

# Multiplayer netcode

Physics: photons take ~70ms across an ocean, so everyone plays in the
past. Netcode is the art of hiding that: the server owns truth, clients
predict their own actions, and disagreements reconcile smoothly instead
of teleporting.

## Method

1. **Make the server authoritative.** Clients send *inputs*
   (see game-input-handling's serializable-actions rule), the
   server simulates and broadcasts state: clients render, never
   decide. Client-authoritative positions are speedhacks waiting
   to be written; validate inputs server-side too (rate, ranges:
   see input-validation) because the client is untrusted by
   definition.
2. **Predict locally, reconcile on correction.** The client
   applies its own inputs immediately (zero-latency feel), tags
   each with a sequence number, and keeps a history. When the
   server's state for tick N arrives: if it differs from the
   client's stored prediction at N, rewind to server state and
   replay inputs N+1..now. Done right, corrections are invisible;
   visible rubber-banding means prediction and server simulation
   have drifted (determinism bugs: see game-loop-architecture,
   procedural-generation's determinism rules).
3. **Interpolate everyone else.** Remote entities render
   100-200ms in the past, interpolating between two known
   snapshots: smooth motion at the cost of delay, with
   extrapolation only as a brief packet-loss fallback (it
   overshoots). This buffer is why "my screen" and "their
   screen" differ, which lag compensation exists to arbitrate.
4. **Compensate lag for instant-hit actions.** The server keeps
   position history; when a shot arrives, it rewinds targets to
   what *that shooter saw* (their interpolation time) and
   adjudicates there: shooters get fair hits, victims sometimes
   die behind walls: a tunable fairness trade (cap the rewind
   window). Projectiles with travel time skip compensation;
   design around it where possible.
5. **Send deltas on snapshots, engineer for loss.** Server
   broadcasts at fixed tick (20-60Hz) with delta compression
   against last-acked state and interest management (send only
   what each client can perceive: bandwidth and
   wallhack-resistance together; see least-privilege's spirit).
   UDP-style transport with your own reliability *only* where
   needed (events reliable, state unreliable-latest-wins);
   simulate loss/jitter/latency in dev constantly (see
   chaos-testing): netcode that only met localhost is untested.
6. **Instrument desync detection from day one.** Periodic state
   checksums between server and clients; on mismatch, log the
   first diverging tick and field. Desyncs found at release are
   archaeology; found in CI (replay-based determinism tests:
   fixed input script must produce identical checksums) they
   are diffs (see golden-master).

## Boundaries

- Genre picks the architecture: lockstep-determinism suits RTS
  (tiny bandwidth, needs perfect determinism), rollback suits
  fighting games, snapshot-prediction suits shooters/action;
  do not transplant one genre's netcode into another blindly.
- Matchmaking, sessions, NAT traversal, and anti-cheat are
  adjacent systems (see backend categories, api-security);
  this skill is the simulation loop's networking.
- Physics-heavy interactions (vehicles, ragdolls) resist
  prediction; either simplify their networked behavior or
  accept server-only simulation with interpolation.

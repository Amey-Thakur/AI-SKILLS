---
name: websockets-at-scale
description: Run persistent connections with heartbeats, reconnection, backpressure, and fan-out that survive load and restarts. Use when building realtime features on WebSockets or a similar long-lived transport.
---

# WebSockets at scale

A WebSocket is a connection you must keep alive, account for, and
eventually break on purpose during a deploy. The hard parts are not
opening the socket but holding thousands of them and delivering
messages when some clients are slower than the sender.

## Method

1. **Budget connections as a resource.** Each open socket costs memory
   and a file descriptor on the server and on every proxy in between.
   Know the per-instance ceiling and set limits before you discover it
   under load (see capacity-planning).
2. **Heartbeat, and act on silence.** Ping and pong on an interval
   surfaces half-open connections that TCP alone will not, and idle
   timeouts on intermediaries will close quiet sockets regardless.
   Without heartbeats you accumulate ghosts.
3. **Make the client reconnect politely.** Automatic reconnection with
   exponential backoff and jitter, plus resumption of missed state,
   turns a server restart into a hiccup. Every client reconnecting at
   once is a self-inflicted stampede (see retry-strategies).
4. **Apply backpressure to slow consumers.** Track per-connection send
   queues and coalesce, drop, or disconnect when a client cannot keep
   up. Unbounded queues turn one slow client into an out-of-memory
   event for everyone (see backpressure).
5. **Fan out through a shared bus, not instance memory.** With more
   than one instance, a message published on one must reach
   subscribers on another, so route through a broker and keep
   per-instance state to the socket itself.
6. **Drain deliberately on deploy.** Stop accepting new sockets, ask
   connected clients to reconnect on a stagger, then exit. An abrupt
   restart reconnects everyone simultaneously (see graceful-shutdown).

## Boundaries

- Persistent connections suit push and low latency; polling or
  server-sent events are simpler when updates are one-directional or
  rare.
- Sockets do not survive network changes on mobile, so treat frequent
  reconnection as normal rather than as an error path.
- Ordering and delivery guarantees come from the protocol you build on
  top, not from the transport (see message-ordering, idempotency).

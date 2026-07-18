---
name: distributed-tracing
description: Follow one request across service boundaries using spans, propagated context, and critical-path reading to locate where latency and errors originate. Use when a request is slow or failing and the cause lives between services, not inside any single one.
---

# Distributed tracing

In a mesh of a dozen services, "checkout is slow" names a symptom with no
address. A log gives you one service's account; a trace gives you the whole
conversation with timing attached. Profile each service alone and you polish
the fast ones while the time drains into a call three hops down you never saw.

## Method

1. **Propagate context or the trace snaps at hop one.** Verify every service
   forwards the `traceparent` header (W3C Trace Context) or B3. A dropped
   header spawns a fresh root, and the child spans orphan into a tree you can
   never rejoin to the parent.
2. **Name spans for the operation, not the method.** `handleRequest` says
   nothing; `GET /orders/:id` and `SELECT orders by user` say what ran. Set
   `span.kind` to server, client, or producer so the waterfall nests parent
   and child correctly.
3. **Follow the critical path, not the sum.** In the waterfall, trace the chain
   of spans a later span actually blocked on. A 400ms span running beside a
   900ms sibling is free; the 900ms one owns the budget. Attack the longest bar
   on the blocking path.
4. **Ride baggage for cross-cutting facts.** Put `user.tier` or `feature.flag`
   into OpenTelemetry baggage so it propagates to every downstream span. Later
   you query "traces where tier=free and duration>2s" without threading that
   value through every signature by hand.
5. **Hunt the gap between spans, not only the long ones.** Dead time with no
   child span open is queueing, pool wait, or GC that your instrumentation
   missed. A 300ms hole before the database span is the connection pool
   starving, not the query executing.
6. **Sort errored traces by where status flipped.** Filter `status=error` and
   find the deepest span that set it. Parents inherit the failure, so the leaf
   that first went red is the origin; read its events for the exception.

## Signals

- Can you point to the one span on the critical path that owns most of the
  latency?
- Does a single trace id ride the request from edge to database?
- On a failed request, did you locate the deepest span that first set error?

## Boundaries

Tracing shows where time and errors move between services; it will not explain
why one function is slow inside its own span. For that, drop to a profiler or
add metrics. Sampling means a given one-off trace may not exist at all:
tail-based sampling keeps errors, head-based may discard them.

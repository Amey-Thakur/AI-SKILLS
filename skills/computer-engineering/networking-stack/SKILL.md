---
name: networking-stack
description: Understand the layers between a request and its response, so latency, connection failures, and timeouts can be attributed to the right layer. Use when network behaviour is unexplained or performance varies by geography.
---

# Networking stack

A request crosses several layers, each adding latency and its own
failure modes. Debugging effectively means knowing which layer produced
a symptom: a name that did not resolve, a connection that never
established, or a response that arrived slowly.

## Method

1. **Attribute latency by phase.** Name resolution, connection
   establishment, security handshake, request, and response each take
   measurable time, and the slow one tells you where to look (see
   dns-fundamentals, tls-and-certificates).
2. **Know that connection setup is expensive.** Multiple round trips
   before any data moves, which is why connection reuse and pooling
   matter so much on high-latency links.
3. **Understand the round trip as the unit of cost.** Bandwidth rarely
   limits small requests; the number of sequential round trips does, and
   it is bounded by physics.
4. **Distinguish the failure shapes.** Connection refused, timeout, and
   reset mean different things: nothing listening, no response, and
   forcibly closed respectively.
5. **Expect middleboxes to interfere.** Proxies, firewalls, and load
   balancers terminate connections, buffer, and impose their own
   timeouts, which is where mysterious behaviour usually originates.
6. **Set timeouts at every layer.** Connect, read, and total, since a
   missing timeout at one layer makes the others irrelevant (see
   retry-strategies).
7. **Test on realistic networks.** Mobile and international links behave
   nothing like a local one, and the differences are qualitative rather
   than a slower version of the same thing.

## Boundaries

The stack is deliberately abstracted, and most application code should
not care until it must. Encrypted transport limits what intermediate
inspection can tell you. Cloud networking adds virtual layers with their
own limits and failure modes (see cloud).

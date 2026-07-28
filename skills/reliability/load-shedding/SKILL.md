---
name: load-shedding
description: Reject excess work deliberately under overload so the system serves some requests well instead of failing all of them. Use when traffic spikes cause complete collapse rather than partial service.
---

# Load shedding

An overloaded system that accepts everything serves nothing: queues
grow, latency exceeds every timeout, and all requests fail. Shedding
means choosing what not to serve so the remainder succeeds.

## Method

1. **Decide priority before overload.** Which requests matter most, so
   shedding is a policy rather than whatever the queue drops (see
   rate-limiting).
2. **Reject early and cheaply.** At the edge before expensive work
   begins, since work done then discarded is doubly wasteful.
3. **Return a clear signal.** A proper overload response with retry
   guidance lets clients back off rather than retrying immediately (see
   retry-strategies).
4. **Shed based on measured health.** Queue depth and latency, not just
   request rate, because capacity varies with what requests are doing.
5. **Protect the critical path first.** Health checks and control
   operations must survive, or recovery becomes impossible.
6. **Prevent retry amplification.** Clients retrying shed requests
   multiply load, so the response must discourage immediate retry (see
   thundering-herd).
7. **Alert on shedding.** It is a capacity signal that needs a response
   even though the system is behaving correctly (see capacity-planning).

## Boundaries

Shedding trades some users' requests for the rest, which is a product
decision as much as a technical one. It manages overload and does not
add capacity. Poorly chosen priorities can shed the most valuable
traffic (see graceful-degradation).

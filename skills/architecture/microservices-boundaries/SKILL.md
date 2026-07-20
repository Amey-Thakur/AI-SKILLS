---
name: microservices-boundaries
description: Split services along business capabilities with clear data ownership, avoiding the distributed monolith. Use when decomposing a system into services or diagnosing services that must always deploy together.
---

# Microservices boundaries

The hard part of microservices is not building services; it is drawing
the lines between them. Wrong boundaries produce a distributed
monolith: all the operational cost of microservices with none of the
independence, where every change touches three services and they
deploy in lockstep.

## Method

1. **Split by business capability, not technical layer.** A
   service owns a domain (ordering, billing, inventory) end
   to end, not a tier (there is no "database service" and no
   "API service"). Bounded contexts from the domain (see
   domain-driven-design) are the natural seams; org
   structure will shape them anyway (Conway's law), so
   design the boundaries and the team boundaries together.
2. **Give each service sole ownership of its data.** One
   service, one database, no other service reaching into
   it: services collaborate through APIs and events (see
   event-driven-architecture), never shared tables. A
   shared database is the distributed monolith's spine:
   it couples deploys, schemas, and failures across every
   service that touches it.
3. **Test boundaries against change and chattiness.** Good
   boundaries mean most changes fit inside one service
   (high cohesion) and services talk coarsely (low
   coupling: see coupling-analysis). Warning signs of
   wrong lines: a feature always changing the same three
   services together, or two services making dozens of
   synchronous calls per request (that chatter is one
   service split badly: merge them).
4. **Prefer async collaboration, isolate failure.** Events
   over synchronous call chains where the interaction
   allows (see event-driven-architecture): synchronous
   chains propagate latency and failure (service C down
   takes A and B with it). Where synchronous is necessary,
   add timeouts, retries, and circuit breakers (see
   timeouts-and-retries) so one service's outage does not
   cascade.
5. **Design for independent deployability as the test.**
   The payoff of microservices is deploying one service
   without coordinating the others; if you cannot, you have
   the costs without the benefit. Contract testing (see
   contract-testing, pact-verification) lets services
   evolve independently with confidence; shared libraries
   that force lockstep upgrades quietly recouple them.
6. **Start coarse, split on demonstrated pressure.** Fewer,
   larger services are easier to get right; extract a new
   service when a piece has genuinely different scaling,
   team ownership, or release cadence (see monolith-first,
   strangler-fig for the extraction method). Premature
   fine-grained services multiply operational surface
   before you understand the domain well enough to draw
   lines.

## Boundaries

- Microservices trade in-process simplicity for network
  complexity (partial failure, latency, distributed data:
  see distributed-systems category); the boundary decision
  should clear a real bar (independent scaling, team
  autonomy, isolation), not follow fashion (see
  monolith-first).
- Getting boundaries wrong is expensive to fix (data
  ownership migrations, API contracts); this argues for
  starting with a modular monolith and extracting once the
  seams are proven (see monolith-first, coupling-analysis).
- Shared concerns (auth, config, observability) become
  cross-cutting platform work (see service-mesh-tradeoffs,
  api-gateway-pattern); budget for the platform, or every
  service reinvents it inconsistently.

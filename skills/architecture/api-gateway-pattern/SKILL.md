---
name: api-gateway-pattern
description: Use an API gateway for cross-cutting edge concerns without letting it absorb business logic, including the BFF variant. Use when fronting services with a gateway or untangling a bloated one.
---

# API gateway pattern

A gateway is the single front door to many services, handling the
concerns every client needs and no service should reimplement:
routing, auth, rate limiting, TLS. Its failure mode is scope creep:
the moment business logic leaks in, the gateway becomes a monolith
every team must coordinate through.

## Method

1. **Put edge cross-cutting concerns in the gateway.** TLS
   termination, authentication (verify the token, pass
   identity downstream: see authn-design, jwt-handling),
   rate limiting (see rate-limiting), request routing,
   and common observability (see distributed-tracing's
   entry span): the things every request needs and every
   service would otherwise duplicate inconsistently.
2. **Keep business logic out, ruthlessly.** The gateway
   routes and enforces; it does not know that an order over
   $1000 needs approval: that is a service's job.
   Business rules in the gateway recreate the distributed
   monolith's coupling at the edge, where every team's
   change now waits on the gateway team (see
   microservices-boundaries' coupling warning).
3. **Use the BFF variant for divergent clients.** When a
   mobile app, web SPA, and partner API need genuinely
   different shapes (payload size, aggregation, chattiness:
   see mobile-performance vs a data-rich desktop UI), a
   Backend-for-Frontend per client type does the
   client-specific aggregation and shaping: owned by the
   client team, not a shared gateway. This keeps
   client-driven change out of shared infrastructure.
4. **Let the gateway aggregate carefully, or not at all.**
   Fanning one client request to several services and
   composing the response is a legitimate gateway/BFF job,
   but it makes the gateway a latency-and-failure
   aggregation point (see timeouts-and-retries,
   backpressure): bound every downstream call, degrade
   partially, and do not let one slow service hang the
   whole response. Heavy orchestration belongs in a service
   (see saga-pattern), not the edge.
5. **Treat the gateway as critical infrastructure.** It is
   a single point through which all traffic flows: it needs
   HA, careful capacity planning (see capacity-planning),
   fast independent deploys (a gateway change should not
   require a coordinated release), and graceful
   degradation. A gateway outage is a total outage.
6. **Version and evolve the edge contract deliberately.**
   The gateway often owns the public API surface (see
   api-versioning); route by version, deprecate with
   headers and usage tracking (see api-deprecation), and
   keep the routing config reviewed and versioned (see
   gitops-workflow). The gateway's routing table is
   production-critical config, not a console setting.

## Boundaries

- A gateway adds a hop (latency) and a dependency; for
  internal service-to-service calls it is usually the
  wrong tool (that is service-mesh or direct-call
  territory: see service-mesh-tradeoffs). The gateway is
  the *external* front door.
- Do not confuse the gateway with the service mesh: the
  gateway handles north-south (client-to-system) traffic,
  the mesh handles east-west (service-to-service); they
  solve different problems and are sometimes both present
  (see service-mesh-tradeoffs).
- Managed gateways (cloud API gateways) trade
  configurability for operational relief; evaluate their
  limits (custom auth, latency, cost per request) against
  self-hosted (see managed-vs-selfhosted).

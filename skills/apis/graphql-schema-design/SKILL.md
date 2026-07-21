---
name: graphql-schema-design
description: Design GraphQL schemas that model the domain, solve N+1 with dataloaders, and handle pagination and errors, knowing when REST wins. Use when building a GraphQL API or evaluating GraphQL against REST.
---

# GraphQL schema design

GraphQL lets clients request exactly the data they need in one round
trip, shaped by a typed schema. Its power (flexible client-driven
queries) is also its trap (N+1 resolvers, unbounded query cost); good
schema design models the domain well and defends against the failure
modes GraphQL uniquely enables.

## Method

1. **Model the schema on the domain graph, not the
   database.** Types and their relationships reflect how the
   domain connects (a user has posts, a post has comments),
   letting clients traverse naturally: this is GraphQL's
   strength over REST's fixed endpoints. Design from the
   client's questions and the domain (see domain-driven-
   design), not by mechanically exposing tables.
2. **Solve N+1 with dataloaders from day one.** GraphQL's
   nested resolvers naturally produce N+1 queries (resolving
   100 posts, then 100 separate author queries: see
   n-plus-one-queries): batch and cache within a request
   with dataloaders (collect the IDs, fetch in one query).
   This is not optional optimization; it is required
   architecture, because the N+1 is inherent to how
   resolvers execute.
3. **Paginate with cursors via the connections pattern.**
   Lists use cursor-based pagination (the Relay connections
   spec: edges, nodes, pageInfo: see api-pagination-design)
   for stable pagination over changing data; offset
   pagination breaks as items shift. Bake pagination into
   list fields from the start; retrofitting it is a
   breaking change.
4. **Bound query cost.** Clients can request deeply nested,
   expensive queries (the flip side of flexibility): defend
   with query depth limits, complexity analysis (cost per
   field, reject over-budget queries), and timeouts (see
   backpressure, rate-limiting). An unbounded GraphQL
   endpoint is a self-service denial-of-service; the schema
   must constrain what queries can cost.
5. **Design errors and nullability deliberately.** GraphQL
   returns partial data with an errors array (a resolver
   can fail while others succeed): decide per field whether
   failure nullifies the field or propagates, and use the
   schema's nullability to express what can be absent (see
   null-handling, api-error-responses). The error model is
   subtler than REST's status codes; design it, do not
   inherit it by accident.
6. **Evolve additively, deprecate with the directive.**
   GraphQL evolves without versions: add fields and types
   freely (clients request only what they use), deprecate
   old fields with `@deprecated` and a reason, track usage,
   and remove once unused (see api-deprecation, api-change-
   management). This is a real advantage, but only if you
   monitor field usage before removing.

## Boundaries

- GraphQL is not universally better than REST: REST wins
  for simple CRUD, cacheable public resources (HTTP caching
  is harder in GraphQL: see http-caching), file uploads/
  downloads, and when clients do not need query flexibility.
  Choose per API, not by fashion (see rest-endpoint-design).
- The flexibility shifts complexity to the server (cost
  control, caching, N+1, auth per field): GraphQL is not
  less work, it is different work, concentrated in schema
  and resolver design.
- Field-level authorization is essential and easy to miss
  (a nested field can leak data the top-level query
  authorized: see authz-design); every resolver is a
  security boundary, not just the entry point.

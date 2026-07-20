---
name: dotnet-minimal-apis
description: Build ASP.NET Core minimal APIs with organized endpoint groups, filters, typed results, and a clear line to MVC. Use when structuring .NET HTTP services or deciding between minimal APIs and controllers.
---

# .NET minimal APIs

Minimal APIs strip the ceremony from HTTP endpoints; the risk is the
ceremony was holding the structure. Keep the structure (grouping,
validation, typed contracts) and enjoy the brevity.

## Method

1. **Organize by feature groups, not one Program.cs.** Each feature
   exposes an extension method mapping its group:
   `app.MapGroup("/orders").MapOrders()` with the handlers in that
   feature's folder (vertical slices; see go-project-layout's
   domain-first instinct). Program.cs stays a composition root:
   builder config, DI registrations (see
   dotnet-dependency-injection), middleware order, group mapping.
   A 500-line Program.cs is the new God-controller.
2. **Keep handlers thin, logic injectable.** Handler = bind, call a
   service, translate the result: parameters injected by type
   (services, route/query/body values), logic living in plain
   testable classes (see spring-boot-discipline's identical split).
   Handlers taking eight parameters or containing branching business
   rules have absorbed a service's job.
3. **Return TypedResults, declare the contract.**
   `Results<Ok<OrderDto>, NotFound, ValidationProblem>` as the
   return type: compile-checked status codes and automatic OpenAPI
   metadata (see openapi-contracts) without attribute confetti.
   Error responses go through the problem-details machinery
   (`AddProblemDetails`, exception handler middleware) so failures
   share one shape (see api-error-responses).
4. **Put cross-cutting behavior in endpoint filters, per group.**
   Validation (running the request DTO through your validator:
   see request-validation), idempotency keys on the mutation group
   (see idempotency-keys), tenant resolution (see multi-tenancy):
   as filters on the narrowest group that needs them, not global
   middleware with route sniffing. Auth policies attach at the
   group (`RequireAuthorization("policy")`; see authz-design),
   rate limits likewise (see rate-limiting).
5. **Bind and validate at the edge.** Route/query binding for
   simple values, `[AsParameters]` records for grouped inputs,
   explicit DTOs for bodies: never bind domain entities directly
   (over-posting; see request-validation's reject-unknown rule).
   Validation failures return 400/422 problem responses from the
   filter, before any handler runs.
6. **Know when controllers still earn their keep.** Heavy
   content-negotiation, action-filter ecosystems you already own,
   ApiController conventions a large team has internalized, or
   generated clients tightly coupled to MVC metadata. New services
   default minimal; mixed apps host both side by side during
   migration rather than rewriting for style points (see
   rewrite-vs-refactor).

## Boundaries

- Minimal APIs are still the full ASP.NET pipeline: middleware
  order, DI lifetimes, and async rules apply unchanged (see
  dotnet-async); "minimal" describes the routing surface, not the
  runtime.
- Endpoint filters run per-endpoint after routing; concerns that
  must see every request including unrouted ones (logging,
  security headers: see security-headers) remain middleware.
- OpenAPI generation is only as good as your TypedResults and
  metadata honesty; an endpoint returning untyped `Results` erases
  the contract clients generate against (see api-change-management).

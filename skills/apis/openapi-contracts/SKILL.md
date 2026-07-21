---
name: openapi-contracts
description: Drive API development from an OpenAPI spec as the contract, with linting, codegen, and drift detection. Use when building or documenting REST APIs and wanting the spec to be the single source of truth.
---

# OpenAPI contracts

An OpenAPI spec can be the single source of truth for a REST API:
documentation, client and server code, mocks, and tests all derived
from it. The value comes from making the spec the *contract* everything
else is generated from or checked against, not a document written after
the fact and immediately stale.

## Method

1. **Design spec-first for new APIs.** Write the OpenAPI
   spec before implementing: it forces the interface
   decisions (resources, methods, schemas, errors: see
   rest-endpoint-design, api-error-responses) up front,
   enables parallel work (frontend against a mock, backend
   against the contract), and produces the documentation for
   free. Code-first (annotations generating the spec) is
   viable for existing APIs but tends toward implementation-
   shaped rather than consumer-shaped design.
2. **Lint the spec for consistency.** A spec linter
   (Spectral-class) enforces naming conventions, required
   descriptions, error-response coverage, and org-wide rules
   (see style-guides for the API): so every endpoint across
   the org is consistent and documented, caught at spec-
   review not after shipping. An unlinted spec drifts into
   inconsistency endpoint by endpoint.
3. **Generate clients and server stubs from the spec.**
   Client SDKs (see api-sdk-design), server request/response
   models, and validation from the one spec: so the code
   cannot diverge from the contract, and consumers get typed
   clients without hand-writing them. This is the payoff of
   spec-first: the contract is executable, not aspirational.
4. **Validate requests and responses against the spec at
   runtime.** Middleware that checks incoming requests and
   outgoing responses conform to the spec (in test/staging
   at least): catches the drift where the implementation
   quietly stops matching the contract (a field added in
   code but not the spec, or vice versa: see request-
   validation). Contract and implementation staying in sync
   is the whole point; verify it, do not assume it.
5. **Detect drift in CI.** Compare the spec against the
   actual API behavior (contract tests: see contract-
   testing) and fail the build on divergence; diff spec
   changes in PRs to catch breaking changes (see api-
   change-management: a removed field or tightened type in
   the spec is a breaking change flagged at review). The
   spec is only a source of truth if drift from it is caught.
6. **Serve the spec as living documentation.** Interactive
   docs (Swagger UI / Redoc) generated from the spec, always
   matching the real API because it is the same artifact
   (see api-reference-docs, docs-as-code): consumers explore
   and try endpoints against accurate, current documentation
   instead of a hand-written page that lies.

## Boundaries

- Spec-first requires discipline (writing and reviewing the
  spec before coding); for a quick internal API with one
  consumer it can be overhead, and code-first with
  generated docs suffices. Match the ceremony to the API's
  reach and consumer count.
- The spec captures structure (endpoints, schemas, types),
  not all behavior (business rules, side effects, ordering
  guarantees); those still need prose and examples (see
  api-reference-docs). The spec is necessary, not
  sufficient, documentation.
- GraphQL and gRPC have their own contract mechanisms
  (SDL, proto: see graphql-schema-design, grpc-services);
  OpenAPI is the REST tool. The contract-first principle
  transfers across all three.

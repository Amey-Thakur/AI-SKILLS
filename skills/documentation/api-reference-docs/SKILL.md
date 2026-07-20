---
name: api-reference-docs
description: Produce API reference docs that blend generation with curation, an example per endpoint, and documented errors. Use when documenting an API or SDK for external or internal consumers.
---

# API reference docs

Reference docs answer "how do I call this exactly": every endpoint,
parameter, response, and error. The winning approach blends generation
(complete, never drifts) with curation (examples and guidance a
generator cannot produce), because pure generation is complete but
useless and pure hand-writing is helpful but stale.

## Method

1. **Generate the skeleton from the source of truth.** From
   the OpenAPI/GraphQL schema, proto, or code annotations
   (see openapi-contracts, graphql-schema-design):
   endpoints, parameters, types, and required/optional
   status stay complete and in sync with the actual API
   because they come from it. Hand-maintained parameter
   lists drift the first time someone adds a field.
2. **Curate what generation cannot express.** Every endpoint
   needs a realistic example (request and response, with
   real-looking values), a one-line "when to use this", and
   the non-obvious behavior (side effects, rate limits,
   pagination: see api-pagination-design, rate-limiting).
   The generated schema says a field is a string; the
   curated note says what string and why.
3. **Document every error, not just the happy path.** What
   errors each endpoint returns, what causes them, and how
   to fix them (see api-error-responses): error docs are
   what turn a support ticket into a self-service fix.
   Reference docs that only describe success leave the
   consumer stranded exactly when they need help.
4. **Show authentication and the first real call.** How to
   authenticate (see authn-design, oauth-flows), then a
   complete working example from zero to a successful
   response: the reference doubles as the quickstart's
   detailed backing (see readme-writing's quickstart, which
   links here). A reference nobody can make their first
   call from has failed at its one job.
5. **Keep examples tested and current.** Runnable, verified
   examples (docs-as-code: run them in CI so a breaking
   change fails the docs build too: see docs-as-code): a
   copy-pasted example that errors is worse than none,
   because it destroys trust in the whole reference. This
   is the discipline that keeps generated-plus-curated
   honest.
6. **Version the reference with the API.** Consumers on
   different versions need the docs for *their* version
   (see api-versioning); a single reference that silently
   describes the latest version misleads everyone not on
   it. Deprecations marked clearly with migration paths
   (see api-deprecation).

## Boundaries

- Reference docs answer "how", not "why" or "what should I
  build": conceptual guides and tutorials (see
  tutorial-writing) serve those, and a reference alone
  leaves beginners lost (see docs-information-architecture's
  four-quadrant split).
- Generation quality depends on source annotation quality;
  garbage descriptions in the schema produce garbage docs
  (see structured-output's field-description rule, applied
  to your own API).
- Interactive reference (try-it consoles, request builders)
  raises the value but adds infrastructure; worthwhile for
  public APIs, over-investment for a small internal one.

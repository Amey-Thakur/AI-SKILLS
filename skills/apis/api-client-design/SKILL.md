---
name: api-client-design
description: Build API clients with retries, timeouts, pagination, and error surfacing baked in, and test them properly. Use when writing a client for an external or internal API.
---

# API client design

An API client is where your code meets an unreliable network and
someone else's service. A good client makes the common case simple and
the failure cases handled: timeouts, retries, pagination, and clear
errors built in, so every caller does not reinvent them badly.

## Method

1. **Bake in timeouts and retries.** Every request has a
   timeout (connect and read: never infinite: see timeouts-
   and-retries), and retries with exponential backoff and
   jitter for the retryable failures (timeouts, 429, 5xx),
   respecting Retry-After. This logic lives in the client
   once, correctly, not copy-pasted into every call site
   where half will get it wrong (see the retry-amplification
   warning in timeouts-and-retries).
2. **Surface errors clearly and typed.** Map the API's
   errors (see api-error-responses) into meaningful,
   catchable types the caller can branch on
   (NotFoundError vs RateLimitError vs a transient network
   error), with the useful context (status, error code,
   request ID for support: see observability). A client
   that returns raw HTTP errors or swallows them into a
   generic failure pushes the error-handling burden back
   onto every caller.
3. **Handle pagination for the caller.** Wrap the API's
   pagination (see api-pagination-design) in an iterator or
   auto-paginating method so callers loop over items, not
   pages: `for order in client.orders()` fetching pages
   lazily underneath. Exposing raw page cursors makes every
   caller reimplement the pagination loop, with off-by-one
   bugs.
4. **Manage authentication transparently.** Token
   acquisition, refresh before expiry, and re-auth on 401
   handled inside the client (see oauth-flows, authn-design):
   callers provide credentials once, the client keeps
   requests authenticated. Never put secrets in URLs or
   logs (see secrets-management); the client is where
   auth hygiene is enforced.
5. **Add connection pooling and rate-limit respect.** Reuse
   connections (see connection-pooling: creating a
   connection per request is slow and exhausts sockets),
   and respect the API's rate limits proactively (client-
   side throttling, honoring rate-limit headers: see
   rate-limiting) so you slow down before the API rejects
   you. A client that hammers an API into 429s and then
   retries the 429s is a self-inflicted outage.
6. **Test against contracts and failures.** Test the client
   against a mock or contract (see contract-testing) for the
   happy path, and specifically test the failure handling:
   timeout, 500, 429, malformed response, partial page.
   The value of a client is its failure handling, so that
   is what most needs testing (see test-doubles for mocking
   the external API deterministically).

## Boundaries

- For APIs with an official SDK (see api-sdk-design), use
  it rather than hand-rolling a client; reimplementing
  auth, retries, and pagination the SDK already got right
  is wasted effort and new bugs. Hand-build only when no
  good SDK exists.
- Generated clients (from OpenAPI/proto: see openapi-
  contracts, grpc-services) give the typed request/
  response layer; you may still wrap them with the
  resilience layer (retries, pagination helpers) this
  skill describes.
- The client is a boundary to an untrusted external system;
  validate responses (a malformed response should not crash
  your code: see request-validation applied to responses)
  and never trust the external API's availability or
  correctness.

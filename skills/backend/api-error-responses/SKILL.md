---
name: api-error-responses
description: Return structured problem+json errors with stable codes, retryability signals, and correlation ids. Use when standardizing API error shapes or making failures debuggable across services.
---

# API error responses

An error response is an API for failure. Clients branch on it, dashboards
aggregate it, and support debugs with it; design it with the same care as
the success path.

## Method

1. **Adopt problem+json (RFC 9457) as the single shape.**
   `{"type": "https://api.example.com/errors/insufficient-funds",
   "title": "Insufficient funds", "status": 402, "detail": "...",
   "instance": "/orders/123"}` plus your extensions. One shape for every
   error from every endpoint, including your gateway and framework
   defaults; the client's error handler should never need a second
   parser.
2. **Give every error a stable machine code.** `type` (or a `code`
   extension: `order_not_found`, `rate_limited`) is the branching key;
   `title`/`detail` are prose you may reword freely. Clients matching on
   message strings is a contract you created by not providing codes.
3. **Signal retryability explicitly.** 429 and 503 carry Retry-After;
   include a boolean extension (`"retryable": true`) so clients need no
   status-code folklore. Wrong retryability signals become either give-up
   bugs or retry storms (see timeouts-and-retries).
4. **Structure validation failures per field.** An `errors` array of
   `{field, code, message}` covering all failures at once (see
   request-validation); UIs map them to inputs, and one round trip
   replaces five.
5. **Correlate everything.** Every response (success too) carries a
   request id header; errors echo it in the body. The client shows it in
   "something went wrong"; support pastes it into log search; the
   distributed trace hangs off it (see distributed-tracing).
6. **Say enough, never too much.** 404 for resources the caller cannot
   know exist (hiding vs 403 is an authz decision to make once); no stack
   traces, SQL, internal hostnames, or dependency names in any
   environment facing users. Detail goes in logs keyed by the request id,
   not in the body.
7. **Document errors per endpoint.** The OpenAPI spec lists which codes
   each operation can return and links each `type` URI to a page with
   cause and remedy. An undocumented error is a support ticket with extra
   steps.

## Boundaries

- Do not translate `title`/`detail` server-side for UIs; return codes
  and let the client localize. Server prose is for developers.
- GraphQL and gRPC have their own error channels (errors array, status
  codes plus details); apply the same principles (stable codes,
  correlation), not this exact shape.
- Business outcomes that are expected results ("offer expired") may be
  200s with result types; reserve errors for requests that failed.

---
name: api-testing
description: Test an HTTP API at its boundary so status codes, response schemas, error bodies, and auth paths all hold under real requests. Use when adding or reviewing tests for a service that other clients call over HTTP.
---

# API testing

An HTTP API is a contract you cannot redeploy in lockstep with its clients.
When the status code, the JSON shape, or the 401-versus-403 distinction
drifts, every caller breaks at once and you learn about it from their
incident reports. Testing at the boundary means sending real requests over
HTTP and asserting the whole response, so a contract change fails your build
instead of a customer's.

## Method

1. **Assert the whole response, not just the happy body.** Check status code,
   key headers (`Content-Type`, `Location`, `Cache-Control`), and the body
   together. A 200 with correct JSON but a missing `Content-Type:
   application/json` still breaks strict clients.
2. **Validate the body against a schema, not field by field.** Pin the payload
   to a JSON Schema, an OpenAPI component, or a pydantic model and validate
   against it. This catches an added null field or a widened type that ad hoc
   `assert body["id"] == 5` never sees.
3. **Test error responses as hard as success.** Drive 400, 401, 403, 404, 409,
   and 422 deliberately: malformed JSON, missing field, duplicate key, unknown
   id. Assert the error body shape (code, message, field) so clients can branch
   on it, not just the status.
4. **Walk every auth path.** Send no token, an expired token, a valid token
   with the wrong scope, and a valid token. Assert 401 for absent or bad
   credentials and 403 for authenticated-but-unauthorized: collapsing the two
   leaks whether a resource even exists.
5. **Hit the real HTTP boundary.** Use httpx, requests, supertest, or the
   framework's test client against a running app so routing, middleware,
   content negotiation, and serialization all run. Calling the handler function
   directly skips exactly the layers that break.
6. **Pin the contract against the published spec.** Validate responses against
   the checked-in OpenAPI document, or run consumer contract tests with Pact,
   so a schema change that no test named still fails the build before it ships.

## Checks

- Would a widened type or an extra field in the response body fail a test?
- Does an unauthenticated request get 401 and an unauthorized one 403, each
  asserted separately?
- Do malformed and conflicting requests return the documented error shape, not
  a bare 500?

## Boundaries

This covers one service at its HTTP edge. Cross-service journeys belong to
integration-testing, full user flows to e2e-testing, and the persistence layer
beneath the handler to database-testing. Follow the project's existing client
and schema tooling rather than adding a second assertion style.

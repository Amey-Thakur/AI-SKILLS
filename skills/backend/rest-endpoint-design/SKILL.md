---
name: rest-endpoint-design
description: Model REST endpoints around resources with correct status codes, partial updates, and bulk operations. Use when designing or reviewing HTTP APIs and their URL, method, and response conventions.
---

# REST endpoint design

Endpoints model nouns; methods supply the verbs. When you feel the need
for a verb in the URL, you have usually discovered a missing resource.

## Method

1. **Name collections and items, plural, shallow.** `/orders` and
   `/orders/{id}`; nest one level only for true ownership
   (`/orders/{id}/items`). Deeper nesting bakes today's data model into
   every client's URL builder.
2. **Turn actions into resources.** Not `POST /orders/{id}/cancel` as a
   remote procedure, but `POST /orders/{id}/cancellation` creating a
   cancellation, or `PATCH` of `status`. Long-running work becomes a job
   resource: `POST /exports` returns 202 with a `Location` to poll.
3. **Use the codes clients branch on.** 200 with body, 201 with Location
   on create, 204 for empty success, 400 validation, 401 vs 403
   (unauthenticated vs unauthorized), 404 for both missing and hidden,
   409 conflict, 422 semantic rejection, 429 with Retry-After. Never 200
   with `{"error": ...}` inside; middleboxes and SDKs trust the code.
4. **PATCH for partial update, PUT for replace.** PATCH with merge
   semantics (JSON Merge Patch: null deletes) covers most needs; document
   which semantics you use. Reject unknown fields rather than silently
   dropping them (see request-validation).
5. **Design bulk deliberately.** `POST /orders/batch` taking an array,
   responding 207-style with per-item status in the body; all-or-nothing
   only when the domain is transactional. Unbounded arrays get the same
   limits as pagination.
6. **Make list endpoints predictable.** Cursor pagination, stable sort,
   filter via query params with documented operators; see
   api-pagination-design. Return the same item shape in list and detail,
   trimmed fields only if declared (`?fields=`).
7. **Version the contract, evolve additively.** New fields are safe; type
   changes and removals are a new version. Full policy in api-versioning
   and api-change-management.

## Boundaries

- Internal service-to-service calls with one consumer may prefer RPC
  (see grpc-services); REST purity is not the goal, client predictability
  is.
- Do not tunnel everything through POST to dodge caching and idempotency
  questions; GET/PUT/DELETE idempotency is what makes retries safe.
- HATEOAS beyond a `Location` header and next-page links rarely pays for
  its ceremony in first-party APIs.

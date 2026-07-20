---
name: request-validation
description: Validate requests at the boundary with schemas, reject unknown fields, and return errors clients can act on. Use when hardening API input handling or standardizing validation across endpoints.
---

# Request validation

Validate once, at the edge, into a typed value the rest of the code can
trust. Everything past the boundary should be impossible to construct
invalid.

## Method

1. **Schema-first, one schema per endpoint.** Define the request shape
   declaratively (JSON Schema via OpenAPI, zod, pydantic) and derive both
   the validator and the documentation from it. Hand-rolled if-chains
   drift from docs within a sprint.
2. **Parse, don't just check.** The validator's output is a typed object
   (trimmed strings, parsed dates, enum members), not the raw JSON plus a
   boolean. Downstream code taking `dict`/`any` re-validates forever.
3. **Reject unknown fields on writes.** A typo'd optional field
   (`descripton`) silently accepted is data loss the client discovers
   weeks later. Strictness on request bodies; tolerance is for what you
   read from others (be conservative in what you send, but validate what
   you accept).
4. **Layer the checks.** Shape and types (schema), then domain rules
   (ranges, formats, cross-field: `end > start`), then stateful rules
   (uniqueness, existence, permissions) inside the transaction where they
   are race-free. Shape failures are 400; semantic failures 422; state
   conflicts 409.
5. **Return all field errors at once, machine-readably.** Problem+json
   with a per-field list:
   `{"errors": [{"field": "email", "code": "format", "message": ...}]}`.
   One-error-at-a-time forces clients into a submit loop; codes let UIs
   localize (see api-error-responses).
6. **Bound everything.** Max body size, max string lengths, max array
   items, max nesting depth, at the schema and the server config both.
   Validation that allocates unbounded input first is a DoS vector, not a
   defense.
7. **Never echo hostile input raw.** Error messages include the field
   name and constraint, not megabytes of the offending value; log the
   details server-side with the request ID.

## Boundaries

- Validation is not sanitization: reject invalid input rather than
  mutating it into validity, except for benign normalization (trim,
  case-fold emails) that is documented.
- Authorization is not a validation layer concern; a well-formed request
  for someone else's resource is 404/403 territory decided in the
  handler (see authz-design).
- Client-side validation is UX; only the server's validation is a
  security boundary.

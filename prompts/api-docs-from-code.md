---
name: api-docs-from-code
description: Generate accurate reference documentation for an API from its code, marking every inference.
variables:
  - "{code}: the endpoint handlers, route definitions, or public functions"
  - "{audience}: who consumes the API (internal team, external developers)"
settings: "Temperature 0-0.3."
---

Write reference documentation for the API below, for {audience}.

For each endpoint or public function:
- **Name and purpose**: one sentence on what it does for the caller.
- **Signature**: method and path (or function signature), parameters with
  types, which are required, and defaults where the code shows them.
- **Request example**: one realistic call, using only field names present
  in the code.
- **Response**: the success shape with field meanings, plus each error the
  code actually returns (status, condition, body shape).
- **Notes**: auth requirements, rate limits, idempotency, pagination, but
  only where the code or its middleware shows them.

Rules:
- Document what the code does, not what it should do. Where behavior is
  unclear from the code alone, write [verify: question] rather than
  guessing.
- Keep descriptions to the caller's perspective; internals stay out unless
  they leak into behavior.
- Order endpoints by resource, then by the natural usage sequence.
- End with a "Not documented" list naming anything you skipped and why.

<code>
{code}
</code>

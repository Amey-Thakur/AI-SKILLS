---
description: "Design a clean REST or GraphQL API from requirements, with sensible resources, methods, status codes, and error shapes."
argument-hint: "[requirements]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Design an API for: {requirements}

Style and constraints: {style}

Produce:
1. The resources/entities and how they relate, modeled from the domain.
2. The endpoints (REST) or schema (GraphQL): for REST, resource-based paths,
   the right HTTP methods, and correct status codes (200/201/204, 400/401/403/
   404/409/422/429); for GraphQL, the types, queries, mutations, and how
   pagination works. Turn actions into resources rather than RPC-style verbs in
   URLs.
3. Request and response shapes for the key operations, with an example each.
4. The consistent error response shape (a structured, machine-readable error
   with a stable code and a message; see problem+json), and how errors signal
   retryability.
5. Cross-cutting decisions: authentication, pagination (cursor over offset for
   large lists), filtering/sorting conventions, versioning approach, and
   idempotency for unsafe operations.

Rules: design for the consumer's ergonomics, not your database schema (the API
is a contract, not a table dump). Consistent conventions across all endpoints.
Correct, predictable status codes clients can branch on. Evolve additively
(new optional fields safe; breaking changes get a version). Validate input at
the boundary. Flag anywhere the requirements are ambiguous enough to change the
design, and state your assumptions.

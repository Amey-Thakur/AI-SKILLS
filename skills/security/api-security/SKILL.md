---
name: api-security
description: Secure an API by enforcing per-object authorization, per-caller quota, and schema-validated input on every endpoint. Use when building or reviewing an HTTP or GraphQL API that serves authenticated users, machine clients, or partner integrations.
---

# API security

Every endpoint makes a silent promise about who may touch which object and in
what shape. The flaws that dominate the OWASP API Top 10 are dull, not clever:
a handler that trusts the ID in the path, a parser that swallows fields it was
never told about, an endpoint with no ceiling that one client drains. Each one
ships green through functional tests and breaks on the first deliberate probe.

## Method

1. **Authorize the object, not only the route.** Once the caller is
   authenticated, verify this caller may access this exact record before you
   return it. `GET /invoices/5567` must confirm invoice 5567 belongs to the
   token's tenant. Broken object-level authorization (BOLA) is the most
   exploited API flaw, and route middleware never sees the record ID.
2. **Validate the body against a closed schema.** Model every request with
   Zod, Pydantic, or JSON Schema that pins types, formats, bounds, and
   `additionalProperties: false`. Reject unknown keys outright so a client
   cannot slip `is_admin: true` into a profile update that mass-assigns.
3. **Serialize through an output allowlist.** Build responses from an explicit
   field list, never the raw ORM row. Dumping the whole record leaks
   `password_hash`, internal flags, and columns from joined tables.
4. **Meter every caller and weight expensive calls.** Give each token a rate
   bucket, charge search and export more than a point read, and cap page size
   and GraphQL query depth so one call cannot pull 50,000 rows or nest
   resolvers without limit.
5. **Issue machine clients scoped, expiring credentials.** Grant API keys or
   OAuth client-credentials the narrowest scopes the integration uses, set an
   expiry, and support rotation with overlap. One omnipotent static key is a
   single leak away from full compromise.
6. **Return errors that say nothing extra.** Send 401 versus 403 correctly but
   keep bodies generic: no stack traces, no SQL fragments, no "wrong password"
   message that confirms an account exists.

## Checks

- Does requesting another tenant's object ID return 403 rather than the data?
- Does a body with one unexpected field get rejected, not silently accepted?
- Does a scripted loop actually hit a per-caller quota and get throttled?
- Do 500 responses omit stack traces and internal identifiers?

## Boundaries

This covers authorization, input, and quota at the application layer. It does
not replace transport security (see tls-configuration), a gateway's network
controls, or the identity provider that mints tokens. Framework defaults rarely
enforce object-level checks: assume you write those by hand.

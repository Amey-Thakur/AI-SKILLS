---
name: authz-design
description: Enforce authorization so access is denied by default and every request re-checks that the caller owns the specific resource, closing IDOR gaps. Use when building endpoints that read or modify data belonging to a particular user or tenant.
---

# Authorization design

Authorization decides what an authenticated user may touch, and it fails
quietly: the endpoint works perfectly for the owner and just as well for
anyone who guesses another ID. The fix is to deny by default and check
ownership of the exact object on every request, not merely that the caller
is logged in.

## Method

1. **Deny by default, allow by explicit grant.** Start every endpoint and
   resource from "no access" and open only what a rule permits. A new route
   with no authz check should be unreachable, not wide open. Centralize the
   check so adding an endpoint cannot mean forgetting one.
2. **Check ownership of the specific resource, every time.** Being logged in
   is not permission to read order 1043. Verify the current user owns or may
   access that exact object: `WHERE id = ? AND owner_id = ?`, or an explicit
   policy call. This single check closes insecure direct object reference
   (IDOR), the most common access bug.
3. **Never trust an ID, role, or scope from the client.** Take the acting
   user from the server-side session, not a request field. A `user_id`,
   `is_admin`, or `role` in the body or an editable JWT claim is a request
   to be that user, not proof of it. Re-derive authority server-side.
4. **Enforce authorization on data access, server-side.** Hiding a button or
   filtering a list in the UI is convenience, not security; the raw endpoint
   still answers. Put the check at the query or service layer where the data
   is read or written, so every caller path hits it.
5. **Scope every multi-tenant query by tenant.** In a shared database, add
   the tenant boundary to each query, and enforce it with row-level security
   (Postgres RLS) or a mandatory scoping layer. One unscoped query leaks
   across customers.
6. **Centralize policy and default new resources to private.** Express rules
   in one place (a policy module, Oso, Casbin, framework guards) rather than
   scattering `if role ==` across handlers. When a new object type appears,
   its default visibility is private until a rule opens it.

## Signals

- Change the ID in a request to another user's object: do you get 403/404,
  or their data?
- Is the acting identity read only from the session, never from a
  client-supplied field?
- Does every tenant-scoped query include the tenant filter, checked by grep
  or a test?

## Boundaries

Authorization assumes authentication already proved who the caller is; the
two are separate and both required. This skill covers enforcing access, not
designing the role or permission model, which follows your domain. For
complex rules adopt a dedicated policy engine rather than growing
conditionals; the line is where scattered checks stop being auditable.

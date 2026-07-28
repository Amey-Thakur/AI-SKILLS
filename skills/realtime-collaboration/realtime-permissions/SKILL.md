---
name: realtime-permissions
description: Enforce and revoke access on live connections so a permission change takes effect immediately rather than at the next page load. Use when shared documents have varying access levels.
---

# Realtime permissions

Permissions on a persistent connection are harder than on a request,
because the check happened once at connect time and the connection may
outlive the grant. Revocation that only applies to new sessions is not
revocation.

## Method

1. **Authorise every operation, not just the connection.** A connection
   established with edit rights must still be checked per change, since
   rights can change mid-session (see authz-design).
2. **Push permission changes to affected clients immediately.** Revoked
   users are disconnected or downgraded in place, and the interface
   reflects it without a reload.
3. **Scope subscriptions to what the user may see.** A client that
   receives updates it should not see has already leaked, whatever the
   interface renders (see agent-context-isolation for the analogous
   boundary).
4. **Handle downgrade gracefully.** A user losing edit rights mid-edit
   needs their pending change resolved honestly, either accepted or
   clearly rejected with an explanation.
5. **Separate document sharing from presence visibility.** Being able to
   read a document does not imply being visible to others in it (see
   presence-and-awareness).
6. **Make link sharing explicit and revocable.** Anyone-with-the-link
   access must be visible to the owner, expirable, and revocable, since
   links spread beyond intent.
7. **Log access changes.** Who granted what to whom and when is what
   answers the later question of how someone saw a document (see
   audit-logging).

## Boundaries

- Server-side enforcement is the only enforcement; hiding controls in
  the client is presentation, not security.
- Data already delivered cannot be recalled, so revocation limits
  future access only.
- Fine-grained permissions raise the cost of every operation and need
  caching designed with invalidation in mind.

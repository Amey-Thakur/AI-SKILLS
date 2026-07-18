---
name: session-management
description: Handle sessions so identifiers rotate on privilege change, expire on inactivity, can be revoked server-side, and ride only on hardened cookies. Use when issuing, storing, or validating session tokens after a user signs in.
---

# Session management

A session is the credential a user carries after login, so a stolen or stale
session is a stolen identity. The dangers are a token that never dies, one
that survives a password change, and one exposed to script or sent in the
clear. Good session handling is about controlling the token's lifetime and
reach.

## Method

1. **Set the cookie flags that lock the token down.** Mark session cookies
   `HttpOnly` (script cannot read them), `Secure` (HTTPS only), and
   `SameSite=Lax` or `Strict` (limits cross-site sending). Scope with `Path`
   and avoid a wildcard `Domain`. These four attributes block the cheapest
   theft routes.
2. **Rotate the session ID on every privilege change.** Issue a new
   identifier at login, at logout, and when a user elevates (assumes admin,
   re-authenticates for a sensitive action). Rotation defeats fixation and
   shrinks the window a captured pre-elevation token is worth anything.
3. **Expire on both idle and absolute timeouts.** Enforce an inactivity
   timeout (for example 30 minutes) and a hard maximum lifetime (8 to 24
   hours) after which re-login is required regardless of activity. A token
   that lives forever is a permanent key once copied.
4. **Store sessions server-side so you can revoke them.** Keep a server
   record (a session store, Redis, a table) keyed by an opaque random ID, so
   logout, a password reset, or an admin action can delete it and end the
   session at once. If you use stateless JWTs, add a revocation list or keep
   lifetimes very short, because a plain JWT cannot be recalled.
5. **Generate identifiers from a CSPRNG.** Use at least 128 bits from a
   cryptographically secure source (`secrets.token_urlsafe`,
   `crypto.randomBytes`), not a counter, a timestamp, or `Math.random`. A
   guessable session ID is an open door that needs no theft.
6. **Invalidate sessions on the events that demand it.** On logout, delete
   the server record, do not just clear the cookie. On password change or
   reset, revoke that user's other sessions so a thief already inside is
   evicted.

## Checks

- Do the response headers show `HttpOnly`, `Secure`, and `SameSite` on the
  session cookie?
- After a password reset, are the user's other active sessions rejected on
  their next request?
- Does an idle session stop working after the timeout, verified by waiting
  past it?

## Boundaries

Session management picks up after authentication succeeds and hands off to
authorization for per-request access decisions. It does not cover the login
flow itself (see authn-design) or token-based API patterns like OAuth bearer
tokens, whose lifecycle differs. Framework session middleware handles most
of this correctly; the risk is in overrides and custom stores.

---
name: browser-storage-safety
description: Decide where a web app keeps tokens and state by reasoning about the XSS blast radius of each store, not by convenience. Use when choosing how to persist session tokens, auth state, or any value an attacker on your origin would want to read.
---

# Browser storage safety

Every storage choice is a wager on the day your page runs attacker
JavaScript. `localStorage` is readable by any script on the origin; a cookie
can be closed to scripts entirely. The tempting default, a JWT in
`localStorage`, hands your sessions to the first cross-site scripting flaw and
lets the token walk out to be replayed later. Choose the store by how much a
single injection can steal.

## Method

1. **Keep the session token in an HttpOnly cookie.** With `HttpOnly` set,
   injected script cannot read the token through `document.cookie`. An XSS can
   still act while the tab is open, but it cannot lift the token and reuse it
   from another machine an hour later.
2. **Refuse localStorage for anything secret.** `localStorage` and
   `sessionStorage` are cleartext and origin-readable, so one line of injected
   script reads every key at once. Reserve them for non-secret UI state: theme,
   last tab, a draft whose leak would not matter.
3. **Set the full cookie attribute set.** Add `Secure` so it rides only HTTPS,
   `SameSite=Lax` or `Strict` to blunt cross-site request forgery, and a
   `__Host-` prefix to bind it to the exact origin with no `Domain` widening.
   Keep `Path` no broader than the routes that need it.
4. **Add a CSRF token where SameSite does not reach.** `SameSite` cuts most
   cross-site forgery but not every case, so verify a per-session anti-CSRF
   token or require a custom request header on state-changing calls.
5. **Consider an in-memory access token for SPAs.** Hold a short-lived access
   token in a JavaScript variable and refresh it from an HttpOnly cookie: it
   never touches disk and dies on reload. The cost is a refresh call on each
   page load.
6. **Fix the XSS, because storage only caps the damage.** A strict
   Content-Security-Policy, output encoding, and framework auto-escaping stop
   the injection that makes storage moot. Cookie flags shrink the blast radius;
   they do not close the hole that opened it.

## Litmus tests

- If an attacker runs one line of script on your origin, can they exfiltrate
  the long-lived token, or only act while the tab is open?
- Is the session cookie `HttpOnly`, `Secure`, `SameSite`, and `__Host-`
  prefixed where possible?
- Does `localStorage` hold only values whose leak would not compromise anyone?
- Do state-changing requests carry protection beyond SameSite alone?

## Boundaries

This limits XSS blast radius through storage choice; it does not prevent XSS
(that is encoding and CSP) or design the token lifecycle (see jwt-handling).
Native apps and server-rendered sessions follow other models. When an auth
library sets its own cookie policy, verify the flags rather than trust them.

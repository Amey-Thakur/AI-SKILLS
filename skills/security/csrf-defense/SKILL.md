---
name: csrf-defense
description: Block cross-site request forgery with SameSite cookies, per-session anti-CSRF tokens, and strict HTTP method discipline so a forged cross-origin request cannot act as the user. Use when building state-changing endpoints authenticated by cookies.
---

# CSRF defense

Cross-site request forgery abuses the browser's habit of attaching your
cookies to every request to your site, including one triggered by a
malicious page. The user is authenticated, so the forged request succeeds.
The defense proves a request came from your own application, not merely from
a browser that happens to hold a valid cookie.

## Method

1. **Set session cookies to SameSite=Lax or Strict.** `SameSite=Lax` stops
   the cookie from riding along on cross-site POSTs, which kills most CSRF
   outright. Use `Strict` for high-value sessions where following a link
   should require re-establishing context. This is your baseline, not your
   only layer.
2. **Add anti-CSRF tokens for state-changing requests.** Issue an
   unpredictable per-session or per-request token, embed it in forms, and
   read it back from a header or body field. Reject any POST, PUT, PATCH, or
   DELETE whose token is missing or wrong. An attacker's page cannot read
   your token, so it cannot forge the request.
3. **Keep GET safe and side-effect free.** Never change state on a GET.
   Reserve mutations for POST, PUT, PATCH, DELETE. Method discipline is what
   lets SameSite and token checks target the requests that matter; a
   state-changing GET slips past both.
4. **Pick the synchronizer or double-submit pattern deliberately.** The
   synchronizer token stores the value server-side; double-submit puts it in
   both a cookie and a request header and compares them, useful for
   stateless APIs. Choose one and apply it consistently rather than mixing
   half of each.
5. **Verify Origin and Referer on sensitive actions.** For requests that
   move money or change credentials, check that the `Origin` (or `Referer`)
   header matches your host, and reject a mismatch. It is a cheap second
   signal that costs an attacker a header the browser will not let them
   forge.
6. **Exempt token auth, not cookie auth.** APIs authenticated by a bearer
   token in an `Authorization` header are not CSRF-prone, because the
   browser does not attach that header automatically. Confirm the endpoint
   truly requires the header and does not also accept the cookie, or the
   exemption reopens the hole.

## Checks

- Do your session cookies carry `SameSite=Lax` or stricter, confirmed in the
  response headers?
- Does every state-changing endpoint reject a request with a missing or
  altered CSRF token?
- Can you confirm no GET endpoint mutates state?

## Boundaries

CSRF defense assumes the session itself is sound; it does nothing against a
stolen token or an XSS payload running on your own origin, which bypasses
same-origin protections entirely. Login and logout forms need CSRF
protection too. For pure token-in-header APIs with no cookie auth, these
controls are unnecessary rather than optional.

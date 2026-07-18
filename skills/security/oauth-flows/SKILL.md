---
name: oauth-flows
description: Implement OAuth 2.0 and OpenID Connect flows that bind the request end to end with PKCE, state, and exact redirect allowlists. Use when adding "sign in with" a provider, integrating a third-party API on a user's behalf, or reviewing an OAuth client.
---

# OAuth flows

OAuth hands a third party a token to act as your user, so every gap in the
flow is a path to account takeover. The dangerous mistakes are predictable:
an authorization code interceptable in transit, a missing state check that
opens cross-site request forgery, and a loose redirect that ships the code
to an attacker's site. A correct implementation binds the request end to end
and never trusts a redirect target it did not preregister.

## Method

1. **Use the authorization code flow with PKCE, always.** Send a
   `code_challenge` on the authorization request and the `code_verifier` on
   the token exchange, for confidential and public clients alike. PKCE binds
   the code to the client that started the flow, so an intercepted code is
   useless. Do not use the deprecated implicit flow.
2. **Generate and verify `state` on every request.** Create a random
   `state`, store it in the user's session, and reject the callback if the
   returned value does not match. Without it, an attacker can graft their
   own authorization onto your user's session.
3. **Allowlist exact redirect URIs.** Register full redirect URLs at the
   provider and match them exactly server-side: no wildcards, no trusted
   path suffix. A loose match such as `https://app.com/*` lets an attacker
   redirect the code to their own host.
4. **Exchange the code from the backend.** Perform the token exchange
   server to server with the client secret, never in the browser. The
   authorization code stays single-use and short-lived, and the tokens never
   touch client-side JavaScript.
5. **Validate the ID token and request minimum scopes.** For OpenID Connect
   verify the ID token's signature, `iss`, `aud`, and `nonce`, and ask only
   for the scopes the feature needs. Do not treat a valid token issued to
   one client as authorization for another.
6. **Store tokens and refresh securely.** Keep refresh tokens server-side,
   place access tokens in httpOnly, Secure, SameSite cookies rather than
   localStorage, and rotate refresh tokens on use so a stolen one is
   detectable.

## Signals

- Does the flow send a PKCE `code_challenge` and reject a token exchange
  with the wrong `code_verifier`?
- Is a callback with a missing or mismatched `state` rejected?
- Does a `redirect_uri` that is not on the exact allowlist fail before any
  code is issued?
- Are tokens held server-side or in httpOnly cookies, never in localStorage?

## Boundaries

This covers implementing the flows as a client or relying party, not running
an authorization server, which carries its own token-issuance and consent
duties. What a token authorizes once validated is an access-control question
(see least-privilege). Follow your provider's documented endpoints and any
extensions they require.

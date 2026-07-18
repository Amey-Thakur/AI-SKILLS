---
name: jwt-handling
description: Use JSON Web Tokens safely by pinning the algorithm, keeping lifetimes short, and pairing them with a revocation path. Use when issuing or validating JWTs, designing a session scheme around them, or reviewing token-based auth.
---

# JWT handling

A JSON Web Token is a signed claim the server trusts without a database
lookup, which is exactly what makes it dangerous when handled loosely. The
classic failures are letting the token pick its own algorithm, trusting a
token that never expires, and having no way to kill a session before it
does. Safe handling pins the algorithm, keeps access lifetimes short, and
gives you a way to revoke.

## Method

1. **Pin the accepted algorithm server-side.** Configure the verifier with
   an explicit allowlist such as `algorithms=["RS256"]` and reject anything
   else. Never trust the token header's `alg`: the `alg: none` bypass and
   the RS256-to-HS256 confusion attack both come from letting the token
   choose.
2. **Verify the signature before reading any claim.** Validate the
   signature, `iss`, `aud`, and `exp` in one vetted call, for example
   `jwt.decode` with verification on and required claims listed, before
   trusting the payload. A decoded but unverified token is attacker
   controlled JSON.
3. **Keep access tokens short-lived.** Set `exp` to 5 to 15 minutes for
   access tokens. A short window bounds how long a stolen token works and
   pushes long-lived state onto a refresh token you can revoke.
4. **Use refresh tokens for longevity and rotate them.** Issue an opaque
   refresh token stored server-side, rotate it on each use, and treat reuse
   of a rotated token as theft by revoking the whole family. This gives you
   the revocation JWTs lack.
5. **Build a revocation path, do not rely on expiry alone.** Keep a denylist
   of token IDs (`jti`) or a per-user token version checked on refresh, so
   logout, password change, and compromise invalidate immediately. Bumping
   the user's token version kills every outstanding session at once.
6. **Sign asymmetrically and keep the payload public-safe.** Use RS256 or
   ES256 so verifiers hold only the public key, keep the private key in a
   KMS, and put no secrets in the payload: a JWT is signed, not encrypted,
   and anyone can read it.

## Litmus tests

- Does the verifier reject a token with `alg: none` and one re-signed under
  a different algorithm?
- Does an access token expire within minutes, not days?
- Can you invalidate a specific user's sessions right now, before their
  tokens expire?
- Is the payload free of secrets, given anyone holding the token can decode
  it?

## Boundaries

This covers issuing and validating JWTs, not the login that authenticates
the user or the OAuth flow that may mint them (see oauth-flows). Whether to
use stateless JWTs at all versus server-side sessions is a trade-off:
sessions revoke more simply. Library choice and claim conventions follow
your framework.

---
name: authn-design
description: Design sign-in so credentials are hashed with a slow algorithm, guessing is rate limited, and sessions rotate on login to defeat fixation. Use when building or reviewing registration, login, or password-reset flows.
---

# Authentication design

Authentication is where an attacker meets your front door, so the failures
are expensive: a leaked password database, a brute-forced account, a
hijacked session. The safe path is well-known and boring, and the danger is
in the shortcuts: home-rolled hashing, no throttling, a session ID that
survives login.

## Method

1. **Hash passwords with a slow, salted algorithm.** Use bcrypt, scrypt, or
   Argon2id with a per-user salt (the library adds it) and a work factor
   tuned to roughly 250 ms per hash. Never use MD5, SHA-1, or a bare
   SHA-256: they are built for speed, which is exactly what an offline
   cracker wants.
2. **Rate limit and lock out credential guessing.** Cap login attempts per
   account and per IP: exponential backoff after 5 failures, a temporary
   lock after 10. Apply the same throttle to password-reset and MFA
   endpoints. Without it, weak passwords fall to a script overnight.
3. **Rotate the session ID on login.** Issue a fresh session identifier the
   moment authentication succeeds and invalidate the pre-login one. Reusing
   the anonymous session's ID lets an attacker who planted that ID ride into
   the authenticated session (session fixation).
4. **Return identical responses for unknown user and wrong password.** "No
   such user" versus "wrong password" hands an attacker a roster of valid
   accounts. Use one generic message and a constant-time comparison so
   timing does not leak the difference either.
5. **Enforce strength by length and a breach check.** Require 12+
   characters, allow long passphrases and pasting, and screen new passwords
   against a known-breach list (the Have I Been Pwned k-anonymity API). Drop
   forced rotation and composition rules that only push users toward
   `Password1!`.
6. **Treat reset tokens like credentials.** Make password-reset tokens long,
   random, single-use, and short-lived (under an hour), and store only their
   hash. A reset link that never expires is a permanent backdoor sitting in
   an old inbox.

## Litmus tests

- If the database leaked today, how long would offline cracking take against
  your hashes?
- Does login rotate the session ID, confirmed by watching the cookie change
  before and after?
- Do wrong-password and unknown-user attempts return the same message and
  similar timing?

## Boundaries

This skill covers password-based sign-in. Multi-factor authentication,
OAuth/OIDC federation, and passkeys are adjacent designs with their own
trade-offs; add them, but get the password path right first. Authorization
(what an authenticated user may do) is handled in authz-design, and ongoing
session handling lives in session-management.

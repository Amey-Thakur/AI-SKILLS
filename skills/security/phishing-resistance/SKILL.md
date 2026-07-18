---
name: phishing-resistance
description: Design authentication whose credentials cannot be relayed to a look-alike site, using origin-bound passkeys and hardware keys over phishable codes. Use when choosing MFA factors, building a passkey flow, or reviewing account recovery.
---

# Phishing resistance

Most multi-factor authentication still ships the secret to whoever asks.
A modern phishing kit proxies your real login page, catches the one-time
code, and replays it within seconds. The only durable fix is a credential
the browser refuses to hand to the wrong origin, so factor choice, not the
presence of "MFA," decides whether you survive.

## Method

1. **Prefer origin-bound WebAuthn credentials.** Register passkeys or
   FIDO2 hardware keys through the WebAuthn API. The authenticator signs a
   challenge scoped to your exact RP ID, so a credential minted for
   `example.com` produces nothing usable at `examp1e.com`. That binding is
   what "phishing-resistant" literally means.
2. **Rank factors by phishability, not by count.** Passkeys and FIDO2 keys
   resist relay; TOTP apps and push approvals do not; SMS one-time codes
   are worst, exposed to SIM swap on top of relay. A reverse-proxy kit like
   Evilginx forwards any code-based factor live, so "we have MFA" is not
   "we resist phishing."
3. **If push must stay, require number matching and cap prompts.** Show a
   two-digit number on the login screen that the user types into the app,
   and rate-limit prompts per account. A bare approve/deny push trains
   users to tap approve and falls to MFA-fatigue bombing.
4. **Verify origin and challenge server-side on every assertion.** Scope
   `rpId` to your registrable domain, set `userVerification: 'required'`
   for step-up, and reject any assertion whose origin or challenge does not
   match what you issued. Skipping the origin check reopens the exact hole
   WebAuthn closed.
5. **Harden recovery, because that is what gets phished now.** Never let an
   SMS code or a security question reset away a passkey. Require a second
   registered authenticator, an out-of-band verified process, or a signed
   recovery code issued at enrollment.
6. **Register two authenticators at enrollment.** Require a backup key or a
   synced passkey so a lost phone does not force the user onto a weak
   fallback. Store each credential ID and let users name and revoke them.
7. **Use attestation where assurance matters.** For regulated or
   high-value access, request attestation to confirm the authenticator
   model meets your bar (hardware-bound, FIPS) and gate that path at AAL3
   per NIST SP 800-63B.

## Litmus tests

- Tested through a proxy, does a credential registered on your real origin
  fail to authenticate against a look-alike domain?
- If an attacker phishes a live TOTP or push approval, can they reach the
  account, and why is that factor still allowed for sensitive actions?
- Can account recovery silently downgrade a passkey user back to SMS, and
  who signed off on that path?

## Boundaries

This skill covers resisting credential phishing at the moment of
authentication. The password hashing, throttling, and session rotation
baseline lives in authn-design; federated sign-in trade-offs belong to
oauth-flows; and what a user may do once authenticated is authz-design.

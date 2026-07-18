---
name: zero-trust-basics
description: Apply zero trust by authenticating and authorizing every request on its own merits and issuing only short-lived, narrowly scoped credentials. Use when designing service-to-service access, internal tooling, or any system that still trusts requests because of where they came from.
---

# Zero trust basics

The network perimeter stopped being a trust boundary the moment the first
service got popped and used to reach everything behind the firewall. Zero
trust replaces "inside the network, therefore trusted" with a per-request
question: is this specific caller, right now, allowed to do this specific
thing? The two levers are verifying identity everywhere and keeping the
credentials that prove it short-lived.

## Method

1. **Authenticate every request, including internal ones.** Require a verified
   identity on service-to-service calls, not just at the edge. Give each
   workload its own identity (SPIFFE/SPIRE, a signed service account, mutual
   TLS certificate) so a call's origin IP or subnet grants it nothing.
2. **Authorize per request against explicit policy.** Check identity plus the
   action and resource on each call, evaluated by a policy engine (OPA, Cedar,
   or your framework's equivalent) rather than a static "this service may talk
   to that one" firewall rule. Default deny, and grant the least scope the
   caller needs.
3. **Issue short-lived credentials and rotate automatically.** Prefer tokens
   and certificates measured in minutes to hours, minted on demand from a
   broker like Vault, an OIDC provider, or a cloud instance-identity service.
   A credential that lives for minutes is worth far less stolen than a static
   key that never expires.
4. **Kill long-lived static secrets.** Replace embedded API keys and shared
   passwords with workload identity and dynamic credentials. Where a static
   secret is unavoidable, put it in a manager with rotation and audit, never
   in code, environment files committed to git, or an image layer.
5. **Encrypt in transit end to end.** Enforce mutual TLS between services so
   both ends prove identity and traffic is confidential on the internal
   network too. "It is internal" is not a reason to send plaintext.
6. **Log and continuously verify access decisions.** Emit an auditable record
   of who accessed what, and factor device posture or risk signals into the
   decision where you can, so trust is re-evaluated rather than granted once
   at login and assumed forever.

## Litmus tests

- If an attacker lands on one internal host, does its network position let it
  call other services, or does each call still demand a valid identity?
- Do service credentials expire in hours or less and rotate without a human?
- Are there any static, non-expiring keys in code, env files, or images?
- Is internal service-to-service traffic mutually authenticated and encrypted?

## Boundaries

Zero trust is an architecture direction, not a product you install, and it
does not remove the need for network segmentation, patching, or the specific
controls in oauth-flows and secrets-management. Migrating a legacy system is
incremental: start with the highest-value paths rather than attempting a
flag-day cutover.

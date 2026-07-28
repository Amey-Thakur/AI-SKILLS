---
name: api-credential-rotation
description: Store, scope, and rotate integration credentials so a leak is survivable and rotation does not cause an outage. Use when managing keys for external services.
---

# API credential rotation

Integration credentials are long-lived, broadly scoped, and shared
between systems, which makes them the most commonly leaked secret and
the most disruptive to rotate if rotation was never designed.

## Method

1. **Scope every credential to the minimum.** Read-only where possible
   and per-integration rather than one key used everywhere (see
   authz-design).
2. **Store in a secret manager, never in code or config files.** Both
   end up in version control and in logs (see secrets-management).
3. **Support two valid credentials at once.** Overlapping validity is
   what makes rotation possible without downtime, and it must be
   designed rather than improvised.
4. **Rotate on a schedule and on suspicion.** Routine rotation proves
   the process works before an incident requires it under pressure.
5. **Separate credentials per environment.** A test key with production
   access is a production incident waiting for a mistake.
6. **Alert on credential expiry ahead of time.** Expired integration
   credentials are a common and entirely preventable outage (see
   tls-and-certificates).
7. **Know the revocation path before you need it.** How fast you can
   invalidate a leaked key determines the damage window (see
   secret-scanning).

## Boundaries

Rotation limits exposure duration; it does not detect misuse, which
needs monitoring. Some providers do not support overlapping credentials,
forcing a brief outage. Credentials held by a vendor on your behalf are
outside your rotation control (see vendor-data-processing).

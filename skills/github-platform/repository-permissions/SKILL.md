---
name: repository-permissions
description: Grant repository and organisation access through teams and least privilege, and review it before it drifts. Use when managing access for a growing organisation or auditing who can do what.
---

# Repository permissions

Access granted individually and never reviewed drifts into an
organisation where nobody can say who can push to production. Managing
it through teams and reviewing on a schedule keeps the answer knowable.

## Method

1. **Grant through teams, never to individuals.** Team membership is
   reviewable and revocable in one place, while individual grants become
   invisible over time.
2. **Default to the lowest useful level.** Read for most, write for
   contributors, and administration for very few, since administrative
   access bypasses branch protection (see branch-protection).
3. **Mirror teams to organisational reality.** Teams that match how
   people actually work stay current; aspirational structures do not.
4. **Review access when people move or leave.** Departure and role
   change are the moments access becomes wrong, and they need a process
   rather than memory (see agent-people-ops-desk).
5. **Treat integrations as identities.** Apps and bots hold access,
   often broadly scoped, and they are rarely reviewed (see
   vendor-data-processing).
6. **Audit outside collaborators separately.** Access granted for a
   specific piece of work outlives it by default.
7. **Log and review administrative changes.** Permission changes are
   security events and belong in an audit trail (see audit-logging).

## Boundaries

Permissions control platform actions and not what someone does with code
they can already read. Organisation-level settings can override
repository ones, so both need review. Over-restriction pushes people to
work outside the system, which is worse than a slightly permissive
model.

---
name: supply-chain-security
description: Protect a project and its users from compromised dependencies, publishing credentials, and build pipelines. Use when publishing packages or auditing what your build actually trusts.
---

# Supply chain security

Users of your package trust everything it depends on and everything your
build touches. The attack that matters is rarely against your code; it
is against a dependency, a maintainer account, or the pipeline that
produces the artifact.

## Method

1. **Lock dependencies and review what changes.** A lockfile committed
   and its diff read at upgrade time is the cheapest control available
   (see dependency-management).
2. **Protect publishing credentials above all.** Publishing tokens are
   the keys to every user's machine: scoped narrowly, stored in a
   secret manager, rotated, and never on a laptop (see
   secrets-management).
3. **Require multi-factor authentication for anyone who can publish.**
   Account takeover is the most common real-world compromise of a
   package.
4. **Build from a clean, pinned environment.** Pin the toolchain and
   base images so the artifact depends on inputs you can name, and
   prefer builds that can be reproduced and checked.
5. **Sign artifacts and publish provenance.** A signature plus a record
   of which source and pipeline produced the artifact lets consumers
   verify they got what you built.
6. **Watch for typosquats and sudden maintainer changes.** New
   dependencies with similar names, or a transfer of an existing one,
   are the patterns worth alerting on.
7. **Keep an inventory of what you ship.** A bill of materials makes the
   next ecosystem-wide vulnerability a query rather than an
   investigation.

## Boundaries

- These controls raise the cost of compromise; none of them prevent a
  determined attacker with maintainer access.
- Scanning finds known vulnerabilities and cannot detect a deliberate
  backdoor in a dependency.
- Reproducible builds are hard in some ecosystems, and partial progress
  still has value.

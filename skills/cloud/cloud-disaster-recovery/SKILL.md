---
name: cloud-disaster-recovery
description: Build disaster recovery around RTO/RPO tiers, verified backups, and drills that prove the numbers. Use when writing a DR plan or testing whether the existing one actually works.
---

# Cloud disaster recovery

DR is a set of promises (how much data lost, how long down) that are
only real after a drill proves them. Untested DR is a document that
makes people feel better until the day it matters.

## Method

1. **Tier services by business tolerance.** For each service, the
   owners set RTO (downtime tolerated) and RPO (data loss tolerated),
   in numbers. Tier 0: minutes/near-zero (payments, auth). Tier 1:
   hours/minutes. Tier 2: a day/hours (internal tools, analytics).
   The tier decides the spend; DR-ing everything to tier 0 is how DR
   programs die of cost.
2. **Match strategy to tier.** Tier 2: backups + restore runbooks.
   Tier 1: warm standby (replicated data, scaled-down stack) or
   pilot-light (data live, compute cold but scripted). Tier 0:
   active-passive with tested promotion or full active-active (see
   multi-region-design for the write-path reality). Every tier's
   strategy is IaC-scripted (see infrastructure-as-code); a DR
   environment built by hand during the disaster is a second disaster.
3. **Design backups against the real threat list.** Not just region
   loss: ransomware and operator error mean backups must be versioned,
   immutable (object-lock/vault), in a separate account/project with
   separate credentials (a compromised admin must not delete both
   prod and backups), and cross-region. 3-2-1 still applies in the
   cloud; the second copy in the same account is not a second copy.
4. **Verify restores, not backups.** Automated restore tests on a
   schedule: spin the database from last night's backup, run checksums
   and row counts, time it (that time is your evidence against the
   RTO), tear down. Backup-succeeded alerts without restore tests
   have preceded every "backups were corrupt for months" postmortem
   (see backup-restore).
5. **Cover the forgotten dependencies.** DNS control, TLS certs,
   secrets and KMS keys (replicated? restorable?), IAM to operate the
   DR site, container registries, CI (can you deploy fixes during the
   disaster?), and the runbooks themselves reachable when the primary
   wiki is down. Any one of these missing turns a 1-hour RTO into a
   day.
6. **Drill on a calendar, escalating realism.** Quarterly: tabletop
   walk-through of a scenario (region loss, data corruption at 2pm,
   account compromise). Twice yearly: live restore drill on tier 0/1
   (game-day style; see chaos-gameday), measuring actual RTO/RPO
   against the promises, feeding gaps into a fix list with owners.
   Rotate who runs it; the plan must work without its author.

## Boundaries

- HA absorbs component failure automatically; DR recovers from
  regional or logical catastrophe by decision. Multi-AZ redundancy
  does not satisfy a DR requirement (corruption replicates
  beautifully).
- Data corruption needs point-in-time recovery (see backup-restore)
  and a decision about the corruption window; failover to a replica
  fails over the corruption too.
- The declaration to fail over is a human, business-level call under
  uncertainty; name the roles authorized to make it in advance (see
  incident-commander-role).

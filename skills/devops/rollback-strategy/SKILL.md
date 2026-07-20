---
name: rollback-strategy
description: Decide rollback versus fix-forward, handle migrations safely, and rehearse rollbacks so they work under pressure. Use when planning deploy safety or during an incident deciding how to recover.
---

# Rollback strategy

Rollback is the deploy's undo button, and like all undo buttons it
must be tested before the emergency. The hard part is not switching
binaries; it is the database migration that the old code cannot read
and the rollback that nobody has ever actually run.

## Method

1. **Make rollback the default recovery, fix-forward the
   exception.** During an incident, reverting to the last
   known-good is usually faster and lower-risk than
   diagnosing and patching live (see incident-postmortem);
   fix-forward wins only when rollback is impossible (data
   already migrated irreversibly) or the bug predates the
   deploy. Decide the default in calm, not at 3am (see
   incident-commander-role).
2. **Keep releases rollback-able by construction.** Immutable
   versioned artifacts (see artifact-versioning) so the old
   version is a redeploy, not a rebuild; a live previous
   version (blue-green: see blue-green-deployments) or fast
   redeploy path; config and feature flags versioned with
   the code (see config-management, feature-flags-hygiene:
   flags are the fastest rollback: flip off without
   deploying).
3. **Solve the migration problem with expand-contract.**
   The rule that makes rollback safe: never deploy code and
   an incompatible schema change together. Expand (add,
   backward-compatible), deploy code using the new schema
   while still tolerating the old, verify, and only
   contract (remove old columns) a release later once
   rollback is no longer needed (see database-migrations).
   A destructive migration bundled with the deploy is a
   rollback you have already forfeited.
4. **Separate schema deploys from code deploys.** Migrations
   run as their own step, forward-only and additive; code
   rolls back independently against the compatible schema.
   This decoupling is what lets you revert a bad binary
   without touching data (see deployment-pipelines).
5. **Rehearse rollbacks on a schedule.** Roll back in
   staging (and occasionally production, deliberately)
   regularly: measure the time, find the steps that fail
   (the config that did not revert, the cache that held
   stale schema assumptions), and write the runbook from
   the rehearsal (see runbook-writing, chaos-gameday). An
   unrehearsed rollback discovered mid-incident is a
   second incident.
6. **Handle the irreversible explicitly.** Some changes
   cannot roll back cleanly: data written in the new
   format, external side effects already sent, deleted
   data. Identify these before shipping, gate them behind
   flags with extra caution, keep backups with tested
   restores (see backup-restore), and accept that these
   deploys trade rollback for fix-forward: know that going
   in.

## Boundaries

- Rollback recovers from a bad deploy, not from data
  already corrupted by it; corruption needs point-in-time
  restore (see backup-restore, cloud-disaster-recovery),
  a different and slower tool.
- Fast rollback can mask a systemic problem (repeatedly
  reverting the same feature); the postmortem asks why it
  keeps happening, not just how fast you reverted (see
  incident-postmortem).
- Client-side and mobile releases cannot be rolled back
  from users' devices (see mobile-release-strategy);
  their "rollback" is server-side flags and forced
  upgrades, planned differently.

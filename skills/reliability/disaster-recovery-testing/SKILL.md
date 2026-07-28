---
name: disaster-recovery-testing
description: Verify that backups restore and failover works by practising it, rather than trusting that the procedure would work. Use when recovery has never been rehearsed end to end.
---

# Disaster recovery testing

An untested backup is a hope. Most recovery failures are discovered
during the first real attempt: incomplete backups, missing credentials,
procedures referencing systems that no longer exist.

## Method

1. **Restore from backup on a schedule.** Actually restoring is the only
   verification, since a successful backup job proves nothing about
   restorability (see backup-restore).
2. **Measure the real recovery time.** How long a full restore takes,
   compared to the objective you have promised, which is usually a
   surprise the first time.
3. **Practise the whole path.** Access, credentials, DNS, dependencies,
   and data, because recovery fails at the step nobody documented.
4. **Rotate who runs the drill.** A procedure only one person can
   execute has not been tested, and that person will be unavailable.
5. **Test failover in both directions.** Failing back is often harder
   than failing over and is rarely rehearsed.
6. **Verify data integrity after restore, not just completion.** A
   restore that produces corrupt or partial data has failed silently.
7. **Update the runbook from what you learned.** Every drill finds
   inaccuracies, and correcting them is the output (see
   runbook-writing).

## Boundaries

Drills test the scenarios you rehearse and not the one that happens.
Full production drills carry real risk and need careful scoping.
Recovery objectives that the tested time cannot meet are commitments you
should correct rather than restate.

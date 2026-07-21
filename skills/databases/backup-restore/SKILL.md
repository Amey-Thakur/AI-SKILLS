---
name: backup-restore
description: Design backups around tested restores, point-in-time recovery, and backup security. Use when setting up database backups or verifying that existing backups would actually work in a disaster.
---

# Backup restore

The only backup that matters is one you have restored. Untested backups
fail exactly when needed: corrupt, incomplete, or unrestorable, and the
discovery happens during the disaster. The whole discipline is proving,
in advance and repeatedly, that recovery works.

## Method

1. **Define RPO and RTO, then design to them.** How much
   data can you lose (recovery point) and how long can
   recovery take (recovery time): these numbers, set by the
   business (see cloud-disaster-recovery), decide the backup
   strategy. RPO of five minutes needs continuous archiving,
   not nightly dumps; RTO of one hour needs a restore
   process rehearsed to fit it.
2. **Combine full backups with point-in-time recovery.**
   Periodic full/base backups plus continuous transaction-
   log archiving (WAL/binlog shipping) lets you restore to
   any moment, not just the last nightly snapshot: essential
   for recovering to just before a corruption or bad
   migration (see database-migrations' pre-destructive
   backup). Snapshot-only backups lose everything since the
   last snapshot.
3. **Test restores on a schedule, automatically.** Regularly
   restore a backup to a scratch environment, verify the
   data (row counts, integrity checks, a smoke query),
   measure the time (that time is your real RTO, not the
   number in the doc): and do it automatically so it happens
   without heroics (see the restore-verification rule in
   cloud-disaster-recovery). "Backup succeeded" alerts
   without restore tests have preceded every "the backups
   were useless" postmortem.
4. **Protect backups like production data.** Backups contain
   everything sensitive in the database (see pii-handling,
   data-encryption): encrypt them, control access tightly,
   and store copies isolated from production (separate
   account/credentials) so a compromise or operator error
   cannot destroy both primary and backups at once (the
   ransomware and fat-finger threat: see cloud-disaster-
   recovery's separate-account rule). A backup a compromised
   admin can delete is not a backup.
5. **Follow 3-2-1, cross-region.** Three copies, two media/
   locations, one off-site: in cloud terms, backups in a
   different region and a different account (see cloud-
   storage-selection's tiers for cost). A second copy in the
   same account and region survives a disk failure but not
   an account compromise or a regional outage.
6. **Retain by policy, prune deliberately.** Keep backups
   long enough to recover from problems discovered late
   (corruption noticed a week later) and to meet compliance
   (see data-retention); expire older ones on a schedule
   (backups accumulate cost fast). Immutable/object-lock
   backups within the retention window resist deletion
   (accidental or malicious).

## Boundaries

- Backups recover from data loss and corruption; they are
  not high availability (which prevents downtime via
  redundancy: see multi-region-design). A read replica is
  not a backup (it faithfully replicates the corruption
  too).
- Restore time grows with data size; for large databases,
  RTO may require standby replicas or snapshot-based fast
  restore, not a from-backup rebuild (see cloud-disaster-
  recovery's tiers).
- Application-level backup (exporting logical data) and
  physical backup (the database's own mechanism) have
  different restore speeds and consistency guarantees;
  know which you have and that it captures a consistent
  point (not a torn read across a running system).

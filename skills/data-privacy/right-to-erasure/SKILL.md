---
name: right-to-erasure
description: Delete a person's data on request across every store, copy, and backup, and prove it happened. Use when implementing deletion, handling an erasure request, or auditing whether delete really deletes.
---

# Right to erasure

Deletion is hard because data spreads. A row deleted from the primary
database may still sit in a replica, a warehouse, a search index, a
cache, an export, a vendor, and a backup, and a deletion that misses
those is not deletion.

## Method

1. **Map every destination before promising deletion.** Enumerate the
   stores, indexes, caches, logs, analytics systems, and vendors that
   receive the data, and keep that map current. You cannot delete from
   a system you forgot existed (see data-lineage).
2. **Make deletion a pipeline, not a query.** A request should fan out
   to every destination with tracked status per system, so partial
   completion is visible rather than assumed.
3. **Decide tombstone versus hard delete deliberately.** Some systems
   need a marker so the record does not reappear from an upstream
   replay; some regulations require the data actually gone. Know which
   applies to each store.
4. **Handle backups by policy, not by surgery.** Editing backups is
   usually impractical, so the accepted approach is documenting the
   backup retention window and ensuring restores re-apply pending
   deletions. State this in the policy rather than implying instant
   erasure everywhere.
5. **Keep the minimum needed to prove the deletion.** A record that a
   request was made and satisfied is itself lawful to keep, and it is
   what you produce when asked. Keeping the deleted content to prove
   you deleted it defeats the purpose.
6. **Test with a real account end to end.** Create, spread, delete,
   then search every destination for traces. Deletion is the feature
   most often assumed working and least often verified.

## Boundaries

- Erasure rights have exceptions: legal retention, fraud prevention,
  and ongoing contracts can override them, and which apply is a legal
  determination.
- Anonymised data may fall outside erasure entirely, which is one
  reason anonymisation must be genuine (see data-anonymization).
- Deletion in your systems does not reach data a user shared onward or
  a vendor retains under separate obligations (see
  vendor-data-processing).

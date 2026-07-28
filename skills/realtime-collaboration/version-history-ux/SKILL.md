---
name: version-history-ux
description: Keep and present document history so users can see what changed, who changed it, and restore safely. Use when edits are shared or when accidental loss must be recoverable.
---

# Version history UX

History is the safety net that makes collaboration tolerable: people
edit freely when they know nothing is permanently lost. Its value
depends on being navigable, since a list of a thousand timestamps helps
nobody.

## Method

1. **Snapshot at meaningful boundaries, not per keystroke.** Group edits
   into sessions by author and time, so history reads as a sequence of
   changes rather than a log of characters.
2. **Name versions by what changed.** A summary of the difference beats
   a timestamp for scanning, and named milestones beat both for finding
   a specific state.
3. **Show diffs in the document's own form.** Rendered changes in
   context, not a raw patch, because most users cannot read one.
4. **Make restore non-destructive.** Restoring creates a new version
   rather than deleting what came after, so a mistaken restore is
   itself reversible.
5. **Attribute every change and keep attribution accurate.** Who made a
   change is often the most useful field in history, and merged or
   imported edits must not be misattributed.
6. **Support comparing any two versions.** Sequential diffs are
   insufficient when the question is what changed since last week.
7. **State the retention policy plainly.** How long history is kept and
   what happens on deletion, since users assume forever unless told (see
   right-to-erasure).

## Boundaries

- History storage grows with activity and needs compaction or expiry
  rather than unbounded retention.
- Retained history may contain data a user later asks to erase, which
  is a policy conflict to resolve deliberately.
- History records what changed; it cannot explain why, which is what
  comments and change descriptions are for.

---
name: comments-and-annotations
description: Attach comments to content that keeps changing, so anchors survive edits and threads stay resolvable. Use when adding review, feedback, or discussion to a document or design.
---

# Comments and annotations

A comment points at content, and the content moves. Nearly all the
difficulty is in the anchor: keeping a note attached to the right place
after the text around it has been rewritten, or admitting honestly when
it can no longer be placed.

## Method

1. **Anchor to stable identifiers, not offsets.** Character positions
   break on the first edit above them; anchors tied to content
   identifiers or ranges survive far longer (see
   collaborative-editing-models).
2. **Define orphan behaviour explicitly.** When anchored content is
   deleted, the comment must become visibly orphaned rather than
   vanishing, because it may be the more important record.
3. **Keep threads shallow.** One level of replies covers nearly every
   real discussion and stays readable; deep nesting does not.
4. **Make resolution meaningful and reversible.** Resolved comments hide
   by default and remain retrievable, since resolution is often
   premature.
5. **Notify precisely.** Mentions notify the person mentioned, thread
   participants get replies, and everyone else gets nothing, or comment
   notifications become noise people disable (see
   notification-fatigue).
6. **Show comments in context, not only in a list.** The location is
   half the meaning, and a sidebar list divorced from position is much
   harder to act on.
7. **Include enough context in the record.** Quoting the anchored text
   at comment time means the thread still makes sense after the content
   changes (see version-history-ux).

## Boundaries

- Comments are discussion, not change tracking; suggesting edits is a
  different feature with different semantics.
- Comment content is user data with its own retention and export
  obligations (see right-to-erasure).
- Anchoring in rich structures such as tables and images is
  substantially harder than in flowing text.

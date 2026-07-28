---
name: conflict-resolution-ux
description: Present merge conflicts to users so they can resolve them confidently, rather than resolving silently and losing work. Use when concurrent edits cannot be merged automatically.
---

# Conflict resolution UX

Automatic merging handles the mechanical cases and hides the ones that
matter. When two people genuinely disagreed about the same content, the
correct system behaviour is to ask, and the design problem is asking in
a way that does not confuse or frighten.

## Method

1. **Detect and surface, never silently pick.** A silent last-write-wins
   on a substantive conflict is data loss the user discovers later, when
   the context is gone.
2. **Show both versions with what differs.** Highlighted differences in
   context, attributed to who made them and when, which is the minimum
   for an informed choice.
3. **Offer the realistic actions.** Keep mine, keep theirs, keep both,
   and edit manually. Forcing a binary choice loses work when the answer
   is a combination.
4. **Preserve the losing version.** History or an archived copy, so a
   wrong resolution is recoverable rather than final (see
   version-history-ux).
5. **Resolve at the smallest sensible unit.** Field-level or
   paragraph-level conflicts are comprehensible; whole-document
   conflicts force people to guess.
6. **Explain in domain terms, not system terms.** Someone else changed
   this while you were editing beats a version vector mismatch, which
   means nothing to a user.
7. **Make conflicts rare by design.** Fine-grained locking, presence
   cues, and smaller edit units prevent most conflicts from arising (see
   presence-and-awareness).

## Boundaries

- Good conflict UX reduces loss; it cannot recover work already
  discarded by a silent merge upstream.
- Frequent conflicts signal a modelling problem, since well-scoped data
  conflicts rarely.
- Automated resolution is acceptable for genuinely commutative changes
  and dishonest anywhere else.

---
name: memory-forgetting-policy
description: Decide what an AI system forgets and when, through expiry, decay, and explicit deletion, so memory stays current and lawful. Use when memory accumulates indefinitely or a user asks to be forgotten.
---

# Memory forgetting policy

Systems that never forget become wrong: they act on circumstances that
changed years ago and hold data long past any justification. Forgetting
is a designed capability rather than an absence of retention.

## Method

1. **Give every memory type a lifetime.** Preferences may persist,
   project context should not outlive the project, and transient
   observations expire quickly.
2. **Decay by relevance as well as age.** A fact never retrieved and
   never confirmed is a candidate for removal regardless of how recently
   it was written.
3. **Make explicit deletion complete and immediate.** A user asking to
   forget something must see it removed from every store including
   derived summaries and indexes (see right-to-erasure).
4. **Distinguish forgetting from suppression.** Hiding a memory while
   retaining it is not deletion, and the difference matters legally as
   well as ethically.
5. **Handle consolidated memories carefully.** A fact merged into an
   abstraction cannot be deleted by removing the source record, which
   makes provenance essential (see memory-consolidation).
6. **Confirm what was forgotten.** Users need to know the request took
   effect, and a silent deletion is indistinguishable from being ignored.
7. **Log deletions without retaining the deleted content.** The record
   that a deletion occurred is what proves compliance, and it must not
   defeat the deletion.

## Boundaries

Forgetting policies must satisfy legal retention as well as deletion
rights, and those can conflict. Data already used to influence a model
or an output cannot be recalled. Aggressive forgetting degrades the
personalisation that made memory valuable, so the balance is a product
decision.

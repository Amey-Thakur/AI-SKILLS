---
name: collaborative-editing-models
description: Choose between operational transformation, CRDTs, and locking for multi-user editing, and understand what each costs. Use when more than one person can edit the same document at the same time.
---

# Collaborative editing models

Concurrent editing has three honest answers: prevent it with locks,
transform operations against each other, or use data types that merge by
construction. Each is a different set of trade-offs, and picking by
fashion rather than by requirement is why these projects overrun.

## Method

1. **Ask whether you need concurrency at all.** Document locking or
   section-level checkout is unfashionable and completely adequate when
   simultaneous edits are rare, at a fraction of the complexity.
2. **Understand what OT requires.** Operational transformation needs a
   central server to order operations and transform functions that are
   correct for every operation pair, which is hard to get right and
   proven in practice.
3. **Understand what CRDTs cost.** They merge without a coordinating
   server and carry metadata that grows with edit history, so memory and
   payload size become the engineering problem instead of correctness.
4. **Model intent, not keystrokes.** An operation that says insert at
   this position survives concurrency far worse than one that says
   insert after this anchor, which is why anchors matter more than the
   algorithm choice.
5. **Decide what merging cannot fix.** Two people rewriting the same
   paragraph produce a syntactically merged result that reads as
   nonsense, so some conflicts need a human (see conflict-resolution-ux).
6. **Use a proven library.** Both OT and CRDT implementations are
   subtle, heavily tested, and not worth reimplementing for a product
   feature.
7. **Test with adversarial concurrency.** Simultaneous edits at the same
   position, offline divergence, and reconnection are where these
   systems fail, and they need deliberate tests (see offline-sync).

## Boundaries

- These models converge state; they do not guarantee the converged
  state is meaningful to users.
- Rich structure such as tables and nested lists is substantially harder
  than plain text in every model.
- Access control and permissions are separate concerns that neither
  model addresses (see authz-design).

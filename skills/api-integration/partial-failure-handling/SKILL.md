---
name: partial-failure-handling
description: Handle operations that touch several services where some succeed and some fail, without leaving inconsistent state. Use when a single user action calls multiple systems.
---

# Partial failure handling

An action spanning several services succeeds partially by default: the
payment took, the record did not save, the email never sent. Distributed
transactions are not available, so the answer is design rather than
rollback.

## Method

1. **Order operations so the reversible ones come first.** Do the
   undoable work last, which minimises what must be compensated (see
   agent-delegation-protocol for the analogous reasoning).
2. **Make each step idempotent.** Retrying the whole operation must not
   duplicate the steps that already succeeded (see idempotency).
3. **Record progress durably between steps.** A record of what has
   completed is what lets a retry resume rather than restart.
4. **Design compensating actions for what cannot be retried.** A refund
   compensates a charge, since undoing is often impossible but
   compensating is not (see saga-pattern).
5. **Prefer eventual consistency with a reconciler.** A background
   process that detects and repairs mismatches is more robust than
   attempting atomicity across services.
6. **Surface partial state honestly to the user.** Payment taken, order
   pending is better than a success that is not true or an error that
   hides a completed charge.
7. **Alert on unreconciled states.** Records stuck mid-operation are the
   signal that the compensation path is broken (see
   integration-monitoring).

## Boundaries

Compensation is not rollback: side effects such as sent emails and
charged cards leave traces. Reconciliation adds a system to build and
operate. Some operations genuinely cannot be made safe and need a human
process for the failure case.

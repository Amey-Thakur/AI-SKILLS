---
name: payment-idempotency
description: Make payment operations safe to retry so a network timeout never charges a customer twice. Use when calling a payment API, processing webhooks, or building any money-moving endpoint.
---

# Payment idempotency

The dangerous case in payments is not failure but uncertainty: the
request timed out and you do not know whether the charge happened.
Retrying without idempotency doubles the charge; not retrying may lose
it. Idempotency is what makes the retry safe.

## Method

1. **Generate the idempotency key before the first attempt.** The key
   identifies the intent, so it must be created by the caller and reused
   across every retry of that same intent, not regenerated per attempt.
2. **Derive the key from the business action.** An order id or a
   deterministic hash of the intent, so an accidental double submit from
   the same user is caught as the same operation.
3. **Send it to the provider and honour it on your own endpoints.**
   Providers deduplicate on their side; your webhook and payment
   endpoints must deduplicate on yours (see webhooks-design).
4. **Store the result against the key.** A repeat request returns the
   original outcome rather than re-executing, which is what makes the
   guarantee real rather than best effort.
5. **Reconcile on ambiguity rather than guessing.** When a timeout
   leaves state unknown, query the provider for that key before deciding
   anything (see payment-reconciliation).
6. **Set key retention long enough to matter.** Deduplicating for a few
   seconds does not help a retry from a job that runs an hour later.
7. **Keep the whole path idempotent, not just the charge.** Emails,
   entitlement grants, and ledger writes triggered by a payment must
   each tolerate replay.

## Boundaries

- Idempotency prevents duplicate execution of the same intent; it does
  not prevent a user deliberately paying twice.
- Keys scoped too broadly can suppress a legitimate second purchase, so
  the key must identify the intent precisely.
- Provider semantics differ in retention and scope, so read their rules
  rather than assuming.

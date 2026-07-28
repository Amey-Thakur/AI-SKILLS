---
name: refunds-and-disputes
description: Handle refunds, chargebacks, and disputes with evidence, deadlines, and a policy applied consistently. Use when building refund flows or responding to a chargeback.
---

# Refunds and disputes

A refund is you returning money; a chargeback is the customer's bank
taking it back, with a fee and a deadline attached. The difference
matters, because a generous refund policy is usually cheaper than
fighting disputes.

## Method

1. **Write the refund policy and apply it consistently.** Inconsistent
   decisions produce disputes and, in some markets, legal exposure.
   Publish it where customers see it before paying.
2. **Make refunding operationally easy.** A refund that requires
   engineering involvement will be delayed, and delay is what turns a
   refund request into a chargeback.
3. **Handle partial refunds and their effects.** Tax, fees, and revenue
   records all change, and provider fees are often not returned (see
   revenue-recognition-basics).
4. **Collect evidence continuously, not at dispute time.** Timestamps,
   IP, delivery or access logs, the agreed terms, and support history.
   The dispute window is short and evidence gathered after the fact is
   weak (see audit-logging).
5. **Respond to every dispute within the deadline.** An unanswered
   dispute is lost by default, and the deadline is set by the network
   rather than by your queue.
6. **Track dispute rate as a health metric.** Rising rates threaten your
   ability to process payments at all, well before the losses matter.
7. **Fix the cause, not just the case.** Unclear billing descriptors,
   surprise renewals, and slow support drive most disputes and are all
   fixable (see failed-payment-recovery).

## Boundaries

- Dispute outcomes are decided by the card network and issuer, not by
  the merits as you see them.
- Consumer protection law grants refund rights in many markets
  regardless of your policy.
- Chargeback fraud exists, and the practical remedy is evidence and
  prevention rather than argument.

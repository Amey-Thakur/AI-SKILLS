---
name: failed-payment-recovery
description: Recover revenue from failed recurring charges with retries, clear notice, and a graceful path back, without harassing customers. Use when involuntary churn from card failures is material.
---

# Failed payment recovery

A large share of subscription churn is involuntary: cards expire, get
replaced, or hit a temporary limit, and the customer never intended to
leave. Recovery is the process of retrying intelligently and telling the
person clearly, which is worth more than most acquisition work.

## Method

1. **Separate hard failures from soft ones.** A closed account will
   never succeed and should stop retrying; insufficient funds may
   succeed in days. Retrying a hard decline annoys everyone and can
   incur fees.
2. **Space retries around how people get paid.** A few attempts over one
   to three weeks, avoiding immediate repetition, catches the common
   cases without looking like an attack on the card.
3. **Tell the customer at the first failure, plainly.** What failed, what
   it affects, when you will try again, and a one-click way to update
   the card. Silence until suspension is what causes the angry
   cancellation.
4. **Keep access during the grace period.** Cutting service on the first
   failure converts a card problem into a lost customer.
5. **Use provider tools for card updates.** Account updater services fix
   many expired and reissued cards automatically without contacting the
   customer at all.
6. **Define the end state clearly.** After the final attempt, what
   happens to the subscription, the data, and the ability to return.
   Ambiguity here is what makes reactivation hard.
7. **Measure recovery rate by failure reason.** It tells you whether to
   change timing, messaging, or the payment methods you accept.

## Boundaries

- Recovery reduces involuntary churn; it does nothing for customers who
  actually chose to leave (see churn-analysis).
- Retry limits and messaging requirements are set by card network rules
  and consumer law in some markets.
- Aggressive retrying can trigger provider penalties and damage your
  processing reputation.

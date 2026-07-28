---
name: subscription-billing
description: Model recurring plans, cycles, upgrades, and cancellations so what a customer is charged always matches what they agreed to. Use when building or changing recurring billing.
---

# Subscription billing

Subscription logic looks simple until the first mid-cycle upgrade, and
then every edge case arrives at once: proration, trials that convert,
plans that changed price, and cancellations that should still serve the
paid period. The model has to hold all of it.

## Method

1. **Separate the plan, the subscription, and the invoice.** The plan is
   the offer, the subscription is this customer's instance of it, and
   the invoice is what was actually charged. Merging them makes history
   unreconstructable.
2. **Store the terms on the subscription.** Price, currency, interval,
   and features as agreed at signup, so a later plan change does not
   silently reprice existing customers (see pricing-change-migration).
3. **Decide proration policy once and apply it everywhere.** Upgrades
   usually prorate immediately, downgrades usually take effect at
   renewal. Ad hoc decisions per case produce disputes you cannot
   defend.
4. **Make cancellation mean end of paid period, not immediate cutoff.**
   Cutting access already paid for is the most common source of
   chargebacks and complaints.
5. **Handle trials as a distinct state.** Trial start, conversion, and
   expiry each trigger different behaviour, and a trial that silently
   becomes a charge without notice generates disputes.
6. **Drive access from a single entitlement check.** One place answers
   what this customer may use, derived from subscription state, so
   features never disagree about whether someone paid.
7. **Generate the invoice before charging, not after.** The line items
   are what justify the amount, and reconstructing them afterwards is
   guesswork (see invoicing-and-receipts).

## Boundaries

- Billing implements the commercial agreement; changing what customers
  are charged is a business and legal decision.
- Revenue recognition follows accounting rules and is not the same as
  cash collected (see revenue-recognition-basics).
- Consumer subscription law in several markets governs notice, renewal,
  and cancellation, and it overrides product preference.

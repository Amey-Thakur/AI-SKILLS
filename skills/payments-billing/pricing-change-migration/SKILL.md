---
name: pricing-change-migration
description: Change prices or plan structure without breaking trust or billing, deciding who moves, when, and with what notice. Use when raising prices, restructuring plans, or retiring a legacy tier.
---

# Pricing change migration

The technical part of a price change is small; the trust part is not.
Existing customers agreed to specific terms, and moving them requires
notice, a defensible reason, and often a legal basis. Most damage comes
from doing it quietly.

## Method

1. **Decide who is affected before anything else.** New customers only,
   existing on renewal, or everyone. Grandfathering costs revenue and
   buys goodwill, and it is a deliberate trade rather than a default.
2. **Keep old plans intact rather than mutating them.** Create the new
   plan and migrate subscriptions explicitly, so history stays accurate
   and rollback stays possible (see subscription-billing).
3. **Give notice that meets the longest applicable requirement.** Terms
   of service, contracts, and consumer law each set minimums, and the
   strictest governs.
4. **Explain the change honestly and once.** What is changing, when,
   what it costs them, and what to do if they disagree. Burying it in a
   terms update is what turns a price rise into a public complaint.
5. **Handle mid-cycle mechanics deliberately.** Proration, credits, and
   the first invoice after the change should be modelled and tested
   before announcement.
6. **Watch churn and support volume by cohort.** The affected cohort
   tells you whether the change landed; aggregate numbers hide it.
7. **Keep a reversal plan.** If churn exceeds the threshold you set in
   advance, know what you will do, because deciding in the middle is how
   it gets worse.

## Boundaries

- Contracts and annual commitments may prohibit changing price
  mid-term, which is a legal question rather than a product one.
- Automatic renewal at a higher price is regulated in several markets
  and needs explicit notice or consent.
- Pricing strategy itself is a business decision (see
  agent-pricing-committee, saas-pricing).

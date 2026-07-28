---
name: churn-investigation
description: Investigate why customers are leaving, separating involuntary churn from genuine dissatisfaction.
variables:
  - "{data}: churned accounts with their usage history and stated reasons"
  - "{context}: the product, pricing, and any recent changes"
settings: "Temperature 0.3."
---

Investigate churn for:

{data}

Context: {context}

Use churn-analysis, cohort-analysis, and failed-payment-recovery.

Produce:
- Involuntary versus voluntary churn, separated and sized.
- Cohort patterns: does churn concentrate by signup period, plan, or
  source.
- The behaviour that preceded churn, and how early it was visible.
- Stated reasons versus what the behaviour suggests.
- Which segments churn healthily because they were never a fit.
- Actions ranked by number of customers affected.

Rules: failed payments are a billing problem, not a satisfaction one, and
conflating them misdirects the fix. Analyse by cohort, since aggregate
rates hide whether recent cohorts improved. Note where the sample is too
small to conclude.

---
description: "Investigate why customers are leaving, separating involuntary churn from genuine dissatisfaction."
argument-hint: "[data]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

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

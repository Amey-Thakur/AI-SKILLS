---
name: customer-health-score
description: Define a health score from behaviour that predicts churn, with thresholds that trigger action.
variables:
  - "{signals}: available usage, support, and engagement data"
  - "{product}: what successful use looks like and the typical lifecycle"
settings: "Temperature 0.3."
---

Design a customer health score for:

{product}

Available signals: {signals}

Use agent-customer-success-team, churn-analysis, and cohort-analysis.

Produce:
- The signals included, each with why it predicts retention.
- How each is measured and over what window.
- Weighting, and the reasoning behind it.
- Thresholds that trigger action, and what action.
- What the score deliberately excludes.
- How it will be validated against actual churn.

Rules: use behaviour rather than sentiment. Alert on trend rather than
level, since a steady low user is not the risk. The score must be
decomposable so anyone can see why an account is flagged. Validate against
real outcomes before trusting it.

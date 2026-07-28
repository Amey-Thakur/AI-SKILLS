---
name: metric-definition
description: Define a metric precisely enough that two people computing it independently get the same number.
variables:
  - "{metric}: the metric name and what it is meant to capture"
  - "{context}: the business, the systems, and how the metric will be used"
settings: "Temperature 0.2."
---

Define this metric:

{metric}

Context: {context}

Use agent-analytics-desk and product-metrics.

Specify:
- What it measures and the decision it informs.
- The exact population: who is in and who is excluded.
- The time window and how period boundaries are handled.
- The calculation, unambiguously.
- Edge cases: refunds, test accounts, deleted users, partial periods.
- Where the source data comes from.
- What it does not measure and how it can mislead.

Rules: the definition must be precise enough to reproduce exactly. Name
the exclusions explicitly. State the time zone for any date boundary. Note
that changing the definition invalidates historical comparison, so
version it.

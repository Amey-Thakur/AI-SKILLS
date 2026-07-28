---
name: cost-optimization-review
description: Review infrastructure and vendor spend for savings ranked by size, with the risk of each stated.
variables:
  - "{spend}: the cost breakdown by service, resource, or vendor"
  - "{usage}: utilisation data and what the workload actually requires"
settings: "Temperature 0.3."
---

Review this spend:

{spend}

Usage: {usage}

Use cloud-cost-optimization, media-storage-tiering, and
agent-vendor-operations.

Produce:
- The largest costs and what drives each.
- Idle and over-provisioned resources, with evidence.
- Storage that should be tiered or expired.
- Vendor subscriptions with unused seats or overlap.
- Savings ranked by size, each with effort and risk.
- What must not be cut, and why.
- The realistic total.

Rules: attack the largest cost rather than the easiest. State what each
cut makes riskier. Distinguish waste from capacity that exists for peak.
Say where you cannot judge without utilisation data rather than assuming.

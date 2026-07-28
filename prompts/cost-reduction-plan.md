---
name: cost-reduction-plan
description: Find genuine cost reduction ranked by size and risk, distinguishing waste from capability being cut.
variables:
  - "{costs}: the current cost breakdown, ideally by category and driver"
  - "{constraints}: what must not be degraded and any target"
settings: "Temperature 0.3."
---

Produce a cost reduction plan for:

{costs}

Constraints: {constraints}

Use cost-structure-analysis, cloud-cost-optimization, and
agent-vendor-operations.

Produce:
- Costs classified as fixed, variable, or stepped.
- Reductions ranked by size, each with the effort and risk.
- Which are waste and which reduce capability, marked clearly.
- One-off versus recurring savings, kept separate.
- What would be irreversible if cut.
- The realistic total against the target.

Rules: attack the largest costs, not the easiest. Never present a
capability cut as pure waste. State what each cut makes harder. If the
target cannot be met without damaging the business, say so directly.

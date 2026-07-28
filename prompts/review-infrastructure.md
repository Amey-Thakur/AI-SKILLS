---
name: review-infrastructure
description: Review infrastructure configuration for reliability, cost, and security problems before they reach production.
variables:
  - "{config}: the infrastructure definition to review"
  - "{context}: what it runs, its availability target, and its expected load"
settings: "Temperature 0.2."
---

Review this infrastructure configuration:

{config}

Context: {context}

Draw on infrastructure-as-code, cloud-cost-optimization,
redundancy-design, and encryption-at-rest.

Report:
- Single points of failure relative to the stated availability target.
- Security exposures: public access, over-broad permissions, unencrypted
  storage.
- Cost problems: oversized resources, missing lifecycle rules, no expiry.
- Missing operational basics: backups, monitoring, tagging.
- What is fine and does not need changing.

Rules: check whether redundancy is real or shares a failure domain. Flag
permissions that are broader than the workload needs. Say plainly when
you cannot judge sizing without usage data. Do not recommend
multi-region for a target that does not require it.

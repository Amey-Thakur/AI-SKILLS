---
description: "Review infrastructure configuration for reliability, cost, and security problems before they reach production."
argument-hint: "[config]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

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

---
name: plan-migration
description: Plan a migration between systems, versions, or providers with staged cutover and a rollback at every step.
variables:
  - "{migration}: what is moving from where to where, and why"
  - "{constraints}: downtime tolerance, data volume, deadline, and who is affected"
settings: "Temperature 0.3."
---

Plan this migration:

{migration}

Constraints: {constraints}

Draw on the integration-migration and database-migrations skills, and
canary-analysis for the rollout.

Produce:
- Preconditions that must be true before starting.
- Stages, each independently reversible, with what is verified at each.
- The parallel-running period and what is compared during it.
- Data migration handled separately from traffic cutover.
- The rollback procedure per stage, with its time cost.
- What is irreversible, and the point of no return.

Rules: no stage without a verification step and a rollback. State the
downtime each stage requires honestly. Identify what could make rollback
impossible and flag it prominently. If the constraints cannot all be met,
say which one must give rather than producing a plan that assumes
otherwise.

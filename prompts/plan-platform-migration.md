---
name: plan-platform-migration
description: Plan a move to a new platform or provider, with parallel running and a reversible cutover.
variables:
  - "{migration}: what is moving, from what to what, and why"
  - "{scale}: data volume, traffic, dependencies, and acceptable downtime"
settings: "Temperature 0.3."
---

Plan this platform migration:

{migration}

Scale and constraints: {scale}

Use integration-migration, paved-road-adoption, and
disaster-recovery-testing.

Produce:
- What must be true before starting.
- Stages, each independently reversible.
- The parallel-running period and what is compared.
- Data migration, planned separately from traffic.
- Cutover, staged by percentage where possible.
- Rollback per stage with its time cost.
- The point of no return, named explicitly.
- What is decommissioned, and when.

Rules: never cut over without having run in parallel. Data migration and
traffic cutover are separate problems. State the point after which
rollback is impossible. Do not decommission the old system until the new
one has survived a full cycle.

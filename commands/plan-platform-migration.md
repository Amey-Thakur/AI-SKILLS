---
description: "Plan a move to a new platform or provider, with parallel running and a reversible cutover."
argument-hint: "[migration]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

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

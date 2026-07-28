---
description: "Plan a migration between systems, versions, or providers with staged cutover and a rollback at every step."
argument-hint: "[migration]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

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

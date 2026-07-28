---
description: "Find genuine cost reduction ranked by size and risk, distinguishing waste from capability being cut."
argument-hint: "[costs]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

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

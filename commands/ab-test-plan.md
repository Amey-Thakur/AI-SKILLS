---
description: "Design an experiment with the hypothesis, sample size, and decision rule fixed before it runs."
argument-hint: "[change]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Design an experiment for:

{change}

Traffic: {traffic}

Use ab-test-design and statistical-power.

Specify:
- The hypothesis, stated so it can be wrong.
- The primary metric, chosen before running.
- Guardrail metrics that must not degrade.
- Sample size and duration for the effect worth detecting.
- Randomisation unit and how contamination is avoided.
- The decision rule, written in advance.
- What invalidates the test.

Rules: fix the primary metric and duration before starting. Do not stop
early on a favourable result. State the minimum effect worth acting on.
If the traffic cannot reach significance in a reasonable time, say so
rather than running an underpowered test.

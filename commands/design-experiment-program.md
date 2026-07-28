---
description: "Set up a programme of experiments with a prioritised hypothesis backlog and honest decision rules."
argument-hint: "[goal]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Design an experiment programme for:

{goal}

Traffic: {traffic}

Use ab-test-design, statistical-inference, and conversion-rate-optimization.

Produce:
- Hypotheses derived from where users actually drop, ranked.
- For each: the change, the expected mechanism, and the effect size worth
  detecting.
- Which are worth testing versus just shipping.
- Sequencing, given traffic constraints.
- Guardrail metrics that must not degrade.
- The decision rule, fixed in advance.
- What you will do with inconclusive results.

Rules: rank by where the funnel actually loses people. Small-effect tests
on low traffic will not conclude, so say so rather than running them.
Fix the decision rule before starting. Inconclusive is a legitimate
outcome that needs a plan.

---
name: design-experiment-program
description: Set up a programme of experiments with a prioritised hypothesis backlog and honest decision rules.
variables:
  - "{goal}: the metric you are trying to move and its current value"
  - "{traffic}: available volume and how quickly tests can conclude"
settings: "Temperature 0.3."
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

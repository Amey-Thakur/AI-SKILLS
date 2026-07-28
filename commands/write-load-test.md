---
description: "Design a load test that answers a specific capacity question rather than generating traffic for its own sake."
argument-hint: "[question]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Design a load test to answer:

{question}

System: {system}

Use the load-testing and capacity-planning skills.

Specify:
- The scenario, modelled on real usage rather than uniform requests.
- Data setup, so the test is not hitting one cached row.
- The ramp profile and duration.
- What is measured, including latency percentiles rather than averages.
- The pass condition, stated before the run.
- What to watch on the system side to find the bottleneck.

Rules: the test must resemble real traffic mix or it measures nothing
useful. State what the test cannot tell you. Never run against production
without saying explicitly that it must be authorised and isolated. Define
the abort condition.

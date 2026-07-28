---
name: write-load-test
description: Design a load test that answers a specific capacity question rather than generating traffic for its own sake.
variables:
  - "{question}: what you need to know, such as the breaking point or behaviour at expected peak"
  - "{system}: the system under test, its entry points, and realistic usage patterns"
settings: "Temperature 0.3."
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

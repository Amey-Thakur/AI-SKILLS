---
name: write-chaos-experiment
description: Design a failure injection experiment that tests a specific resilience hypothesis safely.
variables:
  - "{hypothesis}: what you believe should happen when a specific thing fails"
  - "{system}: the system, its dependencies, and its current resilience mechanisms"
settings: "Temperature 0.3."
---

Design a chaos experiment for this hypothesis:

{hypothesis}

System: {system}

Use the chaos-engineering skill, plus graceful-degradation for what
should happen.

Specify:
- The precise failure to inject and where.
- The blast radius, kept as small as possible for a first run.
- What is measured, including user-facing impact.
- The abort condition and how to stop immediately.
- Who must be present and informed.
- What result would confirm or refute the hypothesis.

Rules: start in a lower environment unless there is a reason not to. The
stop mechanism must be tested before the experiment. State the risk to
users explicitly. Never design an experiment without organisational
consent, and say so. If the system lacks the observability to see the
result, fix that first.

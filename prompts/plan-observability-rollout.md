---
name: plan-observability-rollout
description: Plan instrumentation across a system in stages, starting where blindness costs most.
variables:
  - "{systems}: the services involved and their current instrumentation"
  - "{pain}: recent incidents where you could not see what was happening"
settings: "Temperature 0.3."
---

Plan an observability rollout for:

{systems}

Recent blind spots: {pain}

Use observability, metrics-instrumentation, distributed-tracing, and
alerting-design.

Produce:
- Where blindness has cost the most, from the incidents given.
- Stage one: the smallest instrumentation that would have helped.
- Standard fields and naming so signals correlate across services.
- Trace propagation and where spans matter.
- Alerts, each tied to a user-visible symptom with a runbook.
- Cost implications, particularly cardinality.
- What is deliberately not instrumented yet.

Rules: start where the pain is rather than instrumenting everything.
Standardise naming first, since inconsistent fields cannot be correlated
later. Every alert needs an action. State the cost of high-cardinality
labels before adding them.

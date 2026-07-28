---
name: design-observability
description: Decide what to log, measure, and trace for a service so failures are diagnosable without adding noise.
variables:
  - "{service}: what the service does, its dependencies, and its failure modes"
  - "{concerns}: what has gone wrong before or what you most need to detect"
settings: "Temperature 0.3."
---

Design observability for:

{service}

Concerns: {concerns}

Use the observability, metrics-instrumentation, structured-logging, and
distributed-tracing skills.

Specify:
- The handful of metrics that describe user-facing health.
- What to log, at what level, with which fields for correlation.
- Where traces are needed and what spans matter.
- The alerts, each tied to a symptom users would notice.
- What you deliberately do not instrument, and why.

Rules: alert on symptoms rather than causes. Every alert needs a
runbook and an action; if there is no action, it is a dashboard rather
than an alert. Keep the metric set small enough to remember. Do not log
personal data or secrets. State the cost implication of high-cardinality
labels.

---
name: incident-response-plan
description: Define how incidents are detected, classified, communicated, and closed, before the next one.
variables:
  - "{service}: the systems covered and their failure modes"
  - "{team}: who is available, their hours, and current on-call arrangement"
settings: "Temperature 0.3."
---

Write an incident response plan for:

{service}

Team: {team}

Use incident-response, incident-severity-levels, and agent-crisis-comms.

Produce:
- Severity levels defined by user impact, with examples.
- Response per level: who is paged, how fast, who leads.
- Roles during an incident: command, communications, investigation.
- Communication cadence, internal and external.
- When to escalate and to whom.
- Closure criteria and the follow-up review.
- Where the runbooks live.

Rules: classify by user impact rather than by component. One person leads
and does not also investigate. State the external communication rule
before an incident, not during. Data and security incidents have legal
notification duties needing separate handling.

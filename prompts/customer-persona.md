---
name: customer-persona
description: Build a persona from evidence, capturing the job, the trigger, and the objection rather than demographics.
variables:
  - "{evidence}: interview notes, sales calls, support tickets, or usage data"
  - "{product}: what they would be buying and the decision involved"
settings: "Temperature 0.3."
---

Build a persona from:

{evidence}

Product context: {product}

Use customer-personas and customer-interviews.

Produce:
- The job they are trying to get done.
- The trigger: what changed that made them look now.
- Their current approach and what frustrates them about it.
- The objection that almost stops them buying.
- Who else is involved in the decision.
- Verbatim quotes supporting each point.

Rules: build only from the supplied evidence and mark anything inferred
as inference. Skip demographics unless they change behaviour. If the
evidence is too thin to support a persona, say so and state what to
gather. Do not invent quotes.

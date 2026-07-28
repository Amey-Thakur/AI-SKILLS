---
name: security-incident-response
description: Respond to a suspected security incident with containment, evidence preservation, and the right escalation.
variables:
  - "{incident}: what was observed, when, and how it was noticed"
  - "{systems}: what is affected and what data it holds"
settings: "Temperature 0.2."
---

Respond to this security incident:

{incident}

Affected systems: {systems}

Use security-incident-response, incident-severity-levels, and
agent-crisis-comms.

Produce:
- Immediate containment actions, ordered.
- What must be preserved as evidence before changing anything.
- Credentials to rotate and access to revoke.
- What is known, unknown, and unconfirmed, separated.
- Who must be told internally, and when.
- Whether this may trigger a notification obligation.
- The investigation steps once contained.

Rules: preserve evidence before remediating where possible, since
containment can destroy it. Never state cause before it is established.
Personal data breaches carry legal notification deadlines and need
counsel immediately. Escalate to a human security owner now rather than
proceeding alone.

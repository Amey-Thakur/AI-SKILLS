---
description: "Respond to a suspected security incident with containment, evidence preservation, and the right escalation."
argument-hint: "[incident]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

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

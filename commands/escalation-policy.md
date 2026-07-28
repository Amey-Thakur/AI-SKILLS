---
description: "Define what gets escalated, to whom, and how fast, so problems reach the right person at the right time."
argument-hint: "[context]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write an escalation policy for:

{context}

Roles: {roles}

Use agent-escalation-ladder and support-escalation.

Produce:
- Triggers: time elapsed, threshold crossed, or decision required.
- Levels, with who receives each and their authority.
- Response time expected at each level.
- What must always reach a human immediately.
- What information must accompany an escalation.
- De-escalation and closure.

Rules: escalate with a recommendation, not just a problem. Match urgency
to consequence rather than treating everything as urgent. Anything
binding, financial, or legal always reaches a human. State what happens
if the next level does not respond.

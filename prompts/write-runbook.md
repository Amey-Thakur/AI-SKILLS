---
name: write-runbook
description: Write an operational runbook someone can follow at 3am without prior knowledge of the system.
variables:
  - "{scenario}: the failure or task the runbook covers"
  - "{system}: the system involved, its dependencies, and how to reach its controls"
settings: "Temperature 0.2-0.4."
---

Write a runbook for:

{scenario}

System: {system}

Follow the runbook-writing skill.

Structure it as:
- Symptoms: how the responder knows this is the situation.
- Impact: who is affected and how urgently this needs action.
- Checks: the specific commands or dashboards to confirm the diagnosis.
- Actions: numbered steps, each with the exact command and the expected
  result.
- Verification: how to confirm it worked.
- Escalation: when to stop and who to call.

Rules: write for someone woken up who has never seen this system. Exact
commands, not descriptions of commands. State what each step will do
before the reader runs it, especially anything destructive. Mark steps
that are safe to repeat. Where you do not know a value, mark it as a
placeholder to fill rather than inventing it.

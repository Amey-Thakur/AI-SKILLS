---
description: "Write an operational runbook someone can follow at 3am without prior knowledge of the system."
argument-hint: "[scenario]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

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

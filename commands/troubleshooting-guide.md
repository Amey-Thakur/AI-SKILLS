---
description: "Write a guide organised by the symptom a user sees, leading to the cause and the fix."
argument-hint: "[problems]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write a troubleshooting guide for:

{problems}

System: {system}

Use troubleshooting-docs and runbook-writing.

For each symptom:
- The symptom exactly as the user experiences it, including error text.
- Quick checks to confirm this is the right entry.
- The likely causes, most common first.
- The fix per cause, with exact steps.
- What to gather before asking for help if none apply.

Rules: organise by symptom, not by subsystem, since the user only knows
the symptom. Include the literal error text so search finds it. State
which fixes are safe to try and which change state. Do not assume access
the user may not have.

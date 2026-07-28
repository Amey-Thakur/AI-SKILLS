---
name: troubleshooting-guide
description: Write a guide organised by the symptom a user sees, leading to the cause and the fix.
variables:
  - "{problems}: the failures that occur, their causes, and known fixes"
  - "{system}: the system and what the user can access"
settings: "Temperature 0.3."
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

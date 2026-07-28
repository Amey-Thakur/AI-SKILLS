---
description: "Write a blameless postmortem that finds systemic causes and produces owned actions."
argument-hint: "[incident]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write a postmortem for:

{incident}

Response: {response}

Use incident-postmortem, root-cause-analysis, and learning-from-failure.

Produce:
- Impact: who was affected, how, and for how long.
- Timeline: detection, response, mitigation, resolution.
- What made this possible, examining the system rather than the people.
- Why it was not caught earlier.
- What went well in the response.
- Actions with owners and dates, ranked by how much recurrence they
  prevent.
- What was luck rather than design.

Rules: blameless means examining why the action made sense at the time.
Distinguish the trigger from the underlying cause. Every action needs an
owner and a date, or it will not happen. Note where detection rather than
prevention is the right investment.

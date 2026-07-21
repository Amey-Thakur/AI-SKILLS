---
description: "Make any piece of work better, keeping its intent and voice while fixing the weaknesses. A quick /improve command."
argument-hint: "[work]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Improve this:

{work}

Goal / what to preserve: {goal}

Rules:
- Fix the real weaknesses: unclear parts, errors, weak structure, padding,
  anything that undercuts the goal. Make it clearer, tighter, and more
  effective.
- Preserve the intent, meaning, and the author's voice: improve it, do not
  replace it with your own version. Do not add claims or change the substance
  unless asked.
- Cut what does not serve the goal; strengthen what does.
- For writing: clarity, structure, and concision (see clear-writing,
  editing-and-revision). For code: correctness and readability without
  changing behavior (see refactor-code).

Output the improved version, then a short note on what you changed and why, so
I can see the edits. If parts are already good, leave them. If the work has a
deeper problem than editing can fix (wrong approach, missing content), say so
rather than polishing around it. Do not over-edit good work into blandness.

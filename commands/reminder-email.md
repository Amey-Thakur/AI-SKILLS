---
description: "Write a polite reminder email about a deadline, task, payment, or event that prompts action without nagging."
argument-hint: "[reminder]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write a reminder email about: {reminder}

Context: {context}

Rules for a reminder that works and stays friendly:
- Assume they simply forgot or got busy (they usually did), not that they are
  ignoring you. Keep it warm and light, never accusatory or passive-aggressive
  ("as I mentioned twice already" burns goodwill).
- Restate what is needed concisely, so they do not have to dig up the original.
  Include the key detail (the deadline, the amount, the task) clearly.
- Make the action and the timing explicit and easy: exactly what to do, by
  when, with whatever they need to do it (a link, an attachment).
- Match the firmness to the situation: a gentle nudge for a soft deadline, a
  clearer note for an overdue payment or a hard deadline, always polite.
- Keep it short. A reminder is a nudge, not a re-explanation.

Rules: courteous and clear over nagging or apologetic. Calibrate the tone to
how overdue and how important it is (early reminder = very gentle; final
notice before a consequence = clear and direct but still professional). For a
recurring reminder, adjust so it does not read as escalating irritation.
Include a fitting subject line. Mark any specifics I have not given as
placeholders.

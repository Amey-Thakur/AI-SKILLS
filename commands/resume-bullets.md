---
description: "Turn your work into strong resume bullet points with action verbs and quantified impact, honestly."
argument-hint: "[experience]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Turn this experience into resume bullet points:

{experience}

Target role: {role}

Rules for strong bullets:
- Structure: action verb + what you did + measurable outcome. "Cut deploy time
  from 40 to 8 minutes by parallelizing the CI pipeline" beats "Responsible for
  CI improvements".
- Lead with impact and numbers wherever they exist (time saved, revenue,
  users, percentages, scale). If I did not give a number, ask for it or mark a
  placeholder: never invent figures.
- Tailor to the target role: front the experience and skills that role wants,
  using the language of the field.
- Start each with a strong, varied verb; no "responsible for", "helped with",
  "worked on".

Give me 3-5 bullets per role/project, best first. Rules: honest, every bullet
must be something I could defend in an interview: do not inflate or fabricate.
Cut vague filler and buzzwords (detail-oriented, team player, synergy).
Concise: one line each where possible. If a bullet is weak because the
underlying work is unclear, tell me what detail would make it stronger.

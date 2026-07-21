---
description: "Generate interview questions that reveal real capability for a specific role, with what good answers sound like."
argument-hint: "[role]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write interview questions for a {role}, focused on {focus}.

Produce:
1. **Experience probes (3)**: "Tell me about a time..." questions targeting
   {focus}, each designed so a real story is easy and an invented one is
   hard. Include the follow-up that separates the two ("what did you try
   first that failed?").
2. **Working-session questions (3)**: small realistic problems from the
   role's daily work to reason through aloud. Solvable in 10-15 minutes of
   discussion, no trick knowledge, escalating difficulty.
3. **Judgment calls (2)**: situations with genuine trade-offs and no
   clean answer, to hear how they weigh things.

For every question add:
- *Listening for:* two or three markers of a strong answer.
- *Red flag:* one pattern that signals trouble.

Rules: no trivia, no riddles, no questions answerable by memorizing a
glossary, nothing about protected characteristics or personal life, and no
question you could not justify to the candidate afterward.

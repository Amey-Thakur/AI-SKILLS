---
description: "Write a calm, honest status update during an ongoing incident, sized for its audience."
argument-hint: "[situation]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write an incident status update for {audience}.

Current situation:
<situation>
{situation}
</situation>

Structure:
1. **What is happening**: the user-visible impact in plain words, present
   tense ("file uploads are failing for about 20% of attempts").
2. **Since the last update**: what was ruled out, found, or fixed. For
   engineering audiences include the technical specifics; for customers,
   only what changes their situation.
3. **What we are doing now**: the current action, singular and concrete.
4. **What you can do**: workaround if one exists; "no action needed" if
   true.
5. **Next update**: a specific time, and keep it even if the news is
   "still investigating".

Rules:
- Never speculate on cause before it is confirmed; "we have identified the
  cause" only when it is reproduced or proven, not suspected.
- No minimizing ("minor issue", "small subset") unless the numbers in the
  situation support it, and no blame, internal or external, in any
  customer-facing text.
- State only facts from the situation given; unknowns are stated as
  unknowns.
- Length: under 120 words for customers; engineering updates may run
  longer with detail.

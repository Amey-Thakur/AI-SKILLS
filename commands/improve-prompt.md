---
description: "Rewrite a prompt to be clearer, more specific, and more likely to produce the intended result."
argument-hint: "[prompt]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Improve this prompt:
{prompt}

What I actually want: {goal}

Diagnose first, then rewrite:
1. Name the weaknesses: vagueness (undefined terms, no success criteria),
   missing context (the model cannot know X), no output format specified,
   conflicting instructions, or asking for too much at once.
2. Rewrite the prompt so it is: specific about the task and the audience,
   explicit about the output format and length, clear on constraints and what
   to avoid, and structured (role, task, context, format) if that helps.
3. Note what the improved prompt assumes: if it needs information only the
   user has (data, examples, tone), mark those as {placeholders} to fill in.

Rules: clearer and more specific, not longer for its own sake: cut vague
filler, add only the precision that changes the output. Preserve the user's
actual intent; do not substitute your own idea of what they should want.
Output the improved prompt in a code block, then a one-line summary of what
changed and why.

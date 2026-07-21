---
name: improve-prompt
description: Rewrite a prompt to be clearer, more specific, and more likely to produce the intended result.
variables:
  - "{prompt}: the prompt you want to improve"
  - "{goal}: what you actually want the model to produce, if not obvious"
settings: "Temperature 0.3-0.5."
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

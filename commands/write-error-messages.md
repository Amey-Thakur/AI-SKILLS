---
description: "Rewrite error messages so the reader knows what happened, why, and what to do next."
argument-hint: "[errors]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Rewrite these error messages:

{errors}

Audience: {audience}

Follow the error-messages skill.

For each, provide:
- What happened, in the reader's terms.
- Why, where the cause is knowable.
- The specific next action.
- Any identifier needed for support to trace it.

Rules: never blame the user. Do not expose internals, stack traces, or
query text to end users. Distinguish what the reader can fix from what
they must report. Keep it to what fits where it is displayed. Where the
system genuinely cannot tell what went wrong, say that honestly rather
than guessing a cause.

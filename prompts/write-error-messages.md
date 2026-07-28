---
name: write-error-messages
description: Rewrite error messages so the reader knows what happened, why, and what to do next.
variables:
  - "{errors}: the current error messages and where they appear"
  - "{audience}: who reads them, whether end users, operators, or developers"
settings: "Temperature 0.3-0.5."
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

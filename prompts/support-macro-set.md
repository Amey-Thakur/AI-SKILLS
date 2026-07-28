---
name: support-macro-set
description: Write reusable support replies that explain clearly while leaving the specifics to be personalised.
variables:
  - "{scenarios}: the recurring situations that need replies"
  - "{voice}: the tone and any phrases the company uses or avoids"
settings: "Temperature 0.4."
---

Write support macros for:

{scenarios}

Voice: {voice}

Use support-response-writing and support-macros.

For each scenario:
- A macro under 120 words with explicit placeholders for specifics.
- The answer in the first line.
- What the customer should do next.
- A note on when this macro should not be used.

Rules: macro the explanation, never the diagnosis. Placeholders must be
obvious enough that an unedited macro looks incomplete. No templated
apology for serious failures. Keep them short, since long macros get sent
unread.

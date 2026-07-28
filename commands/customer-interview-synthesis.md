---
description: "Turn interview transcripts into findings with evidence, separating what people said from what they do."
argument-hint: "[interviews]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Synthesise these interviews:

{interviews}

Research question: {question}

Use customer-interviews, research-synthesis, and sampling-and-bias.

Produce:
- Findings, each with how many participants support it and quotes.
- Where behaviour contradicted stated preference.
- Patterns by segment, if the sample allows.
- What surprised you relative to the assumption going in.
- Where the sample is too small or biased to conclude.
- Implications, separated from the findings themselves.

Rules: weight observed behaviour above stated intention. Count
participants rather than mentions. State the sample's limits plainly. Do
not generalise from one vivid interview. Keep findings and implications
visibly separate.

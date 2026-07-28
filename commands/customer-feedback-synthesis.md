---
description: "Turn scattered feedback into ranked themes with evidence, separating loud voices from representative ones."
argument-hint: "[feedback]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Synthesise this feedback:

{feedback}

Context: {context}

Use customer-feedback-loop and sampling-and-bias.

Produce:
- Themes by underlying cause, not by surface complaint.
- Number of distinct customers per theme, not number of mentions.
- Verbatim quotes for each theme.
- Which themes are from a vocal minority versus broadly held.
- What the feedback does not cover: who is not represented here.
- Ranked implications for the product.

Rules: count customers rather than mentions. Distinguish stated requests
from underlying problems, since the request is often a poor solution.
Name who is absent from this feedback, particularly people who already
left. Do not invent quotes.

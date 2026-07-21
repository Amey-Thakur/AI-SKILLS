---
name: summarize
description: Summarize anything (text, article, thread, transcript, notes) into the key points, fast. A quick /summarize command for any content.
variables:
  - "{content}: the text or content to summarize"
  - "{length}: how short (a line, a few bullets, a paragraph) and any focus, if you have one"
settings: "Temperature 0.3-0.5 for faithful summaries."
---

Summarize this:

{content}

Length / focus: {length}

Rules:
- Capture the main points and anything that changes a decision; drop the
  filler, repetition, and asides.
- Faithful to the source: do not add, invent, or spin. If the source makes a
  claim, attribute it as the source's, not fact.
- Lead with the single most important takeaway, then the supporting points.
- Match the requested length; default to a few tight bullets if unspecified.
- Preserve the meaning and any critical caveats, numbers, or names.

If the content is long or has sections, structure the summary to match. Flag
anything genuinely ambiguous rather than guessing at it. For an ultra-short
one-liner, see the tldr prompt; for a document specifically, see
summarize-document.

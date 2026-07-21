---
description: "Turn one piece of content into formats for other channels, adapted to each rather than copy-pasted."
argument-hint: "[content]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Repurpose this content:

{content}

Into these formats: {targets}

For each target format:
- Adapt to the channel, do not just paste. Each platform has its own length,
  tone, structure, and what hooks its audience (a Twitter thread is punchy and
  post-per-idea; a LinkedIn post is a story with a takeaway; a newsletter is
  personal; a carousel is one idea per slide). Extract what fits each, in the
  native shape.
- Pull the strongest, most self-contained ideas from the source: not every
  point survives every format. Lead with the best.
- Keep the core message and value consistent across formats, even as the
  packaging changes.

Output each requested format separately, labeled, ready to use. Rules: adapt,
do not duplicate (the same text pasted everywhere underperforms and reads
lazy). Each format should work standalone for someone who never saw the
original. Preserve the source's accuracy and voice. Flag if a particular format
is a poor fit for this content and why. Suggest one format I did not ask for
if the content is a natural fit.

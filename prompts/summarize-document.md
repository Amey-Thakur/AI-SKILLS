---
name: summarize-document
description: Summarize any document into a faithful, layered brief that never invents content.
variables:
  - "{document}: the full text to summarize"
  - "{audience}: who reads the summary (e.g. an executive, a new team member)"
  - "{length}: the size budget (e.g. 5 bullets, 200 words)"
settings: "Temperature 0-0.3. Works with any capable model."
---

Summarize the document below for {audience}, within {length}.

Rules:
- Use only what the document states. If something important is ambiguous or
  missing, say "the document does not specify" rather than filling the gap.
- Lead with the single most important point in one sentence.
- Then give the key points in order of importance, not order of appearance.
- Preserve concrete numbers, names, and dates exactly; never round or
  approximate silently.
- Keep the document's claims and your compression separate: do not add
  conclusions the document does not draw.
- End with one line: "Not covered:" listing significant topics the document
  raises but does not resolve, if any.

<document>
{document}
</document>

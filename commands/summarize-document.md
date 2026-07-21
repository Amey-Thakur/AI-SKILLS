---
description: "Summarize any document into a faithful, layered brief that never invents content."
argument-hint: "[document]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

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

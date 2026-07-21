---
description: "Rewrite any text to be clearer and shorter without changing its meaning or losing content."
argument-hint: "[text]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Rewrite the text below for {audience}: clearer, shorter, same meaning.

Rules:
- Preserve every claim, number, name, and commitment exactly. If the
  original is ambiguous, keep the ambiguity and flag it with [unclear:
  which reading?] rather than resolving it silently.
- Cut filler ("in order to", "it should be noted"), passive voice where an
  actor exists, and repeated points.
- Short sentences. Concrete verbs. One idea per paragraph.
- Keep the author's stance and tone-level (formal stays formal); this is a
  clarity pass, not a personality transplant.
- Do not add examples, context, or hedges the original lacks.

Output:
1. The rewrite.
2. "Cut:" one line noting what was removed as redundant, if anything
   substantive.
3. "Flagged:" the ambiguities you preserved, if any.

<text>
{text}
</text>

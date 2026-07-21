---
description: "Rewrite text in a different tone (more formal, friendlier, more direct) while keeping the meaning."
argument-hint: "[text]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Rewrite the following in a {target_tone} tone. Keep the meaning and the facts
exactly; change only how it comes across.

{text}

Rules:
- Preserve every fact, request, and commitment: tone changes the delivery,
  not the content.
- Hit the target tone through word choice, sentence length, and directness,
  not by adding filler or flattery. Formal is not verbose; friendly is not
  gushing; direct is not rude.
- Keep it the same length or shorter; do not pad to sound more of anything.
- If the target tone conflicts with the message (a warm tone on a hard "no"),
  find the version that is both honest and appropriately toned, and note the
  tension if it cannot be fully resolved.

Output the rewritten text. If the original is already well-suited to the
target tone, say so rather than changing it needlessly.

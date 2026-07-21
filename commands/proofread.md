---
description: "Fix grammar, spelling, and punctuation while preserving the author's voice and meaning."
argument-hint: "[text]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Proofread the following text. Fix grammar, spelling, punctuation, and awkward
phrasing. Preserve the author's voice, meaning, and register: do not rewrite
it into your style.

{text}

Return in two parts:
1. The corrected text, ready to use.
2. A short list of the substantive changes and why (grammar rule, clarity,
   consistency): skip trivial typo notes, but flag anything where your fix
   changed meaning or where the original was ambiguous and you had to choose.

Rules: correct, do not embellish. Keep the author's word choices and
sentence rhythm unless they are actually wrong. If a sentence's meaning is
unclear, ask rather than guessing. Match the existing dialect (US/UK
spelling) rather than imposing one.

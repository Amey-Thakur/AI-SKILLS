---
description: "Turn notes or a topic into study flashcards that test recall of the things worth knowing, not trivia."
argument-hint: "[material]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Make study flashcards from:

{material}

How many / focus: {count}

Rules for cards that actually build knowledge:
- One idea per card: a focused question on the front, a concise answer on the
  back. A card testing five things at once cannot be graded honestly in your
  head.
- Test recall, not recognition: phrase the front so you must produce the
  answer ("What does X do and when would you use it?"), not pick it. Avoid
  yes/no and cards where the question gives away the answer.
- Cover the things worth knowing: core concepts, definitions, relationships,
  and the "why" and "when", not obscure trivia. Prioritize what a test or real
  use would actually require.
- For concepts, favor understanding cards ("Why does X cause Y?") over pure
  memorization where it applies.

Output as clean Question / Answer pairs (a format I can paste into Anki or a
flashcard app: front and back clearly separated). Keep answers tight: a card
with a paragraph answer should be split. If the material has natural cloze
(fill-in-the-blank) candidates, offer some. Flag anything in the material that
is ambiguous or that I should verify before memorizing.

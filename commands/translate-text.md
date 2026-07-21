---
description: "Translate text naturally into a target language, preserving tone, register, and meaning."
argument-hint: "[text]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Translate the following into {target_language}. Register: {register}

{text}

Rules:
- Translate the meaning, not word-for-word: produce text a native speaker
  would actually write, idiomatic and natural.
- Preserve tone and register (a casual message stays casual, a formal
  document stays formal).
- Keep formatting, names, code, and technical terms intact; translate
  technical terms only if there is an established term in the target language.
- If a phrase does not translate cleanly (idiom, pun, cultural reference),
  give the closest natural equivalent and note the alternative in brackets.
- If the source is ambiguous in a way the target language forces you to
  disambiguate (formality, gender, plurality), state the assumption you made.

Output the translation first, then any notes.

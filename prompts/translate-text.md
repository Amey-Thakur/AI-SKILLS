---
name: translate-text
description: Translate text naturally into a target language, preserving tone, register, and meaning.
variables:
  - "{text}: the text to translate"
  - "{target_language}: the language to translate into"
  - "{register}: formal, casual, or neutral, if it matters"
settings: "Temperature 0.3-0.5 for natural phrasing."
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

---
name: convert-code
description: Translate code from one language or framework to another, idiomatic to the target, with the tricky parts flagged.
variables:
  - "{code}: the code to convert"
  - "{from}: the source language/framework"
  - "{to}: the target language/framework"
settings: "Temperature 0.2-0.4 for faithful translation."
---

Convert this code from {from} to {to}.

{code}

Rules:
- Produce idiomatic {to} code, not a literal transliteration: use the target
  language's natural patterns, standard library, and conventions (naming,
  error handling, data structures). A line-by-line port that reads as {from}
  written in {to} is wrong.
- Preserve behavior exactly, including edge cases and error handling.
- Flag anything that does not translate cleanly: features with no direct
  equivalent (nullability, concurrency model, memory management, specific
  library calls), where you made a judgment call, and where the target's
  idiom changes the structure.
- Note any dependencies the target version needs.
- If part of the source relies on behavior the target handles differently
  (integer division, string encoding, floating point), call it out explicitly
  so it can be verified.

Output the converted code, then the translation notes.

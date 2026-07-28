---
name: string-externalization
description: Move user-facing text out of code into catalogs with stable keys and context, so translation becomes possible without touching logic. Use when preparing a product for translation or fixing hardcoded strings.
---

# String externalization

Translation is impossible while text lives inside code. Externalization
extracts every user-facing string into a catalog with a stable key, and
the quality of that extraction decides whether translators produce good
work or guesswork.

## Method

1. **Key by meaning, not by text.** A key like checkout.button.submit
   survives a copy change, while a key that is the English string breaks
   every translation the moment someone fixes a typo.
2. **Give translators context with the string.** A note saying where it
   appears, whether it is a button or a heading, and what fills each
   placeholder. Without it, a lone word like Open is a verb or an
   adjective and the translator must guess.
3. **Keep sentences whole.** Concatenating fragments produces text no
   grammar can accommodate, because word order differs by language.
   Interpolate variables into one complete string instead.
4. **Name placeholders, never position them.** A named token can move
   where the target grammar needs it, while an ordered token cannot.
5. **Externalize everything user-visible.** Error messages, empty
   states, aria labels, notification text, and email subjects are all
   read by users and all get missed in a first pass (see
   accessibility-review).
6. **Fail loudly on a missing key in development.** A silently rendered
   key or blank is how untranslated strings reach production; make it
   visible where it is cheap to fix (see locale-fallback).

## Boundaries

- Externalization enables translation; it does not perform it, and the
  catalog is only as useful as its context notes (see
  translation-workflow).
- Text baked into images and video needs a separate localisation path.
- Some strings, such as legal identifiers and product names, should not
  be translated, and the catalog needs to mark them.

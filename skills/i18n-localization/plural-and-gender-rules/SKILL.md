---
name: plural-and-gender-rules
description: Handle plurals, grammatical gender, and agreement using locale plural categories rather than an if-else on count. Use when a string contains a number or refers to a person or object with gender.
---

# Plural and gender rules

English has two plural forms, which teaches developers a rule that is
wrong nearly everywhere else. Some languages have one form, several have
four or six, and the categories depend on the number in ways no
hand-written condition captures.

## Method

1. **Use the plural categories your framework exposes.** Zero, one, two,
   few, many, and other are defined per locale by the standard data, and
   translators fill only the ones their language uses.
2. **Never write count === 1 in application code.** That is the bug in
   its most common form. The count goes to the formatter and the
   formatter selects the form.
3. **Let translators add forms you do not have.** A language needing a
   few form must be able to supply it without a code change, which
   means the catalog format must allow it.
4. **Keep the number inside the translated string.** Splitting the digit
   from the noun prevents correct agreement and prevents locale-aware
   number formatting (see locale-formatting).
5. **Avoid grammatical gender you cannot know.** Constructing a sentence
   that inflects for a user's gender requires data you may not hold and
   may be wrong about. Prefer phrasing that does not inflect, and where
   the language forces a choice, let translators pick a neutral
   construction.
6. **Test with a language that has more forms than English.** A plural
   bug is invisible in English by construction, so the test locale must
   be one with three or more categories.

## Boundaries

- Plural rules come from locale data, so they change when that data is
  updated and are not something to hand-maintain.
- Ordinal forms (first, second) follow different rules from cardinal
  plurals and need their own formatter.
- Gendered agreement in some languages extends to adjectives and verbs,
  which is beyond what interpolation can fix and belongs to the
  translator's phrasing.

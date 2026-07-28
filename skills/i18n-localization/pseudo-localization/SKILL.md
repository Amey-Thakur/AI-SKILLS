---
name: pseudo-localization
description: Test localisation readiness with generated pseudo-translations that expand, accent, and bracket text, before any real translation exists. Use when preparing a product for translation and wanting to find breakage early.
---

# Pseudo-localization

Pseudo-localisation replaces every translatable string with a
transformed version of itself: accented so it stays readable, padded so
it is longer, and bracketed so truncation and concatenation are obvious.
It finds most localisation bugs before spending anything on translators.

## Method

1. **Accent the characters while keeping them readable.** Transformed
   text should still be recognisable to a reviewer, so problems stand out
   without making the app unusable.
2. **Pad every string substantially.** Around thirty to forty percent
   longer approximates the worst realistic expansion and surfaces
   clipping immediately (see text-expansion-layout).
3. **Bracket the whole string.** Visible start and end markers reveal
   truncation and show instantly when two strings were concatenated in
   code (see string-externalization).
4. **Leave anything untransformed visible as a finding.** Text that
   appears unchanged is hardcoded and was never externalized, which is
   the main thing this exercise detects.
5. **Run it as a build mode anyone can switch on.** A pseudo locale in
   the app's locale list means designers and reviewers can check their
   own screens without a special build.
6. **Include a mirrored pseudo locale for direction.** A pseudo RTL
   locale catches layout assumptions long before an actual RTL language
   is added (see rtl-layout).

## Boundaries

- Pseudo-localisation tests mechanics, not meaning; it cannot tell you a
  phrase is confusing or culturally wrong.
- It approximates expansion and cannot predict a specific language's
  actual length.
- Passing pseudo-localisation does not mean the product is ready to
  ship in a locale, only that the plumbing works.

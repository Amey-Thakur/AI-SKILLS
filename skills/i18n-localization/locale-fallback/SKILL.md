---
name: locale-fallback
description: Define what a user sees when a string, a locale, or a region is not available, so gaps degrade predictably instead of showing keys or blanks. Use when supporting partial translations or regional variants.
---

# Locale fallback

Translation coverage is never complete, so the fallback chain is part of
the design rather than an accident. Done well, a user sees their language
where it exists and something sensible where it does not. Done badly,
they see a raw key.

## Method

1. **Define an explicit chain per locale.** Regional variant, then base
   language, then the default locale. Falling straight from a variant to
   English skips a language the user reads fluently.
2. **Never render a key or a blank.** Both look like breakage; falling
   back to the source language is honest and usable (see
   string-externalization).
3. **Fall back per string, not per locale.** Rejecting an entire locale
   because a few strings are missing wastes the translation that exists.
4. **Make gaps visible to the team.** Counting missing strings per locale
   turns fallback from an invisible state into a tracked number.
5. **Share regional variants where they agree.** Most strings are common
   across variants of a language, so only genuine differences need their
   own entry, which keeps the catalog maintainable.
6. **Decide the rule for mixed rendering.** A screen that mixes two
   languages can be acceptable or unacceptable depending on the product,
   and that is a product decision to make deliberately.

## Boundaries

- Fallback covers missing text; it does not cover missing regional
  functionality such as unsupported payment methods or formats.
- A fallback chain based on browser preference can pick a locale the
  user does not want, so an explicit setting should override it.
- Legal text may not be safe to fall back at all and sometimes must be
  shown in a specific language or not at all.

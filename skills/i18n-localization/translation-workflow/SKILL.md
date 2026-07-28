---
name: translation-workflow
description: Run translation as a pipeline with catalogs, context, review, and continuous updates rather than a one-off handoff. Use when shipping in multiple languages on an ongoing release cadence.
---

# Translation workflow

Translation fails as a project and works as a pipeline. Strings change
every release, so the question is not how to translate the product once
but how new and changed strings reach translators and return without
blocking the release.

## Method

1. **Extract continuously from the source of truth.** The catalog is
   generated from code, so a new string appears for translation
   automatically rather than when someone remembers (see
   string-externalization).
2. **Send context with every string.** Screenshots, placement, character
   limits, and placeholder meanings. Context is the difference between
   translation and guessing, and it costs the developer seconds.
3. **Version strings by key and revision.** A changed English string
   must invalidate its translations rather than leaving stale text that
   now says something different.
4. **Decide the fallback and the release rule.** Whether a partially
   translated locale ships with fallbacks or waits, decided up front
   rather than during a release (see locale-fallback).
5. **Review in place, not in a spreadsheet.** A translator seeing the
   string in the interface catches what a list cannot, particularly
   truncation and wrong register.
6. **Keep a glossary and a style guide per language.** Product terms,
   tone, and formality decisions made once and applied consistently are
   what makes a product feel native rather than translated.
7. **Treat machine translation as a draft.** It is useful for coverage
   and unacceptable unreviewed for anything users rely on.

## Boundaries

- A workflow moves strings; it does not judge quality, which needs a
  native reviewer (see translation-quality-review).
- Legal, medical, and safety text has accuracy requirements beyond
  ordinary review.
- Cultural adaptation of imagery, examples, and colour is beyond
  translation and needs local judgement.

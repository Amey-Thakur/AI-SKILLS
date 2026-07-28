---
name: plan-localization
description: Plan localisation covering extraction, translation workflow, and the layout and format issues that follow.
variables:
  - "{product}: what is being localised and its current state"
  - "{markets}: target languages and regions, and why those"
settings: "Temperature 0.3."
---

Plan localisation for:

{product}

Target markets: {markets}

Use string-externalization, translation-workflow, text-expansion-layout,
rtl-layout, and locale-formatting.

Produce:
- Extraction: what needs externalising and where strings currently live.
- Key naming and the context supplied with each string.
- Plural and gender handling for the target languages.
- Layout changes needed for expansion and direction.
- Locale formatting for dates, numbers, and currency.
- Translation workflow and how new strings reach translators.
- Fallback behaviour for untranslated strings.
- What is not being localised.

Rules: never concatenate sentence fragments. Supply context with every
string. Test with a pseudo-locale before real translation. State the
ongoing maintenance cost, since localisation is not a one-off project.

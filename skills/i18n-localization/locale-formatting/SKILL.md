---
name: locale-formatting
description: Format numbers, dates, currency, and units by locale using the platform formatter rather than string templates. Use when displaying any value whose written form differs between regions.
---

# Locale formatting

Every locale writes numbers and dates differently, and the differences
are not cosmetic: 1,000 means one thousand in one place and one in
another, and 03/04 is two different days depending on where you are. The
rule is to never format by hand.

## Method

1. **Use the platform's internationalisation formatter.** It carries
   locale data for separators, ordering, and symbols that no template
   can reproduce and that changes over time.
2. **Format at the edge, keep raw values inside.** Store and compute with
   numbers and instants; convert to text only when displaying. Parsing a
   formatted number back is a bug waiting to happen.
3. **Separate the locale from the language.** A user may read English
   while expecting local date and currency conventions, so these are two
   settings rather than one.
4. **Never abbreviate dates ambiguously.** Where the exact day matters,
   a formatted long or medium date removes the ambiguity that a numeric
   one preserves.
5. **Format currency with its code and the locale's conventions.**
   Symbol placement, spacing, and decimal count vary, and some
   currencies have no minor unit at all (see currency-localization).
6. **Respect units and measurement systems.** Distance, weight, and
   temperature expectations differ by region and are part of the locale,
   not a separate preference to invent.

## Boundaries

- Formatting changes presentation only; it never changes the stored
  value, and a formatted string should not re-enter calculations.
- Locale data updates with real-world changes, so it comes from the
  platform rather than being frozen in your code.
- Time zone selection is separate from locale and needs its own explicit
  handling (see sql-date-time).

---
name: currency-localization
description: Display, store, and reason about money across currencies without rounding errors or implied conversions. Use when showing prices in more than one currency or storing monetary amounts.
---

# Currency localization

Money is not a number with a symbol in front. Currencies differ in
decimal places, symbol placement, and rounding conventions, and a
converted price is a different fact from the price you charged, so both
must be stored.

## Method

1. **Store the amount with its currency, always together.** A bare
   number is meaningless the moment a second currency exists, and
   retrofitting the currency later is guesswork.
2. **Never store money in floating point.** Use integer minor units or a
   decimal type. Floating point rounding on money produces discrepancies
   that accounting will find (see sql-date-time for a parallel
   precision trap).
3. **Respect each currency's minor unit.** Some have none and some have
   three, so assuming two decimals is wrong in both directions.
4. **Format with the locale, not with a symbol lookup.** Placement,
   spacing, and grouping come from locale data, and the same currency is
   written differently in different locales (see locale-formatting).
5. **Record the rate and time for any conversion.** A converted display
   price is derived and must be reproducible, so the rate used and when
   it was taken belong in the record.
6. **Decide rounding policy explicitly and apply it once.** Where
   rounding happens changes totals, and tax rules often dictate the
   answer rather than leaving it to preference.

## Boundaries

- Displaying a converted price is not a quote; the price actually
  charged depends on the payment provider's rate at capture.
- Tax, invoicing, and revenue recognition are regulated and belong to
  finance rather than to formatting.
- Currency data changes as currencies are introduced and redenominated,
  so it comes from a maintained source.

---
name: data-anonymization
description: Remove or blunt identifiers so a dataset can be analysed or shared without re-identifying people, and know when it is only pseudonymous. Use when preparing data for analytics, testing, sharing, or research.
---

# Data anonymization

Deleting the name column is not anonymization. Re-identification works
by combining quasi-identifiers, so the real question is whether any
individual can be singled out from what remains, alone or joined with
data someone else already has.

## Method

1. **Separate anonymous from pseudonymous honestly.** If a key
   elsewhere can restore identity, the data is pseudonymous and still
   personal data with all the obligations attached. Only irreversible
   transformation makes it anonymous.
2. **Find the quasi-identifiers.** Postcode, birth date, job title,
   device model, and timestamps combine to single people out even with
   names removed. Enumerate them explicitly rather than trusting that
   the obvious identifiers were the only ones.
3. **Generalise and suppress.** Widen values into bands, round
   timestamps, group rare categories into other, and suppress rows in
   groups too small to hide in. The aim is that every released record
   shares its combination with enough others.
4. **Add noise where counts are the output.** Aggregates over small
   groups leak individuals, and differential techniques bound that leak
   by design rather than by hope.
5. **Test by attempting re-identification.** Join the output against
   data you could plausibly obtain and see who falls out. An untested
   anonymization is an assumption (see threat-modeling).
6. **Use synthetic or masked data for testing.** Production data in a
   test environment inherits production obligations without production
   controls, which is a common and avoidable exposure (see
   data-classification).

## Boundaries

- Strong anonymization costs utility; the more the data resists
  re-identification, the less precisely it answers questions. Decide
  the trade openly rather than pretending it is free.
- Anonymization does not license unlimited use if the process is
  reversible in practice, which regulators judge by outcome.
- Free-text fields defeat structured anonymization, since anything can
  appear in them; treat them as identifying until reviewed.

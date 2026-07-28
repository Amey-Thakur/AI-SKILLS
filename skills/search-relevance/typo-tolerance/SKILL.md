---
name: typo-tolerance
description: Correct or forgive misspelled queries without turning precise searches into fuzzy guesses. Use when users mistype and get nothing, or when fuzzy matching returns irrelevant results.
---

# Typo tolerance

Users mistype constantly, and a search that returns nothing for a
one-letter error looks broken. Fuzzy matching fixes that and, applied
carelessly, makes short and precise queries return nonsense, so the
policy has to vary by query.

## Method

1. **Scale tolerance with word length.** Short words should tolerate
   nothing or one edit, longer words two. A two-edit allowance on a
   four-letter word matches half the dictionary.
2. **Never fuzzy-match identifiers.** Codes, SKUs, and reference numbers
   must match exactly, since a near-miss result is worse than none (see
   full-text-search-design).
3. **Rank exact above corrected.** A corrected match should appear
   below anything that matched as typed, so precision is preserved for
   users who typed correctly.
4. **Prefer did-you-mean when confidence is low.** Offering a correction
   keeps the user in control, while silently rewriting hides what
   happened (see zero-results-handling).
5. **Use your own corpus to correct, not a general dictionary.** The
   right correction for a domain term is another domain term, which a
   language dictionary does not contain.
6. **Weight corrections by popularity.** Among plausible corrections,
   the one people actually search for is usually right (see
   search-analytics).
7. **Handle keyboard-adjacent and phonetic errors separately.** They
   have different causes and different fixes, and one setting does not
   serve both.

## Boundaries

- Typo tolerance costs query performance, since fuzzy matching expands
  the candidate set considerably.
- It cannot distinguish a typo from a deliberately unusual term, which
  is why exact matches must stay ranked first.
- Correction quality depends on corpus size; a small index cannot
  correct reliably.

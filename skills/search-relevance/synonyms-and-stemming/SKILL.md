---
name: synonyms-and-stemming
description: Match words to their variants and equivalents without collapsing distinctions that matter. Use when searches miss obvious results, or when unrelated results appear because two words were merged.
---

# Synonyms and stemming

Recall improves when running matches run, and collapses when
international matches intern. Both stemming and synonyms trade precision
for recall, and the craft is knowing where in your domain that trade is
acceptable.

## Method

1. **Apply the same analysis at index and query time.** A mismatch here
   is the classic cause of a search that finds nothing while the data
   is clearly present.
2. **Prefer a dictionary-based lemmatiser for accuracy.** Algorithmic
   stemmers are fast and blunt, and their over-stemming errors are
   exactly the ones users notice.
3. **Curate domain synonyms rather than importing a general list.**
   Product names, abbreviations, and industry terms are where synonyms
   pay; a generic thesaurus mostly adds noise.
4. **Decide direction per synonym.** One-way expansion is often right:
   a query for a generic term should find the brand, while a query for
   the brand should not return every competitor.
5. **Keep an exact-match boost alongside expansion.** Users typing the
   precise term expect it first, so expansion should widen the tail
   rather than reorder the head.
6. **Handle multi-word synonyms carefully.** Phrase synonyms interact
   badly with tokenisation and are a common source of surprising
   matches.
7. **Measure every list change.** Synonyms feel obviously correct and
   frequently reduce precision measurably (see relevance-tuning).

## Boundaries

- Stemming rules are language-specific and cannot be shared across
  languages (see plural-and-gender-rules).
- Aggressive stemming destroys identifiers and codes, which need an
  unanalysed field.
- Synonym lists are maintenance, and an unmaintained list slowly becomes
  wrong as the domain moves.

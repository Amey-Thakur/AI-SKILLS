---
name: locale-aware-sorting
description: Sort and compare text using locale collation rather than byte order, so lists read correctly in every language. Use when displaying sorted names, searching case-insensitively, or matching user input.
---

# Locale-aware sorting

Byte order is not alphabetical order in any language including English,
where it puts every uppercase letter before every lowercase one.
Accented characters, digraphs, and script-specific rules make the gap
wider, and users notice a list that sorts wrongly.

## Method

1. **Sort with a locale collator, not with a raw comparison.** The
   platform collator knows that accented letters sort near their base
   letter in most locales and separately in some.
2. **Pick the collation strength for the task.** Ignoring case and
   accents suits search matching, while a display list usually wants
   them to matter as a tiebreak.
3. **Sort in the user's locale, not the server's.** The correct order
   depends on who is reading, which means the locale travels with the
   request rather than being a deployment setting.
4. **Normalise before comparing.** The same character can be encoded
   several ways, so comparing without Unicode normalisation makes
   identical-looking strings unequal (see character-encoding).
5. **Do not lowercase to compare.** Case folding differs by locale, most
   famously with Turkish dotted and dotless i, and a naive lowercase
   changes meaning.
6. **Keep database and application collation consistent.** Sorting in SQL
   and re-sorting in the application with different rules produces
   pagination that skips and repeats rows.

## Boundaries

- Collation handles linguistic order; it does not handle domain order
  such as ranking by relevance or by a custom sequence.
- Locale-aware sorting is slower than byte comparison, which matters
  only at large scale.
- Sorting mixed-script lists has no universally correct answer, so pick
  a defensible rule and state it.

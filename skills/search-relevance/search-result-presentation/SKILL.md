---
name: search-result-presentation
description: Present results so a user can judge relevance without opening each one, with useful snippets, clear grouping, and honest metadata. Use when results are correct but users still cannot find what they need.
---

# Search result presentation

Ranking decides what is on the page; presentation decides whether the
user recognises it. A correct first result that looks like every other
row still costs the user time, and that time is what search was supposed
to save.

## Method

1. **Show why each result matched.** A snippet containing the query
   terms in context, with the match highlighted, lets a user judge at a
   glance rather than by clicking.
2. **Lead with the field people scan.** Usually a title, sometimes an
   identifier or a name. A snippet-first layout wastes the strongest
   signal.
3. **Include the metadata that decides.** Date, type, author, status, or
   price, chosen because it is what people compare, not because it is
   available.
4. **Group when results come from different sources.** Mixing documents,
   people, and settings in one flat list forces the user to sort the
   categories mentally.
5. **Make the whole result actionable.** A large click target, keyboard
   navigable, with the primary action obvious (see keyboard-navigation).
6. **Keep pagination or infinite scroll honest.** Show how many results
   exist, keep positions stable across loads, and preserve state when
   the user returns from a result.
7. **Handle long and empty fields gracefully.** Truncate at a sensible
   boundary with the query term still visible, and never show a blank
   row for missing data (see text-expansion-layout).

## Boundaries

- Presentation helps users recognise relevance; it cannot compensate
  for a poor ranking (see relevance-tuning).
- Highlighting must not alter the underlying text or introduce markup
  the user did not write, which is an injection risk.
- Dense information layouts need accessibility review, since scannable
  and screen-reader friendly are not automatically the same (see
  screen-reader-testing).

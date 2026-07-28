---
name: faceted-search
description: Provide filters that narrow results honestly, with counts that reflect what is actually available and a clear way back out. Use when a result set is large enough that browsing needs structure.
---

# Faceted search

Facets turn a long result list into something navigable, and their
value depends almost entirely on honesty: counts that match reality, no
dead ends, and a visible way to undo. A facet that leads to zero results
is a broken promise.

## Method

1. **Compute counts against the current filtered set.** A count that
   ignores active filters promises results that do not exist, which is
   the most common facet bug.
2. **Decide multi-select semantics per facet.** Within a facet, multiple
   selections usually mean or; across facets, they mean and. Getting
   this backwards makes filtering feel useless.
3. **Never show a facet value with a zero count.** Either hide it or
   disable it visibly, so users cannot navigate into an empty state.
4. **Order values by usefulness.** Count order suits most facets,
   natural order suits sizes and dates, and alphabetical suits long
   lists people scan for a known value.
5. **Keep filter state in the URL.** Shareable, bookmarkable, and
   survivable across a refresh, which also makes support and debugging
   possible.
6. **Make removal as easy as application.** Visible active filters with
   individual removal and a clear-all, because getting stuck in a
   filtered dead end is where people abandon.
7. **Limit facet cardinality.** Hundreds of values need search within
   the facet or grouping; a raw list is unusable.

## Boundaries

- Facets require structured attributes; deriving them from free text is
  a data quality project (see data-cleaning).
- Counting facets on very large sets is expensive and may need
  approximation, which should be labelled as approximate.
- Faceting organises results; it does not fix a poor ranking within
  them (see relevance-tuning).

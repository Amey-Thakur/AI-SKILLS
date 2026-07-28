---
name: zero-results-handling
description: Turn an empty result set into a useful next step instead of a dead end, and treat the query as a signal worth acting on. Use when searches return nothing and users leave.
---

# Zero results handling

An empty results page is the moment a user decides whether search works.
It is also the clearest feedback the product ever receives: someone
wanted something specific and you had nothing to offer.

## Method

1. **Say plainly that nothing matched, and what was searched.** Echo the
   interpreted query so the user can see a typo or an unintended filter
   (see query-understanding).
2. **Offer the most likely fix first.** A spelling correction, a
   relaxed filter, or a broader match, presented as an action rather
   than advice (see typo-tolerance).
3. **Relax filters before relaxing the query.** Filters cause more empty
   sets than query terms do, and showing which filter emptied the set
   is often the whole fix (see faceted-search).
4. **Show something genuinely useful instead of nothing.** Popular
   items, recent content, or category entry points, clearly labelled as
   alternatives rather than as results.
5. **Give a path to a human or a request form.** For products where the
   thing might exist but is not findable, this converts an abandonment
   into a conversation.
6. **Log every zero-result query and review them.** They form a ranked
   list of missing content, missing synonyms, and broken parsing (see
   search-analytics).
7. **Never fabricate results to avoid the empty state.** Loosening until
   something appears erodes trust in every result you return.

## Boundaries

- Handling the empty state improves the experience; it does not create
  the missing content, which is the real fix for most cases.
- Suggested alternatives must be clearly distinguished from matches, or
  users believe the results are wrong rather than absent.
- Some queries genuinely have no answer, and saying so plainly is the
  honest outcome.

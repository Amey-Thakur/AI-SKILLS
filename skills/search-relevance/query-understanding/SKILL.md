---
name: query-understanding
description: Interpret what a user meant before matching, through normalisation, intent detection, and entity extraction. Use when queries are short, ambiguous, or full of product-specific language.
---

# Query understanding

A query is a compressed intent. Two words may name a product, describe a
problem, or ask a question, and treating all three as bags of tokens
produces mediocre results for each. Understanding happens before
matching and shapes everything after.

## Method

1. **Normalise before anything else.** Trim, lowercase, unify
   punctuation and unicode forms so equivalent queries take the same
   path (see character-encoding).
2. **Detect the query type.** Navigational, informational, and
   transactional queries want different result shapes, and misreading
   the type is why a good match still feels wrong.
3. **Extract structure from the text.** A query containing a size, a
   date, a brand, or a code is partly a filter, and pulling that out
   beats hoping the ranker handles it (see faceted-search).
4. **Expand cautiously.** Adding synonyms and related terms improves
   recall and dilutes precision, so expansion needs measuring rather
   than assuming (see synonyms-and-stemming).
5. **Handle the head and the tail differently.** Frequent queries
   deserve curated results; the long tail needs the general path to
   degrade gracefully.
6. **Keep the original query visible and restorable.** Users must see
   what was interpreted and be able to override it, since silent
   rewriting is deeply frustrating when wrong.
7. **Log the interpretation, not just the query.** Debugging relevance
   requires knowing what the system thought the user meant (see
   search-analytics).

## Boundaries

- Understanding improves matching; it cannot rescue an index that lacks
  the content being asked for.
- Aggressive rewriting produces confident wrong answers, which users
  trust less than an honest miss.
- Language-specific handling is required, since tokenisation and
  segmentation differ fundamentally between scripts.

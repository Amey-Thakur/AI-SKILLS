---
name: full-text-search-design
description: Design a text search feature with the right analyzer, fields, and matching model so results are relevant rather than merely returned. Use when adding search to a product or replacing a LIKE query that no longer works.
---

# Full-text search design

Search that returns rows is easy; search that returns the right rows
first is the actual product. The decisions that matter are made at index
time, because an analyzer chosen badly cannot be compensated for by
query tricks later.

## Method

1. **Start from the queries people will type.** Sample real queries or
   write the twenty you expect, and design the index to answer those
   rather than to model the data neatly.
2. **Choose the analyzer deliberately per field.** Tokenisation,
   lowercasing, stemming, and stopwords transform text at index and
   query time, and they must match on both sides or nothing hits (see
   synonyms-and-stemming).
3. **Separate fields by role and weight them.** A title match matters
   more than a body match, and a tag match differs from both. One
   catch-all field discards the signal that makes ranking work.
4. **Keep an unanalysed copy for exact needs.** Identifiers, codes, and
   filters need exact matching, and running them through a stemmer
   destroys them.
5. **Decide the matching model before tuning.** Whether all terms must
   match, most, or any changes result sets far more than scoring
   adjustments do.
6. **Plan for updates from day one.** How documents get reindexed on
   change, and what the acceptable staleness is, decides the whole
   pipeline shape (see search-indexing-pipeline).
7. **Measure with a judged set, not by feel.** A handful of queries with
   known good results turns tuning from opinion into a comparison (see
   relevance-tuning).

## Boundaries

- A database LIKE query is not search; it cannot rank, and it scans.
  Moving to a search engine is a real architectural addition (see
  sql-optimization).
- Relevance is domain-specific, so defaults are a starting point rather
  than an answer.
- Semantic similarity needs embeddings and is complementary rather than
  a replacement (see hybrid-search).

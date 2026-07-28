---
name: hybrid-search
description: Combine keyword and vector retrieval so exact terms and semantic meaning both work, and fuse the two rankings sensibly. Use when keyword search misses paraphrases or vector search misses exact identifiers.
---

# Hybrid search

Keyword search nails exact terms and fails on paraphrase; vector search
does the opposite and confidently misses a product code. Hybrid keeps
both and spends its complexity on combining two rankings that are not
directly comparable.

## Method

1. **Confirm you need both.** If queries are mostly exact terms,
   keyword alone is simpler and cheaper. Hybrid is justified by real
   paraphrase traffic, not by novelty.
2. **Retrieve independently, then fuse.** Run both retrievers and
   combine the ranked lists rather than trying to blend raw scores,
   which are on incompatible scales.
3. **Prefer rank-based fusion as the default.** Reciprocal rank fusion
   needs no calibration and is hard to beat without tuning, which makes
   it the right starting point.
4. **Keep exact matching authoritative.** Identifiers, codes, and quoted
   phrases should not be outranked by something semantically nearby
   (see typo-tolerance).
5. **Choose and freeze an embedding model per index.** Mixing
   embeddings from different models within one index makes distances
   meaningless, and changing models means reindexing (see
   embeddings-selection).
6. **Rerank the fused head when quality justifies the cost.** A cross
   encoder over the top results improves ordering considerably at real
   latency cost (see retrieval-reranking).
7. **Evaluate against the same judged set as keyword.** Hybrid must be
   shown better on your queries, not assumed better (see
   relevance-tuning).

## Boundaries

- Hybrid adds an embedding pipeline, a vector store, and reindexing
  obligations, which is real operational weight.
- Vector recall degrades on very short queries where there is little
  semantic signal to work with.
- Semantic similarity is not relevance; two documents can be close in
  meaning and useless for the query.

---
name: embeddings-selection
description: Choose embedding models and chunking by evaluating retrieval on your own corpus, not by leaderboard rank. Use when building semantic search or RAG and deciding how to embed and chunk.
---

# Embeddings selection

The embedding model and the chunking strategy together determine what
retrieval can find. Both are decided the same way: by measuring
retrieval quality on your own corpus and queries, because leaderboard
rank rarely survives contact with a specific domain.

## Method

1. **Build a retrieval eval set first.** Real queries paired
   with the documents that should answer them (from logs,
   from domain experts, or synthesized then human-checked):
   this is what makes every downstream choice measurable
   (see llm-eval-design). Metrics: recall@k (did the right
   chunk make the top k?) and MRR; without this set, model
   selection is vibes and chunk-size is superstition.
2. **Match the model to domain, cost, and constraints.**
   General models (the strong hosted APIs) are the default
   baseline; domain-specialized or fine-tuned embeddings win
   on jargon-heavy corpora (legal, medical, code): test both
   on your set. Weigh dimensionality (storage and search
   cost scale with it: see data-partitioning of vectors),
   context length (can it embed your chunk sizes?),
   multilingual needs, and hosted-vs-local (privacy, cost,
   latency: see managed-vs-selfhosted). Matryoshka/truncatable
   embeddings let you trade dimensions for cost after the
   fact.
3. **Chunk for the retrieval unit, not the file.** Chunk size
   trades precision (small: exact matches, lost context)
   against recall of complete answers (large: context kept,
   diluted relevance); 200-500 tokens with overlap is a
   common start, but your eval set decides. Respect
   structure (split on headings/paragraphs, never mid-
   sentence), keep metadata (source, section) on each chunk
   (see rag-pipeline's citation needs), and consider
   parent-child (embed small, return the enclosing section).
4. **Test the pairing, because they interact.** The same
   model performs differently across chunk sizes; evaluate
   model-and-chunking as one grid on the eval set, not
   separately. This is the step teams skip and then blame
   the model for a chunking failure (or vice versa).
5. **Add hybrid and reranking where the eval demands.**
   Dense embeddings miss exact-term and rare-token matches
   (IDs, names, code symbols): hybrid with keyword/BM25
   (see sql-optimization's FTS instincts) recovers them;
   a cross-encoder reranker over the top-k lifts precision
   at a latency cost (see llm-cost-latency). Add each only
   when the eval set shows the gap it closes; complexity
   without a measured win is debt.
6. **Plan for re-embedding as a migration.** Changing the
   embedding model means re-embedding the whole corpus
   (embeddings are not comparable across models): version
   the index, backfill offline (see incremental-processing,
   data-pipeline-design's backfill discipline), and cut over
   atomically. Budget this before choosing a model you might
   outgrow, and normalize/version dimensions so search code
   stays stable.

## Boundaries

- Retrieval quality is upstream of generation quality: no
  prompt rescues answers the retriever never surfaced, so
  fix retrieval first when RAG underperforms (see
  rag-pipeline's failure triage).
- Embeddings encode similarity, not truth or recency;
  freshness and authority are metadata-and-ranking
  concerns layered on top, not properties of the vector.
- Vector-store choice (index type, filtering, scale) is a
  separate infrastructure decision (see cloud-storage-
  selection instincts); the embedding decision comes first
  and constrains it (dimensions, distance metric).

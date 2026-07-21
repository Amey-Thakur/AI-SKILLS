---
name: retrieval-reranking
description: Improve RAG answer quality by reranking retrieved candidates so the most relevant chunks reach the model. Use when a retrieval system returns roughly-right documents but the best ones are not on top, or answers miss available evidence.
---

# Retrieval reranking

Vector search is fast but coarse: it returns candidates in roughly the
right neighborhood, not perfectly ordered by relevance. Reranking adds a
second, more precise pass over the top candidates so the chunks that
actually answer the query land at the top, where the model uses them.

## Method

1. **Diagnose that reranking is the fix.** Reranking helps when the right
   chunk is retrieved but ranked low (the model never sees it within the
   top-k budget), or when top results are near-duplicates crowding out
   diverse evidence. If the right chunk is not retrieved at all, that is a
   retrieval or chunking problem, not a ranking one (see rag-pipeline,
   embeddings-selection).
2. **Retrieve wide, then rerank narrow.** Pull more candidates than you
   need from the first-stage retriever (e.g. top 30-50), then rerank and
   keep the best few for the context (see context-engineering's top-k
   budget). The first stage optimizes recall; the reranker optimizes
   precision on that shortlist.
3. **Use a cross-encoder or LLM reranker for the precise pass.** Bi-encoder
   vector similarity scores query and document separately; a cross-encoder
   scores them together and judges relevance far better, at higher cost
   per pair (affordable on a shortlist, not the whole corpus). An LLM
   reranker (score each candidate's relevance to the query) is a flexible
   alternative where a dedicated model is unavailable.
4. **Combine signals where they help.** Hybrid retrieval (dense vectors
   plus keyword/BM25) catches what pure semantic search misses (exact
   terms, IDs, rare words); fuse the rankings before or during reranking.
   Add recency or authority as ranking features when the domain rewards
   them.
5. **Deduplicate and diversify the final set.** Drop near-identical chunks
   so the context carries distinct evidence, not five copies of one
   paragraph; where a query has multiple facets, ensure the top set covers
   them rather than piling onto one.
6. **Measure end to end.** Evaluate retrieval quality (did the right chunk
   make the final top-k?) and answer quality with and without reranking on
   a real query set (see llm-eval-design, agent-eval-design); reranking
   adds latency and cost, so confirm it earns them.

## Boundaries

- Reranking cannot surface what first-stage retrieval never returned; fix
  recall (chunking, embeddings, hybrid search) before adding a reranker
  (see rag-pipeline).
- The extra pass adds latency and cost per query; on a shortlist it is
  modest, but budget it (see llm-cost-latency) and skip it where
  first-stage results are already clean.
- Better ranking does not fix a model that ignores provided context;
  pair it with grounding and good context assembly (see
  context-engineering).

---
name: vector-store-operations
description: Run a vector index in production, covering dimensions, filtering, updates, and reindexing when the embedding model changes. Use when semantic search is live and must stay correct as data and models change.
---

# Vector store operations

A vector index is a derived structure tied to a specific embedding
model. The operational realities that surprise teams are that filters
interact badly with approximate search, updates are not free, and
changing the model means rebuilding everything.

## Method

1. **Pin the embedding model per index.** Vectors from different models
   are not comparable, so a model change is a full reindex rather than a
   rolling update (see embeddings-selection).
2. **Understand your filtering model.** Pre-filtering and post-filtering
   behave very differently with approximate search, and post-filtering
   can return far fewer results than requested.
3. **Store metadata alongside vectors.** Filters on source, date, and
   permissions need to be evaluated in the index rather than after
   retrieval (see realtime-permissions).
4. **Plan updates and deletions explicitly.** Some indexes handle
   deletion by tombstoning and degrade until compacted, which is an
   operational task rather than an automatic one.
5. **Build into a new index and swap.** Reindexing in place leaves the
   system serving inconsistent results during the rebuild (see
   search-indexing-pipeline).
6. **Tune recall against latency deliberately.** Approximate search has
   parameters that trade accuracy for speed, and the defaults are rarely
   right for a specific corpus.
7. **Monitor index size, latency, and recall over time.** All three
   drift as data grows, and recall degradation is silent.

## Boundaries

Vector search finds similar things, which is not always relevant things
(see hybrid-search). Approximate indexes trade guaranteed recall for
speed by design. Vector databases add infrastructure that a modest
corpus may not justify.

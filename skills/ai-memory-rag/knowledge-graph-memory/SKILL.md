---
name: knowledge-graph-memory
description: Store facts as entities and relationships when questions depend on connections rather than similarity. Use when retrieval must answer who relates to what rather than find similar text.
---

# Knowledge graph memory

Vector retrieval finds text that resembles the query. Some questions are
not about resemblance at all: who reports to whom, which service depends
on which, what changed between these two things. Those are graph
questions, and similarity search answers them badly.

## Method

1. **Use a graph when relationships are the query.** Traversal,
   dependency, and connection questions belong here; similarity and
   passage retrieval do not.
2. **Define the entity and relationship types deliberately.** A schema
   with a handful of clear types is queryable; an open extraction
   producing hundreds of relation names is not.
3. **Resolve entities carefully.** The same person or service named
   three ways becomes three nodes, and entity resolution is where graph
   quality is won or lost (see deduplication-queries).
4. **Keep provenance on every edge.** Which document asserted this
   relationship and when, since graphs built by extraction contain
   errors that must be traceable.
5. **Combine graph with text retrieval.** Traverse to find the relevant
   entities, then retrieve their supporting passages for the model to
   read (see hybrid-search).
6. **Update relationships as sources change.** A stale edge is more
   misleading than stale prose because it reads as structured fact (see
   rag-freshness).
7. **Bound traversal depth.** Deep queries return large subgraphs that
   exceed context and rarely improve the answer.

## Boundaries

Graphs cost extraction and maintenance that a text index does not, and
automated extraction is error-prone. They answer structural questions
and are poor at nuance that lives in prose. A small corpus rarely
justifies the construction effort.

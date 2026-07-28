---
name: chunking-strategies
description: Split documents into retrieval units that preserve meaning, so a retrieved chunk answers the question rather than trailing off mid-thought. Use when building or fixing a retrieval pipeline whose results are technically relevant but useless.
---

# Chunking strategies

Chunking decides what retrieval can ever return. A chunk that splits a
definition from its example, or a table from its header, cannot be
rescued by a better embedding model or a smarter reranker. Most RAG
quality problems are chunking problems.

## Method

1. **Split on structure before size.** Headings, sections, and
   paragraphs are meaning boundaries the author already provided, and
   respecting them beats any fixed character count.
2. **Size to the question, not to the model's limit.** Chunks large
   enough to contain a complete answer and small enough that most of the
   chunk is relevant, which is usually far below the context window.
3. **Overlap modestly at boundaries.** A small overlap prevents an
   answer that straddles a split from being lost, at the cost of some
   duplication in results.
4. **Carry context into the chunk.** Document title, section heading,
   and date prepended to the text, since a retrieved chunk arrives
   without its surroundings and must stand alone.
5. **Treat tables, code, and lists as units.** Splitting them produces
   fragments that are worse than useless because they look authoritative
   and are incomplete (see document-parsing).
6. **Keep a link back to the source location.** Every chunk needs enough
   provenance to cite and to let a user open the original (see
   citation-grounding).
7. **Evaluate chunking as a variable.** Re-index with different
   strategies and measure retrieval quality, because intuition about
   chunk size is usually wrong (see rag-evaluation).

## Boundaries

Chunking shapes retrieval; it cannot compensate for content that does
not contain the answer. Re-chunking requires full reindexing, so the
strategy is expensive to change late (see rag-freshness). Different
document types in one corpus may need different strategies rather than
one compromise.

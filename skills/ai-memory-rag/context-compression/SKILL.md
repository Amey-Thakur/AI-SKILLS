---
name: context-compression
description: Reduce retrieved material to what the model needs, through filtering, extraction, and summarisation, before it reaches the prompt. Use when retrieved context is large, mostly irrelevant, or crowding out reasoning.
---

# Context compression

Retrieval returns passages that are relevant to the query; much of each
passage is not relevant to the answer. Compression removes the excess
before it consumes context, which improves both cost and the model's
attention on what matters.

## Method

1. **Filter before compressing.** Dropping a passage that should not
   have been retrieved is cheaper and safer than summarising it (see
   retrieval-reranking).
2. **Extract the relevant spans.** Pulling the sentences that bear on
   the question preserves exact wording, which matters for citation and
   for faithfulness (see citation-grounding).
3. **Prefer extraction to summarisation.** Summarising introduces a
   paraphrase step that can distort, while extraction cannot invent.
4. **Compress per passage, not across them.** Merging passages loses
   provenance and blends sources that should stay distinguishable.
5. **Keep the structure that carries meaning.** Headings, dates, and
   identifiers are small and disproportionately useful for the model's
   reasoning.
6. **Budget explicitly.** Decide how much context the answer step gets
   and compress to fit, rather than sending everything and letting the
   window truncate arbitrarily (see context-window-management).
7. **Measure the effect on answer quality.** Compression that improves
   cost and degrades faithfulness is not a win (see rag-evaluation).

## Boundaries

Compression trades completeness for focus, and an aggressive filter can
remove the passage that mattered. Every compression step is itself a
model call with cost and latency. For small retrieved sets the overhead
usually exceeds the benefit.

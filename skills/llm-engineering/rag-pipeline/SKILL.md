---
name: rag-pipeline
description: Design a retrieval-augmented generation pipeline that answers from sources and can be trusted. Use when building or debugging RAG: chunking, embedding, retrieval, context assembly, and grounding.
---

# RAG pipeline

Retrieval-augmented generation is only as good as what it retrieves. A wrong
or missing chunk produces a confident wrong answer, so build the retrieval
half with the same rigor as the generation half, and make every answer
traceable to a source.

## Method

1. **Decide what a good answer needs before indexing anything.** The
   questions the system must answer determine the chunk size, the metadata,
   and the retrieval strategy. A pipeline tuned for "find the one relevant
   sentence" differs from one tuned for "summarize this whole section".
2. **Chunk on meaning, not on character count.** Split at natural boundaries
   (headings, paragraphs, function definitions), keep chunks self-contained
   enough to stand alone, and carry metadata with each: source document,
   heading path, page or line. Overlap adjacent chunks slightly so a fact
   split across a boundary survives. Oversized chunks bury the signal;
   undersized chunks lose the context that makes them meaningful.
3. **Retrieve hybrid, not one-signal.** Keyword search (BM25 or full-text)
   catches exact terms and names; vector search catches meaning and
   paraphrase. Blend both, because each misses what the other finds. Retrieve
   more than you need, then rerank down to the best few.
4. **Pack the context to the model's real window.** Fit the top chunks to the
   available tokens after the system prompt, history, and reserved answer
   room, best first. When it does not all fit, drop the lowest-ranked chunks
   rather than truncating one mid-thought.
5. **Ground the generation and demand citations.** Instruct the model to
   answer only from the provided context, to say "the sources do not cover
   this" when they do not, and to cite the source for each claim. An answer
   that cannot point to a chunk is a hallucination with good manners.
6. **Evaluate retrieval and generation separately.** Most RAG failures are
   retrieval failures wearing a generation costume. Measure whether the right
   chunk was retrieved (recall on a labeled question set) apart from whether
   the answer was faithful to it. You cannot fix what you cannot localize.

## Common failures

- The answer is confidently wrong: the right chunk was never retrieved.
  Fix retrieval (chunking, hybrid search, reranking), not the prompt.
- The answer ignores the context: weak grounding instruction, or the context
  arrived above the model's attention. Strengthen the instruction, shorten
  the context.
- Citations are invented: the model was not given stable source ids to cite.
  Label each chunk and require the label.
- Fresh data is missing: the index is stale. Re-index on a schedule that
  matches how fast the sources change.

## Boundaries

RAG adds knowledge, not reasoning. If the task needs multi-step logic over the
retrieved facts, that is a generation and prompting problem on top of
retrieval, not more retrieval. And no pipeline rescues sources that do not
contain the answer; say so rather than generating around the gap.

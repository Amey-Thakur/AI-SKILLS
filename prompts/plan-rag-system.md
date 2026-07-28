---
name: plan-rag-system
description: Plan a retrieval system with chunking, evaluation, and freshness decided before building.
variables:
  - "{corpus}: the documents, their structure, size, and how often they change"
  - "{questions}: what users will ask and how precise answers must be"
settings: "Temperature 0.3."
---

Plan a retrieval system for:

{corpus}

Expected questions: {questions}

Use chunking-strategies, rag-evaluation, citation-grounding, and
rag-freshness.

Produce:
- Chunking strategy derived from the document structure.
- What metadata travels with each chunk.
- Retrieval approach, and whether hybrid is justified.
- How answers cite sources and how citations are verified.
- The evaluation set and how retrieval and generation are measured
  separately.
- Index update strategy and the staleness budget.
- Behaviour when nothing relevant is found.

Rules: chunking decides the ceiling, so start there. Evaluate retrieval
and generation separately or you cannot tell which failed. Refusing when
the corpus lacks the answer is correct behaviour and must be tested.
State what the corpus cannot answer.

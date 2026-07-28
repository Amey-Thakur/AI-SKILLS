---
description: "Plan a retrieval system with chunking, evaluation, and freshness decided before building."
argument-hint: "[corpus]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

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

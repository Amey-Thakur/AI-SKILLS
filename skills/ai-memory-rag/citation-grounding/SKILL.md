---
name: citation-grounding
description: Tie every claim in a generated answer to the retrieved passage that supports it, so users can verify and unsupported claims are visible. Use when answers are drawn from documents users may need to check.
---

# Citation grounding

An answer without citations asks the user to trust it. An answer with
citations that do not support the claim is worse, because it looks
verified. Grounding is the discipline of making the link real and
checkable.

## Method

1. **Cite at the claim, not at the end.** A single reference at the
   bottom of a paragraph tells the reader nothing about which sentence
   came from where.
2. **Cite what was actually retrieved.** The model must reference the
   passages it was given, and a citation to a document that was not in
   context is fabricated regardless of whether the document exists.
3. **Verify citations mechanically.** Check that each cited identifier
   was in the provided context, which catches the most common
   fabrication cheaply (see agent-generate-and-verify).
4. **Make the citation openable.** Deep link to the passage with enough
   location detail for the user to find it in the source (see
   chunking-strategies).
5. **Mark unsupported statements plainly.** Where the model adds
   reasoning beyond the sources, that should be visibly distinct from
   what the documents state.
6. **Prefer refusal to unsourced assertion.** When the context does not
   answer the question, saying so is correct behaviour rather than
   failure (see rag-evaluation).
7. **Keep quotes short and exact.** A brief verbatim span is stronger
   evidence than a paraphrase and is checkable at a glance.

## Boundaries

Citations show provenance, not correctness: a faithfully cited source
can itself be wrong. Verification confirms the passage was present, not
that it supports the claim, which needs a semantic check. Heavy citation
harms readability, so density is a design decision.

---
name: literature-review
description: Review a body of sources by synthesising across them rather than summarising each in turn.
variables:
  - "{sources}: the papers, articles, or documents to review"
  - "{question}: what the review is meant to establish"
settings: "Temperature 0.3."
---

Review this literature:

{sources}

Question: {question}

Use research-synthesis, fact-checking, and correlation-causation.

Produce:
- The question and how sources were selected.
- Themes across sources, with which support each.
- Where sources disagree, and the likely reason.
- The strength of evidence: study design, sample, replication.
- What is not established despite being widely stated.
- Gaps where the literature is silent.
- What this means for the question.

Rules: synthesise across sources rather than summarising them
sequentially. Weight by evidence quality rather than by citation count.
State disagreement rather than averaging it. Distinguish correlation
from causation in every claim. Cite specifically.

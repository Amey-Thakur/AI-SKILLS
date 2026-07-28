---
description: "Review a body of sources by synthesising across them rather than summarising each in turn."
argument-hint: "[sources]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

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

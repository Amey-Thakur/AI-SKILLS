---
description: "Plan an analysis before touching the data, with the question, the method, and what would falsify the hypothesis."
argument-hint: "[question]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Plan an analysis for:

{question}

Available data: {data}

Use exploratory-data-analysis, statistical-inference, and
correlation-causation.

Produce:
- The question restated so it has a checkable answer.
- The population and time window, defined precisely.
- The metric definition, including exclusions.
- The method, and why it fits the question.
- Confounders and how they are handled.
- What result would change the decision, stated in advance.
- What this analysis cannot establish.

Rules: define the metric before querying. State what would falsify the
hypothesis before looking. Distinguish what the data can support from
what it merely suggests. If the data cannot answer the question, say so
rather than answering a different one.

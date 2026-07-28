---
description: "Scope a research question so the work is bounded, the sources are named, and the output is decided in advance."
argument-hint: "[question]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write a research brief for:

{question}

Constraints: {constraints}

Use research-planning, deep-research, and fact-checking.

Produce:
- The question refined so it has a findable answer.
- Sub-questions that must be answered.
- Source types, ranked by reliability for this question.
- What would count as sufficient evidence.
- Known biases in the likely sources.
- The output format and its length.
- What is out of scope.

Rules: bound the question, since an unbounded one produces an unbounded
search. State the evidence standard before starting. Name the sources you
expect to be unreliable. Say what you will do if the evidence is
inconclusive.

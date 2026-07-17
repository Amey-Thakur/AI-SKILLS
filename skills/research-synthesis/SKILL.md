---
name: research-synthesis
description: Turn multiple sources into a defensible, source-attributed answer that separates fact from inference. Use when researching a question across documents, articles, or search results.
---

# Research synthesis

Synthesis is not summarizing sources one after another. It is answering the
question with claims you can defend, each traceable to evidence.

## Method

1. **Sharpen the question first.** "What should we know about X?" becomes
   "Does X do Y under condition Z, and at what cost?" A precise question
   makes relevance decidable; a vague one makes everything relevant and
   nothing conclusive.
2. **Gather with hostility toward your first answer.** Search for the
   claim *and* its negation. Prefer primary sources (the paper, the spec,
   the changelog, the benchmark) over commentary about them; note each
   source's date and incentive — a vendor's benchmark and an academic's
   are different evidence.
3. **Extract claims, not paragraphs.** From each source pull the specific
   assertions relevant to the question, each tagged with its source and
   whether it is measured, reported, or opined.
4. **Reconcile before writing.** Where sources agree, the claim strengthens.
   Where they conflict, say so and adjudicate: newer data, better
   methodology, closer to primary — or declare it genuinely unsettled.
   A synthesis that hides its conflicts is an advertisement.
5. **Write the answer in three layers:**
   - *The answer*: two or three sentences, direct, first.
   - *The evidence*: the claims that support it, each attributed ("per the
     v2 spec…", "the 2025 benchmark found…").
   - *The edges*: what is uncertain, contested, or unknown, and what
     evidence would settle it.
6. **Mark inference as inference.** When you bridge a gap ("A implies
   likely B"), flag it: "this is inference, not stated by any source."
   Readers can weigh a marked inference; an unmarked one is contamination.

## Rules

- No claim without a source; no source without a date-awareness check
  (is this still true?).
- Absence of evidence gets said plainly: "none of the reviewed sources
  address this."
- Quantities beat qualities: "3× slower on the 10k-row case" over "much
  slower", whenever the source gives numbers.
- The confidence of your prose must track the strength of your evidence.
  One blog post earns "one report suggests", never "it is known".

## Litmus test

Could a skeptical reader, given only your synthesis, locate the exact
source for every load-bearing claim — and would the two or three sentences
at the top survive them checking?

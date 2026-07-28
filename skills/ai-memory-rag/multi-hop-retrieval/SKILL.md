---
name: multi-hop-retrieval
description: Answer questions that need several linked lookups by decomposing the query and retrieving in sequence. Use when questions require combining facts that never appear in the same passage.
---

# Multi-hop retrieval

Single-shot retrieval answers questions whose answer sits in one place.
Questions that require connecting two facts fail silently, returning
passages relevant to the surface words and missing the connection
entirely.

## Method

1. **Detect when one hop is insufficient.** Comparisons, causal chains,
   and questions containing an unresolved reference usually need
   decomposition rather than a bigger top-k.
2. **Decompose into answerable sub-questions.** Each one retrievable on
   its own, with the second often depending on the first's answer (see
   agent-plan-execute-replan).
3. **Feed each answer into the next query.** The point of hopping is
   that the intermediate result narrows the next search, which a
   parallel fan-out does not achieve.
4. **Cap the hops.** Two or three, then answer with what you have,
   because unbounded chains accumulate error and cost quickly.
5. **Carry provenance through every hop.** The final answer must cite
   the sources from each step, not only the last (see
   citation-grounding).
6. **Detect and stop on dead ends.** A hop that retrieves nothing
   relevant should end the chain with an honest partial answer rather
   than continuing on a guess.
7. **Verify the assembled chain.** The individual facts may be right and
   the connection wrong, which is a distinct failure worth checking
   (see agent-generate-and-verify).

## Boundaries

Multi-hop multiplies latency and cost by the number of hops, so it suits
questions that need it rather than being the default. Error compounds
across hops, making chains beyond a few steps unreliable. Some
connections are genuinely absent from the corpus and no amount of
hopping finds them.

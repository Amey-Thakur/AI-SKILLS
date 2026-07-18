---
name: agent-research-lab
description: Run a lab of researcher agents that search in parallel, verify sources independently, and synthesize a cited answer. Use when a question needs breadth of sources and every load-bearing claim must trace to evidence.
---

# Research lab of agents

One agent researching a question returns whatever its first searches surfaced,
citations included, some of them invented. A lab splits the roles that keep
research honest: searchers cover the question in parallel, a verifier re-checks
every source, and a synthesizer writes the answer with each claim attributed.
The verifier is the point: an unchecked agent citation is a guess wearing a URL.

## Team

- **Lead** (`research-synthesis`): sharpens the question and splits it.
- **Searchers**: fan out on sub-questions in parallel.
- **Verifier**: re-fetches each source and confirms the claim.
- **Synthesizer** (`research-synthesis`): writes the cited answer.

Shape: parallel fan-out, then a verification gate, then synthesis; see the
`deep-research` harness.

## Method

1. **Sharpen and decompose the question.** The lead turns "what about X" into a
   precise question, then splits it into non-overlapping sub-questions, one per
   searcher, so fan-out does not duplicate work.
2. **Fan searchers out in parallel.** Each returns `sources.jsonl` records:
   claim, url, publication date, exact quote, and the source's incentive. Primary
   sources (spec, paper, changelog) outrank commentary about them.
3. **Assign one agent to the negation.** Someone searches for disconfirming
   evidence explicitly, so the lab is not just a confirmation machine for the
   first hypothesis.
4. **Verify every source independently.** A separate agent re-fetches each url,
   confirms the quote exists and supports the claim, and marks it confirmed,
   refuted, or unsupported. Unsupported citations are cut, not softened.
5. **Reconcile conflicts on the record.** Where sources disagree, adjudicate by
   recency and method, or declare the point genuinely unsettled. A synthesis that
   hides its conflicts is an advertisement.
6. **Synthesize in three layers.** `report.md` gives the answer in two or three
   sentences, then the attributed evidence, then the edges: what is uncertain and
   what would settle it. Mark every inference as inference.

## Run it

In Claude Code, spawn searchers as parallel subagents in one turn, each with a
sub-question and web access, writing to a shared `sources.jsonl`; then run the
verifier as its own subagent over that file before the synthesizer reads only
verified rows. Port it to CrewAI as parallel search tasks feeding a synthesis
task, to AutoGen as a GroupChat with a dedicated fact-checker, or to LangGraph as
a fan-out then fan-in graph with a verification node between search and synthesis.

## Signals it works

- Every load-bearing claim in the report cites a source the verifier confirmed.
- At least one searched-for counter-source appears, or its absence is stated.
- The top two or three sentences survive a skeptic re-checking their citations.

## Boundaries

This organizes agent research; it does not make agents trustworthy on paywalled,
very recent, or specialist sources they cannot actually fetch. Verification
catches fake citations, not deep methodological flaws in a real paper, which
needs human expertise. Treat the output as a sourced draft for a human to sign,
not a final authority.

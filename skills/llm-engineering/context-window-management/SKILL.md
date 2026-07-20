---
name: context-window-management
description: Budget tokens across system prompt, history, and retrieval, with compaction that keeps what matters. Use when building long-running LLM applications or debugging context overflow and mid-conversation amnesia.
---

# Context window management

Context is a budget, and everything competes for it: instructions,
history, retrieved documents, tool results. Manage it like memory in
an embedded system: allocated by purpose, compacted under pressure,
with the invariant that the most decision-relevant tokens survive.

## Method

1. **Partition the budget explicitly.** Fixed allocation for
   the system prompt (keep it lean: every instruction competes
   with data for attention), a reserve for the response, and
   the remainder split between history and retrieval by the
   application's shape (chat leans history; Q&A leans
   retrieval: see rag-pipeline). Know your model's real
   window and your p95 usage against it: overflow failures
   are a capacity-planning problem (see capacity-planning).
2. **Compact history hierarchically, not by truncation.**
   Rolling summarization: old turns compress into a summary
   block (decisions made, facts established, current goal),
   recent turns stay verbatim: the summary is regenerated as
   turns age past a threshold. Naive head-truncation deletes
   the instructions and early decisions that the conversation
   still depends on (the mid-conversation amnesia bug).
3. **Preserve the load-bearing tokens.** Some content must
   never compact away: the task definition, hard constraints,
   user identity/preferences, schema definitions for
   structured output (see structured-output), and safety
   instructions. Pin them (re-inject after compaction) rather
   than trusting the summarizer to keep them (see
   agent-memory for durable cross-session state; this skill
   is within-session).
4. **Trim retrieval to relevance, not availability.** Rank
   retrieved chunks, take top-k under the retrieval budget,
   and prefer many small relevant chunks over few large
   loose ones (see embeddings-selection's chunking
   interplay); deduplicate near-identical chunks (retrieval
   loves returning five copies of the same paragraph);
   summarize tool results that are data dumps before they
   enter context (a 50KB JSON response is usually 500
   tokens of decision-relevant content wearing a payload).
5. **Watch position effects.** Models attend best to the
   start and end of context: instructions up front,
   the immediate question and freshest data near the end,
   the middle for reference material: and verify with
   needle tests on your actual layout when correctness
   depends on mid-context content (long-context claims
   degrade under load; measure, do not trust the
   spec sheet: see llm-eval-design).
6. **Instrument token flows in production.** Per-request
   token counts by section (system/history/retrieval/
   response), compaction frequency, and overflow events
   (see llm-observability): rising history share means the
   compaction threshold needs tuning; cost tracks tokens
   linearly, so this dashboard is also the bill (see
   llm-cost-latency).

## Boundaries

- Bigger windows are not a strategy: cost scales with
  tokens, latency grows, and attention quality drops
  before the hard limit; compaction discipline pays at
  every window size.
- Summaries are lossy by design; applications where exact
  history matters (legal, medical, audit) need verbatim
  logs outside the context (see audit-logging) with
  retrieval back in, not longer summaries.
- Prompt caching changes the economics of stable prefixes
  (see llm-cost-latency) and rewards a fixed
  system-prompt layout; design the partition with caching
  in mind from the start.

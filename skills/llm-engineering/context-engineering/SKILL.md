---
name: context-engineering
description: Assemble what goes into an LLM's context on each call: selecting, ordering, and formatting the right information. Use when deciding what to put in a prompt or debugging why a model ignores or misuses provided information.
---

# Context engineering

The model can only use what is in its context, and it uses that content
better or worse depending on what else is there and where. Context
engineering is the discipline of assembling each call's context so the
right information is present, findable, and not buried.

## Method

1. **Select for relevance, ruthlessly.** More context is not better:
   irrelevant content dilutes attention and invites the model to latch
   onto the wrong thing. Include what the current decision needs, and cut
   the rest. Retrieval, tool results, and history each earn their place
   or get trimmed (see context-window-management for the budget).
2. **Order by importance and position effects.** Models attend most to
   the start and end of context. Put the instructions and role up front,
   the immediate task and freshest data near the end, and reference
   material in the middle. Verify with your own layout when correctness
   depends on mid-context content; long-context recall degrades under
   load (see llm-eval-design).
3. **Structure and delimit clearly.** Separate instructions from data
   from examples with clear markers; label retrieved sources; use
   consistent formatting the model can parse. Ambiguity about which text
   is instruction versus data is also the injection surface (see
   llm-guardrails: treat retrieved and tool content as untrusted).
4. **Compress information-dense inputs.** A 50KB tool result is usually
   500 tokens of decision-relevant content in a payload; summarize or
   extract before it enters context. Tables, logs, and documents get
   distilled to what the task needs, not pasted raw.
5. **Keep stable content stable for caching.** Put the fixed parts
   (system prompt, tool definitions, few-shot examples) first and
   unchanging so prompt caching can reuse them (see prompt-caching); vary
   only the tail. This shapes both cost and latency.
6. **Ground the model in its sources.** For factual work, put the
   retrieved evidence in context and instruct the model to answer from it
   and cite it, so it grounds rather than confabulates (see rag-pipeline,
   embeddings-selection). Provided-but-ignored context usually means it
   was buried, unlabeled, or contradicted by something else present.

## Boundaries

- Context engineering assembles what the model sees; it does not fix a
  model that lacks the capability, or a retrieval layer returning the
  wrong documents (see rag-pipeline for that half).
- Bigger context windows do not remove this work: cost rises with tokens,
  and attention quality drops before the hard limit, so selection still
  pays at every window size.
- Within-call context assembly is distinct from cross-session memory
  (what to persist and recall between conversations: see agent-memory).

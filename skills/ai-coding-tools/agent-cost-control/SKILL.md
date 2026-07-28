---
name: agent-cost-control
description: Keep agent usage within budget through context discipline, model selection, and caching, without degrading results. Use when agent costs are rising or long sessions are expensive.
---

# Agent cost control

Cost scales with tokens processed, and most waste is context that was
never needed. Controlling it is mostly about what you send rather than
about using a weaker model.

## Method

1. **Reduce context before reducing model.** Trimming irrelevant files
   preserves quality while cutting cost; a weaker model may not (see
   context-compression).
2. **Use prompt caching for stable prefixes.** Instructions and
   reference material that repeat across turns can be cached at
   substantially lower cost (see prompt-caching).
3. **Match the model to the task.** Routine mechanical edits do not need
   the strongest model, while architectural work does (see
   agent-progressive-disclosure).
4. **Start fresh sessions for new tasks.** Continuing in a long session
   carries the entire history into every subsequent turn.
5. **Avoid re-reading unchanged files.** Repeated reads of the same
   large file across a session are pure duplication.
6. **Bound autonomous loops.** An agent iterating without a cap can
   consume a large budget on a task it cannot complete (see
   agent-loop-until-exhausted).
7. **Measure cost per task, not per token.** A more expensive model
   finishing in one pass often costs less than a cheap one iterating
   five times.

## Boundaries

Cost optimisation must not compromise verification on consequential work
(see agent-human-checkpoint). Pricing and caching behaviour differ by
provider and change. The engineer's time is usually more expensive than
the tokens, which bounds how much optimisation is worth.

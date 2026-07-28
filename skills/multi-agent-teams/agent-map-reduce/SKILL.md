---
name: agent-map-reduce
description: Split a large task across parallel agents that each handle one slice, then merge their outputs deliberately. Use when the work exceeds one context window or would take too long serially.
---

# Agent map reduce

When work is too large for one pass, split it. The pattern is
straightforward and fails in specific ways: slices that overlap or leave
gaps, and a merge step that concatenates rather than reconciles.

## Method

1. **Slice along a natural boundary.** Per file, per document, per
   customer. Arbitrary chunking splits meaning across workers and
   produces findings neither can complete.
2. **Give each worker the same instructions and output shape.**
   Divergent formats make the merge a parsing problem instead of a
   reasoning one (see agent-handoff-protocol).
3. **Include the shared context each slice needs.** Enough to interpret
   its slice, without the whole corpus, which is the entire point of the
   split (see agent-context-isolation).
4. **Make the reduce step reason, not concatenate.** Deduplicate,
   reconcile contradictions, and rank. Ten appended summaries are not a
   summary.
5. **Handle disagreement between slices explicitly.** Two workers
   reaching opposite conclusions is a finding for the reducer to
   surface rather than average.
6. **Bound parallelism to what the system tolerates.** Rate limits and
   cost ceilings are real constraints, and queueing is better than
   failing halfway through.
7. **Make partial failure survivable.** One failed slice should not lose
   the run; record it, continue, and report the gap honestly rather than
   silently producing a partial answer.

## Boundaries

Map reduce handles volume; it does not help when the task needs whole
context at once, such as judging a document's overall coherence. Merged
output is only as consistent as the instructions each worker received.
Costs scale with slices, so the split should be as coarse as the work
allows.

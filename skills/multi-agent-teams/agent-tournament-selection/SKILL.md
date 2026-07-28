---
name: agent-tournament-selection
description: Generate several independent attempts, score them against explicit criteria, and select or combine the winner, instead of iterating one attempt. Use when the solution space is wide and the first approach may not be the best.
---

# Agent tournament selection

Iterating a single attempt improves that attempt and never discovers a
better approach. Generating several independent attempts and judging
them explores the space first, then concentrates effort where it is
warranted.

## Method

1. **Generate from genuinely different angles.** Different framings,
   constraints, or starting assumptions. Several runs of the same prompt
   produce variations rather than alternatives.
2. **Write the judging criteria before seeing the entries.** Criteria
   written afterwards select the entry you already liked.
3. **Judge blind where practical.** Without knowing which agent or
   approach produced which entry, so the judgement is about the work.
4. **Use independent judges for consequential picks.** Several judges
   scoring separately, with disagreement surfaced rather than averaged
   (see agent-ensemble-voting).
5. **Graft the best parts of the runners-up.** The winner is rarely best
   on every criterion, and combining beats selecting when the pieces are
   separable.
6. **Then refine the winner.** Tournament finds the approach;
   refinement polishes it. Doing them in the other order wastes the
   polish (see agent-iterative-refinement).
7. **Keep the losing entries.** They document what was tried and why it
   lost, which prevents rediscovering the same dead end.

## Boundaries

Tournaments cost the number of entries times a generation and suit
consequential, wide-open problems rather than routine work. Judging
quality bounds the whole exercise: a weak judge picks a weak winner
confidently. Where the criteria are genuinely subjective, a human should
judge.

---
name: agent-loop-until-exhausted
description: Keep running discovery rounds until several consecutive rounds find nothing new, rather than stopping at a fixed count. Use when searching for an unknown number of items such as bugs, risks, or edge cases.
---

# Loop until exhausted

Fixed-count searches stop arbitrarily: three rounds finds three rounds
worth. When the true number is unknown, the honest stopping rule is
running out of new findings, which needs deduplication against
everything seen rather than against what was kept.

## Method

1. **Define new precisely.** A stable identity for each finding, such as
   location plus claim, so the same issue phrased differently is
   recognised as a duplicate.
2. **Deduplicate against everything seen, not everything accepted.**
   Otherwise rejected findings resurface every round and the loop never
   converges.
3. **Require several consecutive dry rounds.** One empty round is noise;
   two or three in a row is evidence the seam is worked out.
4. **Vary the approach between rounds.** Repeating an identical prompt
   reproduces identical results; changing the lens or the starting
   point is what finds the remainder (see agent-ensemble-voting).
5. **Verify findings as they arrive, not at the end.** Unverified
   findings inflate the count and delay convergence (see
   agent-generate-and-verify).
6. **Cap the total regardless.** A budget ceiling prevents an unbounded
   loop when novelty keeps trickling in.
7. **Report what was covered and what was not.** Exhaustion of your
   method is not exhaustion of the problem, and saying so is the honest
   claim.

## Boundaries

Exhaustion means your approach stopped finding things, not that none
remain. Cost is unpredictable by design, so the budget cap is
mandatory. It suits discovery with discrete findings and not open-ended
generation, where there is always something more to produce.

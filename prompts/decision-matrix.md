---
name: decision-matrix
description: Build a weighted decision matrix to compare options against criteria and surface what the choice hinges on.
variables:
  - "{decision}: the decision to make"
  - "{options}: the options under consideration"
  - "{criteria}: what matters (cost, speed, risk, fit), with rough importance if you have it"
settings: "Temperature 0.3-0.5 for structured reasoning."
---

Help me decide: {decision}

Options: {options}
Criteria that matter: {criteria}

Build the analysis:
1. Confirm the criteria and assign each a weight (importance). If I gave
   weights, use them; otherwise propose weights and flag that they are yours
   to adjust: the weights are where the real judgment lives.
2. Score each option against each criterion on a simple scale (1-5 or
   low/med/high), with a one-line justification per score from evidence, not
   vibes. Present as a table.
3. Compute a weighted result and rank the options.
4. Sensitivity check: does the winner change if the weights shift a little?
   If it is close, say what the decision actually hinges on.
5. Weight reversibility: is this a reversible (decide fast, act) or
   irreversible (analyze deeply) decision? Say which.

Rules: keep scores coarse (false precision is a trap); the value is
structuring the argument, not the arithmetic. If the deciding fact is unknown
but cheaply testable, recommend testing it before choosing. End with a clear
recommendation and the main tradeoff it accepts.

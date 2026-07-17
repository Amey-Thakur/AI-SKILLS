---
name: brainstorm-divergent
description: Generate genuinely different ideas across the solution space, then converge on the strongest few.
variables:
  - "{problem}: the problem or goal to ideate on"
  - "{constraints}: hard limits ideas must respect (budget, tech, time), if any"
settings: "Temperature 0.8-1.0 for the divergent phase."
---

Brainstorm solutions to: {problem}

Hard constraints: {constraints}

Phase 1: diverge (quantity + spread):
Produce 12 ideas in one line each. Force spread by generating 3 from each
angle:
- Conventional: what the industry default would be.
- Inverted: what solving the opposite, removing the feature, or doing
  nothing would look like.
- Borrowed: how a different field (games, logistics, biology, restaurants)
  solves the same shape of problem.
- Extreme: no-budget-limit version and the one-day-hack version.

Rules for phase 1: no evaluating, no hedging, no repeating one idea in new
clothes. Wild is fine; vague is not: each idea must be concrete enough to
picture.

Phase 2: converge:
Pick the 3 strongest against the constraints. For each: why it could win
(one sentence), its biggest risk (one sentence), and the cheapest first
step to test it this week.

End with: which ONE you would test first and why.

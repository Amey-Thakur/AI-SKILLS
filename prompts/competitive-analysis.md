---
name: competitive-analysis
description: Compare competitors on what buyers actually weigh, using only public information.
variables:
  - "{competitors}: who to compare, including the do-nothing alternative"
  - "{criteria}: what your buyers actually decide on"
settings: "Temperature 0.3."
---

Analyse these competitors:

{competitors}

Buyer criteria: {criteria}

Use competitive-strategy and competitive-messaging.

Produce:
- A comparison on the stated criteria, with unknowns marked as unknown.
- Where each competitor is genuinely stronger.
- Their structural advantages and what constrains them.
- Where the gap in the market is, if there is one.
- What a competitor would rationally do in response to your move.

Rules: use only public information and say where a claim is unverified.
Concede competitor strengths plainly; a comparison where you win
everything is not credible. Include doing nothing and the incumbent
spreadsheet as alternatives. Do not speculate about their internal
finances or roadmap as if it were fact.

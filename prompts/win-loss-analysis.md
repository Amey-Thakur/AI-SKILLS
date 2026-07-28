---
name: win-loss-analysis
description: Analyse why deals were won and lost from evidence, separating stated reasons from real ones.
variables:
  - "{deals}: the deals with outcomes, stated reasons, and any notes"
  - "{context}: your product, price point, and main competitors"
settings: "Temperature 0.3."
---

Analyse these deals:

{deals}

Context: {context}

Use churn-analysis and customer-feedback-loop.

Produce:
- Loss reasons grouped by underlying cause, not by what was written down.
- Where price was cited but the real reason was value or timing.
- Patterns by segment, deal size, or source.
- What wins had in common.
- Which losses were unwinnable and should have been disqualified sooner.
- Actions ranked by how many deals each would affect.

Rules: stated loss reasons are unreliable, so treat them as one signal.
Distinguish losses from bad fit and losses from real gaps. Do not
conclude from small numbers; say when the sample is too small. Count
deals affected, not anecdotes.

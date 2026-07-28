---
name: decision-brief
description: Frame a decision with real options, the trade-offs, a recommendation, and what would change it.
variables:
  - "{decision}: what must be decided, by when, and by whom"
  - "{context}: constraints, what is known, and what is uncertain"
settings: "Temperature 0.3."
---

Prepare a decision brief for:

{decision}

Context: {context}

Use decision-matrix, agent-decision-log, and second-order-thinking.

Produce:
- The decision, stated precisely, and who owns it.
- Two or three genuine options, including doing nothing.
- Trade-offs per option, with what each gives up.
- Second-order consequences.
- The recommendation and the strongest argument against it.
- What is uncertain and how much it matters.
- What would change the decision, for later review.

Rules: options must be genuine alternatives, not one real choice and two
strawmen. Include doing nothing. State the strongest counterargument, or
the brief has not tested the recommendation. Record what would change
your mind.

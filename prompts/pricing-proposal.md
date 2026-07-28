---
name: pricing-proposal
description: Propose a pricing structure with the value, margin, and competitive cases argued, and the migration cost stated.
variables:
  - "{product}: what is being priced, its costs, and its current pricing if any"
  - "{market}: who buys, what alternatives cost them, and what they gain"
settings: "Temperature 0.3."
---

Propose pricing for:

{product}

Market context: {market}

Use saas-pricing, unit-economics, and the agent-pricing-committee method
of arguing each option from several angles.

Produce two or three concrete options, each with:
- The structure and the actual numbers.
- The value case: what the buyer gains relative to the alternative.
- The margin case: contribution and payback at that price.
- The competitive position.
- Break-even volume and sensitivity to a twenty percent volume change.
- Migration cost for existing customers.

Recommend one, and state the strongest argument against it.

Rules: never coordinate pricing with competitors, and use only public
competitor pricing. State what you assumed about willingness to pay. Note
that changing prices for existing customers has contractual and legal
constraints needing review.

---
name: agent-pricing-committee
description: Convene agents to model pricing options, argue them from customer, competitor, and margin angles, and hand a human a decision pack. Use when setting or changing prices and the discussion keeps going in circles.
---

# Agent pricing committee

Pricing decisions fail from a single perspective: the finance view
raises until churn, the sales view discounts until margin vanishes,
and the product view prices the build cost rather than the value. A
committee forces the three arguments to meet before a number is chosen.

## Team

- **Value advocate** (`customer-interviews`): argues from what the
  customer gains and what alternatives cost them.
- **Margin advocate** (`saas-metrics`): argues from unit economics,
  cost to serve, and payback.
- **Competitive analyst** (`agent-competitive-analysis-team`): places
  the option against real market alternatives.
- **Synthesiser**: writes the decision pack, including the case against
  the recommendation.

Shape: parallel advocates on a shared option set, converging into one
pack for a human decision.

## Method

1. **Define the options before the arguments.** Two or three concrete
   structures with numbers, not an open discussion. Advocates critique
   options; they do not invent new ones mid-debate (see saas-pricing).
2. **Make each advocate one-sided on purpose.** Balanced agents produce
   mush. The value advocate should genuinely push for the higher price
   and the margin advocate for the sustainable one.
3. **Quantify the sensitivity.** For each option, what happens at plus
   or minus twenty percent volume, and where does it stop working. A
   price with no break-even analysis is a guess with a decimal point.
4. **Name the migration cost explicitly.** Existing customers,
   grandfathering, contract terms, and the support load of a change are
   usually larger than the modelling suggests.
5. **State the reversal path.** How you would walk a price change back
   and what it would cost in trust, because pricing changes are far
   harder to undo than to make.
6. **Deliver one pack with a recommendation and its strongest
   objection.** A human decides. A pack that only argues one way has
   failed at its job (see devils-advocate).
7. **Set a review date with the metric to watch.** Conversion, churn,
   and average deal size after the change, checked on a stated date.

## Run it

In Claude Code, define the option set in a file, spawn the three
advocates in parallel each writing their own argument file, then run the
synthesiser over all three. The human makes the call. Port to AutoGen as
a GroupChat with fixed roles, or to CrewAI as parallel tasks feeding one
synthesis task.

## Signals it works

- Each option carries a break-even and a sensitivity range.
- The pack includes the best argument against the recommendation.
- Migration and reversal costs are stated, not discovered later.

## Boundaries

Pricing is a business decision with legal and contractual consequences
and belongs to a human. Agents must not change live prices, alter
customer contracts, or communicate changes. Price coordination with
competitors is illegal in most markets, so competitive analysis stays
strictly to public information.

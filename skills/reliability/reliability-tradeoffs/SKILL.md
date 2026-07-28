---
name: reliability-tradeoffs
description: Decide how much reliability to buy, given that each additional nine costs disproportionately more than the last. Use when reliability investment is being decided without reference to its cost.
---

# Reliability tradeoffs

Reliability is purchasable and the price rises steeply. Deciding the
level deliberately, against what unavailability actually costs, prevents
both under-investment and gold-plating.

## Method

1. **Quantify the cost of unavailability.** Revenue, contractual
   penalties, and reputational damage per hour, which is what any
   investment is weighed against.
2. **Understand the cost curve.** Each additional nine typically
   multiplies cost, so the target should follow the business need rather
   than aspiration (see service-level-objectives).
3. **Set different targets for different services.** Uniform high
   targets across everything wastes money on things nobody notices
   failing.
4. **Consider cheaper alternatives first.** Faster recovery is often
   more cost-effective than preventing failure, and users tolerate a
   short outage better than a slow product (see rollback-strategy).
5. **Include the velocity cost.** Heavy change control buys stability
   and slows delivery, which is a real cost to state (see
   error-budget-policy).
6. **Revisit as the business changes.** A target set at launch is
   usually wrong at scale in both directions.
7. **Communicate the target and its implications.** Stakeholders
   expecting perfection need to see the price of it.

## Boundaries

These trade-offs are business decisions informed by engineering rather
than engineering decisions. Regulated and safety-critical systems have
mandated levels that are not negotiable. Cost estimates for reliability
work are uncertain, which is itself part of the decision.

---
name: tax-calculation
description: Determine, apply, and record sales tax or VAT correctly by jurisdiction, product type, and customer status. Use when selling across borders or when tax handling is currently a flat assumption.
---

# Tax calculation

Tax on a sale depends on where the seller is, where the buyer is, what
is being sold, and whether the buyer is a business. A single hardcoded
rate is wrong in most cross-border cases and the exposure accumulates
silently.

## Method

1. **Establish where you have an obligation.** Physical presence,
   thresholds, and digital services rules each create liability
   independently, and thresholds are crossed without any deliberate
   decision.
2. **Classify what you sell.** Digital services, physical goods, and
   professional services are taxed differently in the same jurisdiction,
   and the classification drives the rate.
3. **Determine and evidence the customer's location.** Billing address,
   payment origin, and IP are the common signals, and some regimes
   require two non-contradictory pieces of evidence, stored.
4. **Handle business customers separately.** A valid tax identifier can
   shift the liability to the buyer in some regimes, and validating that
   identifier is part of the process rather than trusting input.
5. **Use a maintained tax engine rather than a rate table.** Rates and
   rules change constantly, and a table in your codebase is stale within
   months.
6. **Record the rate, basis, and reason on the transaction.** What was
   charged and why must be reconstructable years later for a filing or
   an audit (see invoicing-and-receipts).
7. **Decide inclusive or exclusive pricing per market.** Consumer
   expectations and law differ, and displaying an exclusive price where
   inclusive is required is a compliance problem, not a design choice.

## Boundaries

- This is not tax advice; obligations and thresholds need a qualified
  advisor in each jurisdiction.
- Calculating tax is not filing or remitting it, which are separate
  obligations with their own deadlines.
- Marketplace and platform rules may shift liability to the platform,
  which changes who calculates and remits.

---
name: saas-metrics
description: Define and read MRR, churn, NRR, CAC, and LTV correctly, with cohort views and benchmark honesty. Use when building SaaS financial dashboards or diagnosing growth quality.
---

# SaaS metrics

SaaS finance is a small set of numbers that everyone miscomputes
slightly differently. Define each once, compute from the billing
source of truth, and read them in cohorts: aggregates smooth over
exactly the problems you need to see.

## Method

1. **Build MRR from components.** New + expansion +
   reactivation - contraction - churn = net new MRR, each
   component tracked separately (the mix is the diagnosis:
   flat net-new from booming new + bleeding churn is a
   different company than steady low both): normalized to
   monthly (annual contracts / 12), excluding one-time fees
   and unpaid trials (see warehouse-modeling's
   definition-once rule; this is its revenue instance).
2. **Compute churn in both currencies, by cohort.** Logo
   churn (customers lost / customers at start) and revenue
   churn (MRR lost / MRR at start) diverge when customer
   sizes vary: small-customer churn with large-customer
   retention can be healthy; the reverse is a fire. Monthly
   cohort curves (see churn-analysis for the diagnosis
   toolkit) beat blended rates: blended churn improves
   mechanically as you grow even when every cohort is
   worsening.
3. **Make NRR the headline retention number.** Net revenue
   retention (a cohort's MRR now / its MRR a year ago,
   expansions included, new customers excluded): above 100%
   means the installed base grows itself (usage-based
   pricing and expansion tiers drive it: see saas-pricing's
   value metric). Sustained NRR is the single strongest
   signal of product-market durability; report it beside
   gross retention so expansion is not hiding churn.
4. **Compute CAC fully loaded, by channel.** Sales +
   marketing cost (salaries included) / customers acquired,
   per channel and segment: blended CAC hides that
   paid-channel CAC is 5x organic's; payback period
   (CAC / monthly gross margin per customer) is the
   cash-reality version: 12-18 months is conventional
   health for SMB SaaS, longer tolerable with strong NRR
   (see cloud-cost-optimization's unit-economics ethic:
   same discipline, different cost object).
5. **Treat LTV as an assumption-laden estimate.** Gross
   margin per customer x expected lifetime (1/churn is the
   naive version and explodes at low churn: cap horizons,
   use cohort-observed survival instead: see
   scikit-survival adjacency for the honest math);
   LTV:CAC of ~3 is folklore-standard but the inputs
   deserve more scrutiny than the ratio. Never let a
   projected LTV justify runaway spend that cash payback
   contradicts.
6. **Review the panel monthly, decisions attached.** MRR
   components, NRR/GRR, cohort curves, CAC payback by
   channel, burn multiple (net burn / net new ARR):
   trended, against targets, with an owner and an action
   per red number (see product-metrics' review ethic;
   status-updates' no-surprises for the board version).
   Benchmarks (public SaaS medians) calibrate ambition,
   but your own cohort trends decide what to fix.

## Boundaries

- Billing-system truth and analytics-event truth drift;
  revenue metrics compute from billing (see
  data-quality-checks reconciliation between them), and
  finance signs the definitions.
- These metrics assume recurring-revenue mechanics;
  marketplaces, usage-spiky infrastructure, and services
  businesses need adapted definitions, not forced fits.
- Metrics describe; they do not decide. A great dashboard
  over a product nobody loves is instrumentation on a
  sinking ship (see product-discovery).

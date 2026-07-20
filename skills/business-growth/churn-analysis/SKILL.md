---
name: churn-analysis
description: Diagnose churn through cohort decomposition, leading indicators, and exit evidence, then fix causes over symptoms. Use when retention is slipping or a churn-reduction effort needs a target.
---

# Churn analysis

Churn is a lagging aggregate of many different goodbyes. The
analysis job is decomposition: who leaves, when in their lifecycle,
from which segment, preceded by what: because each cluster has a
different cure and "reduce churn" targets none of them.

## Method

1. **Decompose by cohort and lifecycle stage.** Retention
   curves per signup cohort (see saas-metrics' cohort
   discipline): early churn (first 30-60 days) is
   activation and expectation failure (see
   user-activation, landing-page-strategy's promise);
   mid-life churn is value plateau or champion loss;
   late churn is pricing, competition, or company death
   (uncontrollable: measure it separately so it does not
   fog the fixable). The curve's *shape* is the
   diagnosis: a cliff then flat means onboarding; steady
   decay means ongoing value questions.
2. **Segment until the signal appears.** By plan, size,
   acquisition channel, use case, geography: blended
   churn hides that one segment is hemorrhaging while
   another is fine (see saas-metrics' blending warning);
   high churn concentrated in one channel's signups is
   an acquisition-quality finding, not a product one
   (see user-activation's boundary).
3. **Find the leading indicators.** Usage decline
   (sessions, core actions trending down over weeks),
   champion departure (the admin who set it up left:
   detectable via login patterns), support-ticket
   sentiment, failed payments (involuntary churn:
   see step 6): validate candidates against historical
   churners (did the signal actually precede?) and wire
   the confirmed ones into a health score with an
   intervention owner (see drift-monitoring: the same
   early-warning architecture, aimed at accounts).
4. **Collect exit evidence, graded.** Cancellation-flow
   surveys (short, one required question: "what is the
   main reason?") for breadth; exit interviews with a
   sample of churned accounts for depth (see
   customer-interviews: past-behavior questions:
   "what happened in the weeks before you decided?");
   weight stated reasons against observed behavior:
   "too expensive" often decodes as "not valuable
   enough at that price" (see saas-pricing's
   willingness-to-pay).
5. **Intervene by cluster, test honestly.** Activation
   cliff: fix onboarding (see user-activation).
   Value plateau: expansion paths and habit features.
   Champion risk: multi-user entrenchment (invites,
   integrations: the switching-cost builders).
   Involuntary: dunning flows, card-updater services,
   grace periods (the cheapest churn fix in most
   businesses: fix it first). Each intervention as an
   experiment with a cohort and a retention metric
   (see ab-test-design; retention experiments need
   patience: effects surface in months).
6. **Read win-back honestly.** Churned users who return
   are informative (what changed?), but win-back
   campaigns have low yields and annoyance costs;
   spend the marginal effort on the leading-indicator
   saves upstream, where the account still has the
   habit (see user-activation's rescue timing: the
   same logic, later in life).

## Boundaries

- Zero churn is not the target; unprofitable-to-serve
  and wrong-fit customers leaving is healthy (see
  saas-pricing's segmentation), and retention tactics
  that trap users (cancellation mazes) convert churn
  into reputational damage plus regulatory attention.
- Churn analysis describes; the fixes live in product,
  pricing, and acquisition: if the analysis never
  changes those roadmaps, it is reporting, not
  analysis (see product-metrics' decide-or-retire
  rule).
- Contract-cycle businesses (annual B2B) see churn in
  renewal windows, not monthly curves; adapt the time
  axis and build the renewal playbook accordingly.

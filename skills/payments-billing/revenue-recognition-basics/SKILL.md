---
name: revenue-recognition-basics
description: Understand why cash collected is not revenue earned, and record deferred revenue so financial reporting reflects delivery. Use when building billing data models or reporting on a subscription business.
---

# Revenue recognition basics

Collecting a year of subscription up front does not earn a year of
revenue on that day. Recognition spreads it across the period of
delivery, which is why cash and revenue diverge and why a billing
database that only stores payments cannot answer financial questions.

## Method

1. **Separate billing events from earning periods.** An invoice creates
   cash and a liability, and revenue is recognised as the service is
   delivered over time (see invoicing-and-receipts).
2. **Model deferred revenue explicitly.** Unearned amounts are an
   obligation on the balance sheet until delivered, and a data model
   without them cannot produce correct statements.
3. **Keep the contract terms, not just the charge.** Term length, start
   date, and what was promised determine the schedule, and reconstructing
   them from payments is unreliable.
4. **Handle changes mid-term as their own events.** Upgrades, refunds,
   and cancellations each change the remaining schedule rather than
   rewriting history (see subscription-billing).
5. **Distinguish one-time from recurring components.** Setup fees,
   usage, and subscription each recognise differently, so a single
   amount column is insufficient.
6. **Give finance queryable data, not a report.** Schedules by contract
   and period let them apply their own policy rather than trusting an
   engineering summary (see agent-finance-desk).

## Boundaries

- This is a data modelling orientation, not accounting advice;
  recognition policy is set by qualified accountants under the
  applicable standard.
- Standards differ by jurisdiction and by whether you report under one
  regime or another.
- Metrics like recurring revenue are business measures and are not the
  same as recognised revenue (see saas-metrics).

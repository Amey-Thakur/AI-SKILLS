---
name: integration-monitoring
description: Observe external dependencies so their degradation is visible before users report it and attributable when it happens. Use when your service depends on APIs you do not control.
---

# Integration monitoring

When a third party degrades, your service degrades and your dashboards
show your own errors. Monitoring integrations separately is what turns
an hour of confused investigation into an immediate attribution.

## Method

1. **Measure each dependency separately.** Latency, error rate, and
   timeout rate per integration, so a problem is attributable at a
   glance (see observability).
2. **Alert on their error rate, not only on yours.** A rising provider
   error rate is your early warning before it becomes user-visible.
3. **Track quota consumption.** Approaching a limit is a predictable
   incident that monitoring can prevent (see rate-limit-handling).
4. **Watch latency percentiles, not averages.** A provider degrading at
   the tail affects a subset of users invisibly in the mean.
5. **Monitor webhook delivery gaps.** Absence of events looks identical
   to quiet, so expected-rate alerts catch silent failures (see
   webhook-consumption).
6. **Subscribe to their status page and changelog.** Their incident
   communication is a signal your monitoring cannot produce.
7. **Log correlation identifiers from both sides.** Their request id
   stored with yours is what makes a support conversation productive.

## Boundaries

Monitoring detects and does not prevent, so it pairs with resilience
(see integration-resilience). You cannot see inside a provider, only
their responses to you. Status pages are often updated after customers
notice.

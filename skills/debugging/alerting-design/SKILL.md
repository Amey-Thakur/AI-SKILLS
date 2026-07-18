---
name: alerting-design
description: Design alerts that fire on the symptoms users feel, using error-budget burn rate, a page-worthiness test, and a runbook link on every rule. Use when writing or pruning alerts and you want the pager to mean something instead of crying wolf.
---

# Alerting design

Every alert is a promise to wake a human. Break it with noise and the next real
page gets swiped away half-conscious. Most alerting hurts because it watches
causes, CPU is high, disk is filling, rather than symptoms, checkouts are
failing, so it screams when nothing is wrong and sits silent when it is.

## Method

1. **Fire on the symptom the user feels.** Page on "error rate on /checkout
   over budget" or "p99 latency past 2s", not "CPU at 90%". A hot CPU with
   happy users is not an incident. If no user is harmed, it is a dashboard
   line, not a page.
2. **Spend an error budget with burn rate.** Set the objective (99.9% success
   over 30 days), then alert when the budget burns too fast. A 14.4x burn over
   one hour pages now; a 3x burn over six hours files a ticket. Rate of loss,
   not a raw threshold, pulls the trigger.
3. **Confirm across two windows to kill flapping.** Fire only when a short
   window (5m) and a long window (1h) both breach. The short window makes it
   fast, the long window makes it real. A single-window rule pages on every
   transient blip and teaches people to ignore it.
4. **Split page from ticket with one question.** Ask whether this needs a human
   awake in the next five minutes. Yes routes to the pager; can-wait routes to
   a ticket or Slack; neither should not exist as an alert at all.
5. **Link a runbook from every paging rule.** The annotation carries a URL: how
   to confirm the problem, the first mitigation, who owns it. Treat
   `runbook_url` as mandatory; a page with no runbook is a riddle handed to
   whoever is least ready to solve it.
6. **Set severity from impact, not from the metric.** A payment outage and a
   stale cache must not share a channel. Map SEV1 to the pager and an incident
   bridge, SEV3 to a ticket queue, so response effort tracks real damage.

## Checks

- If you deleted this alert, would a user-visible failure still get caught some
  other way? If yes, delete it.
- Does every paging rule link a runbook a half-awake responder can follow?
- The last time it fired, was a real user affected, or was it noise?

## Boundaries

Good alerts ride on good signals: if latency and error metrics are missing, fix
metrics-instrumentation first. What counts as "bad" is a product SLO call, not
an engineering default. What the paged human opens next is dashboard-design and
log-analysis territory.

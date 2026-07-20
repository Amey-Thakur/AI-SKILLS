---
name: infrastructure-monitoring
description: Monitor systems with the golden signals and USE method, alerts that page only on user impact, and runbook-linked responses. Use when instrumenting infrastructure or fixing alert fatigue.
---

# Infrastructure monitoring

Monitoring exists to answer two questions fast: is the user affected,
and where is the problem. Instrument for those, alert only on the
first, and every page carries a link to what to do next: anything
else is dashboards nobody reads and alarms everybody mutes.

## Method

1. **Instrument the golden signals per service.** Latency
   (distributions, not averages: p50/p95/p99), traffic
   (request rate), errors (rate and type), saturation (how
   full the constrained resource is): these four catch most
   user-facing problems and localize them (see
   observability, distributed-tracing for the request-level
   layer). Complement with the USE method for resources
   (Utilization, Saturation, Errors per CPU/disk/network:
   the systems-profiling view at fleet scale).
2. **Separate metrics, logs, and traces by job.** Metrics
   for trends and alerting (cheap, aggregatable); logs for
   detail and forensics (structured: see structured-logging,
   log-analysis); traces for request flow across services
   (see distributed-tracing): correlated by shared IDs so
   an alert links to the traces links to the logs. Three
   pillars, one correlation key.
3. **Alert only on symptoms users feel.** Page on: SLO
   breach (error rate, latency past target), not on every
   CPU spike or single-host blip (see alerting-design's
   discipline). Cause-based alerts (disk 80% full) are
   tickets or auto-remediation, not pages; a pager that
   fires on non-impacting conditions trains responders to
   ignore it, and the real one arrives muted.
4. **Set thresholds from SLOs and error budgets.** Define
   the service level objective (99.9% of requests under
   300ms), derive the alerting from budget burn rate
   (fast burn pages, slow burn tickets: see
   error-budget-policy), and review against actual
   variance and seasonality (weekends are not incidents).
   Static thresholds copied from a blog rot into noise.
5. **Link every alert to a runbook.** The page includes:
   what broke, the dashboard, and the first diagnostic
   steps (see runbook-writing); a responder woken at 3am
   should not also have to remember the architecture. This
   single practice cuts mean-time-to-resolve more than any
   dashboard redesign.
6. **Dashboard for the question, not the metric dump.**
   One overview per service answering "is it healthy"
   (the golden signals), drill-downs for diagnosis;
   deployment and config-change markers overlaid so "what
   changed" is visible (most incidents are a recent
   change: see rollback-strategy); reviewed in operations
   forums with actions attached (see dashboard-design,
   product-metrics' decide-don't-decorate rule).

## Boundaries

- Monitoring is knowns-focused; unknown-unknowns need
  observability's ad-hoc query power (high-cardinality
  traces and logs you can slice by any dimension after
  the fact: see observability).
- Alert coverage has diminishing returns and a fatigue
  cost; fewer, higher-quality pages beat exhaustive ones
  (see alerting-design). Prune alerts that never actioned.
- Business-metric monitoring (conversion, revenue: see
  product-metrics) is a related but separate system with
  different owners; infra-green while business-red is a
  real and dangerous state to design for.

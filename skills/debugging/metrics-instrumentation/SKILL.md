---
name: metrics-instrumentation
description: Instrument code with counters, gauges, and histograms picked to answer a specific operational question. Use when you need to watch a system's behavior over time and want the right instrument instead of a wall of unreadable numbers.
---

# Metrics instrumentation

A metric added without a question becomes a series nobody reads and nobody
dares delete. The instrument you choose fixes what you can ask months later: a
counter answers how often, a gauge answers how many right now, a histogram
answers how slow for the unlucky. Pick the type to fit the question, or the
data will not hold the answer when you finally need it.

## Method

1. **State the question before you emit anything.** "What share of checkouts
   fail?" calls for two counters, attempts and failures. "Is the queue backing
   up?" calls for a gauge. No question means no basis to choose the instrument,
   and you ship noise.
2. **Counter for values that only climb.** Requests served, errors raised,
   bytes sent: `http_requests_total{status,route}`. Counters survive restarts
   because `rate()` reads the slope, not the level. Never reset one by hand;
   expose the raw total and let the query take the delta.
3. **Gauge for values that move both ways.** Queue depth, in-flight requests,
   free pool slots: `db_pool_in_use`. A gauge is a snapshot, so scrape it often
   enough that a spike between samples does not disappear unrecorded.
4. **Histogram for latency and size, never a mean.** An average of 200ms hides
   the p99 of 4s that is paging you. Emit `http_request_duration_seconds` with
   buckets straddling the SLO (0.1, 0.3, 1, 3) so `histogram_quantile(0.99,
   ...)` is answerable after the fact.
5. **Bound label cardinality on purpose.** `user_id`, `email`, or a raw URL as
   a label explodes the series count and melts the time-series database. Label
   on route templates and status classes: `route="/orders/:id"`, not
   `/orders/8f3a`. Budget hundreds of series per metric, not millions.
6. **Name and unit by convention.** Suffix the unit and `_total`: `queue_depth`,
   `request_duration_seconds`, `bytes_written_total`. A reader half a year later
   infers the meaning from the name, and dashboards group related series with no
   lookup table.

## Litmus tests

- Does each metric trace back to a written question a real person asks?
- Could any label value be unbounded, and if so did you drop or bucket it?
- For every latency metric, can you compute a p99 rather than only a mean?

## Boundaries

Metrics say a rate or a distribution shifted; they cannot name the request that
shifted it. When a line spikes and you need the specific culprit, pivot to a
trace or the logs. Deciding what to page on from these numbers is
alerting-design's job, not this one.

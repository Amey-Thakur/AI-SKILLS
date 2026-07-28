---
name: dashboard-building
description: Build dashboards that answer specific questions at a glance, rather than displaying every available metric. Use when a team needs shared visibility into an ongoing situation.
---

# Dashboard building

Dashboards fail by including everything measurable. A wall of charts
communicates nothing because nobody knows which number matters, and the
ones people check daily are always small and focused.

## Method

1. **Start from the decisions it supports.** What action does a viewer
   take based on this, since a metric that changes nothing is
   decoration (see dashboard-design).
2. **Lead with the few numbers that matter.** Three to five headline
   figures at the top, detail below for those who need it.
3. **Show change, not just level.** A number without a comparison to
   last period or to target carries almost no information.
4. **Order by importance, not by data source.** The layout should follow
   what people look at first rather than how the data was assembled.
5. **Choose chart types by the question.** Trends over time as lines,
   comparisons as bars, and pie charts almost never (see
   data-visualization).
6. **Make the time range and filters obvious.** Misreading a dashboard
   because of an unnoticed filter is common and consequential.
7. **Retire panels nobody looks at.** Dashboards accumulate, and a
   periodic cull is what keeps the remainder meaningful.

## Boundaries

Dashboards show state and do not explain causes, which needs
investigation (see search-analytics). Real-time refresh is rarely
necessary and adds load. A dashboard is not monitoring: alerting on
conditions belongs elsewhere (see alerting-design).

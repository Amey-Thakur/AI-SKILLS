---
name: data-lineage
description: Capture table and column-level lineage to answer impact and provenance questions before changes and during incidents. Use when planning schema changes, debugging bad numbers, or building data-platform trust.
---

# Data lineage

Lineage answers two questions under pressure: "if I change this, what
breaks?" (impact) and "this number is wrong, where did it come from?"
(provenance). Capture it automatically or it will not exist when asked.

## Method

1. **Capture from code, not documentation.** Parse lineage from the
   SQL and pipeline definitions themselves (dbt manifest, warehouse
   query logs, OpenLineage events from orchestrators): generated
   lineage stays current by construction. Hand-drawn diagrams are
   wrong within a month and dangerous within two.
2. **Get table-level everywhere, column-level where it pays.**
   Table-level answers most impact questions cheaply. Column-level
   matters on the money paths: PII propagation (see pii-handling),
   metric definitions (which columns feed "revenue"), and breaking-
   change analysis for schema-evolution. Full column lineage on
   everything is expensive to maintain; target it.
3. **Extend to the edges.** Lineage that stops at the warehouse
   boundary misses the point of origin (producing services, CDC
   streams; see change-data-capture) and the point of impact
   (dashboards, ML features, reverse-ETL to CRMs). The consumer edge
   is what turns "table X is late" into "these 3 dashboards and this
   model are stale" (see data-quality-checks alert context).
4. **Wire it into the change workflow.** Before merging a model or
   schema change, CI posts the downstream impact list (direct and
   transitive consumers) on the PR; notify affected owners for
   anything breaking (see schema-evolution). Impact analysis at
   review time is lineage earning its keep; a graph nobody consults
   is a screensaver.
5. **Use it in incident triage, both directions.** Bad number:
   walk upstream to find the first anomalous node (pair with quality
   check results to bisect fast). Bad source partition: walk
   downstream to scope the blast radius, invalidate/rebuild affected
   tables in dependency order (see data-pipeline-design backfills),
   and notify consumers proactively.
6. **Attach governance metadata to the graph.** Ownership, data
   classification (PII/confidential), retention class (see
   data-retention) travel with lineage: "where does PII flow" and
   "what feeds the regulator's report" become queries instead of
   quarterly archaeology projects.

## Boundaries

- Lineage shows structure, not correctness: a fully-lineaged wrong
  transformation is still wrong (see data-quality-checks and
  warehouse-modeling for the semantics).
- Runtime dynamic SQL, notebooks, and spreadsheet exports escape
  automated capture; either bring those flows into managed tooling or
  accept documented blind spots.
- Buying a catalog does not create lineage culture; the integrations
  into CI and incident runbooks are where the value lives.

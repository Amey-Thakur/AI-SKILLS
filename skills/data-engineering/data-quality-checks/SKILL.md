---
name: data-quality-checks
description: Layer freshness, volume, schema, and distribution checks with quarantine and alert discipline. Use when adding quality gates to pipelines or when consumers keep finding bad data first.
---

# Data quality checks

The goal is that pipelines find bad data before consumers do. Checks
are cheap; the design work is choosing severities and keeping alerts
scarce enough to stay believed.

## Method

1. **Cover the four layers on every important table.** Freshness
   (partition/last-load age vs SLA), volume (row count vs recent
   history, within tolerance bands), schema (columns, types, and
   accepted enum values; see schema-evolution for the contract side),
   and distribution (null rates, duplicate-key rates, value ranges,
   category shares vs baseline). Most incidents announce themselves
   in one of the four before any human notices.
2. **Attach severity and action to each check.** Blocking: violation
   fails the run and stops publication (nulls in a join key,
   duplicate primary keys, schema break). Warning: publish but
   notify (volume 20% off baseline). A check without a decided
   action is a dashboard nobody reads.
3. **Gate at boundaries, quarantine at ingestion.** Validate at
   landing (reject/quarantine malformed rows to a side table with
   error reason, load the rest), and again between transform and
   publish (see data-pipeline-design step 6). Row-level quarantine
   keeps one bad producer from blocking the whole batch, and gives
   producers a concrete list to fix.
4. **Baseline dynamically, alert on deviation.** Fixed thresholds rot
   with growth; compare against trailing same-day-of-week windows
   with seasonal awareness. Start warn-only for two weeks to
   calibrate tolerances, then promote stable checks to blocking:
   tuning in production with real variance beats guessing.
5. **Route alerts to owners with context.** Each table has an owner
   (see data-pipeline-design boundaries); the alert carries table,
   check, observed vs expected, affected partitions, and the lineage
   link to likely upstream causes (see data-lineage). An alert
   channel everyone mutes is worse than no checks: prune or fix any
   check that fires weekly without action.
6. **Publish quality as a contract.** Freshness and quality status
   visible to consumers (a status page or catalog badge), incidents
   communicated like outages: consumers who learn quality from your
   status page instead of their dashboards keep trusting the
   platform.

## Boundaries

- Checks catch anomalies, not wrongness that looks normal; semantic
  correctness (is revenue *defined* right) is modeling and review
  territory (see warehouse-modeling).
- 100% coverage is alert bankruptcy; instrument the tables consumers
  depend on, in proportion to blast radius.
- Do not silently "fix" bad data in-pipeline (imputation, dedup
  without provenance); repairs are transformations with owners,
  tests, and documentation, or they are corruption with good
  intentions.

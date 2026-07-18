---
name: agent-data-team
description: Run a data team as agents that build the pipeline, gate on quality checks, run the analysis, and independently audit every headline metric. Use when you want a number produced by a coordinated agent team rather than one agent's unverified query.
---

# Data team of agents

A number from one agent is a query you cannot see and a pipeline you cannot
re-run. Split the work the way a real data team does: a builder makes the
pipeline reproducible, a quality checker gates the output, an analyst answers the
question with the query attached, and an auditor re-derives every published
figure. The auditor is the point, because a confident dashboard on a lossy
pipeline is the default failure.

## Team

- **Builder** (`data-engineer-role`): builds the reproducible pipeline.
- **Quality checker** (`qa-engineer-role`, `database-testing`): asserts on the
  output tables.
- **Analyst** (`data-scientist-role`): answers the question from clean tables.
- **Metric auditor**: re-derives each headline number by a second path.

Shape: a sequential pipeline with a quality gate before analysis and an audit
gate before publishing.

## Method

1. **Builder writes an idempotent pipeline, not a one-off script.** Extract,
   transform, load with an explicit schema, partition keys, and re-runnable steps
   (dbt models or an Airflow DAG). It hands off a materialized table plus
   `schema.sql`, not a notebook.
2. **Quality checker gates on assertions, not eyeballing.** Row counts against
   source, null rates on required columns, primary-key uniqueness, referential
   integrity, freshness within SLA, and range checks. Output `dq-report.md`; a
   failed check blocks analysis.
3. **Tie a control total to the system of record.** Reconcile revenue or active
   users to the trusted source within a stated tolerance, for example 0.5%. A
   pipeline that drops 3% of rows silently must fail here.
4. **Analyst answers, and records the query for each number.** `analysis.md`
   pairs every stat with the exact SQL and the grain (per user, per day). No
   number ships without a reproducible query.
5. **Guard the metric traps.** Define the denominator, handle time zones and
   partial periods, separate event count from entity count, and state the dedup
   rule. Most wrong dashboards are a denominator or a double-count.
6. **Auditor re-derives headline numbers independently.** It recomputes each
   top-line figure from raw source by a different path and signs
   `metric-audit.md` only when the two agree within tolerance. It never saw the
   analyst's queries.
7. **Ship against written gates.** Release when `dq-report.md` has no failing
   check, every published number has a query, and the auditor's re-derivation
   matches.

## Run it

In Claude Code, run builder, checker, analyst, and auditor as sequential
subagents over a shared warehouse connection and directory; the orchestrator
reads `dq-report.md` and blocks the analyst subagent if any check failed, and
keeps the auditor a separate subagent that never sees the analyst's queries. Port
it to CrewAI as a sequential process with the checker as a gating task, to
AutoGen as agents where the checker's tool result halts the chain, or to
LangGraph as a linear graph with conditional edges on the quality and audit gates.

## Signals it works

- Every number in `analysis.md` has a query beside it that reproduces it.
- The quality gate has actually failed a run and blocked it, not only passed.
- The auditor's independent total matches the analyst's within tolerance.

## Boundaries

This runs the build-check-analyze loop; it does not choose which metric matters
or own data governance, which the business and a data steward decide. Agents
cannot validate against ground truth they cannot query, and a green quality
report on biased source data is still biased. Warehouse conventions, SLAs, and
tolerance thresholds are yours to set.

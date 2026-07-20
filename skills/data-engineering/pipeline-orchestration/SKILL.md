---
name: pipeline-orchestration
description: Orchestrate data DAGs with data-aware scheduling, bounded retries, and SLAs that page the right owner. Use when structuring workflows in an orchestrator or fixing 3am cron archaeology.
---

# Pipeline orchestration

The orchestrator's job is to run the right tasks after their inputs
exist, retry the transient, page on the real, and show a human where
things stand. Configuration beyond that is usually complexity debt.

## Method

1. **Schedule on data readiness, not wall clock.** Downstream starts
   when upstream's output partition is complete (dataset/asset
   triggers, success markers, or sensors with timeouts), not at
   "03:00 and hope". Clock-scheduled chains break every time an
   upstream runs long, and the failure lands two teams downstream
   (see data-pipeline-design).
2. **Keep tasks coarse and idempotent.** One task = one rerunnable
   unit (build a partition, load a table): reruns are then safe by
   construction. A DAG of 500 micro-tasks turns the orchestrator into
   your program and its UI into your debugger; put fine-grained logic
   in the job's code, not the DAG.
3. **Separate orchestration from execution.** The orchestrator
   dispatches; heavy compute runs on the warehouse, Spark, or k8s
   jobs (see kubernetes-workloads). Workers doing the actual
   transformation on the scheduler's boxes is how one backfill takes
   down every pipeline's control plane.
4. **Configure failure behavior per task class.** Transient
   (timeouts, throttling): 2-3 retries, exponential backoff (see
   timeouts-and-retries). Logic/data errors: no retry, fail loudly
   with the quality-check context (see data-quality-checks).
   Everything gets an execution timeout; a hung task holding the DAG
   open beats no deadline only in the postmortem.
5. **Express SLAs and route the pages.** Per-deliverable freshness
   SLA (marts ready by 07:00) monitored as lateness alerts to the
   owning team, not a shared channel of ignorable noise. Alert on:
   SLA misses, final failures, and sensors timing out; never on
   retries succeeding.
6. **Version DAGs as code with tests.** DAG definitions in the repo,
   reviewed, with CI validating imports, dependencies, and a
   dry-parse (see docs-as-code spirit); parameters over copy-pasted
   near-identical DAGs. Backfill/rerun procedures are runbook'd per
   pipeline (see cloud-migration's rehearsal ethic, applied small).
7. **Stay portable at the edges.** Keep business logic in
   engine-agnostic code/SQL called by thin operators; orchestrator
   lock-in is real but only bites when logic migrates into
   plugin-specific operators everywhere.

## Boundaries

- Sub-minute or continuous flows are streaming jobs supervised by
  their own runtime (see batch-vs-streaming); orchestrators are for
  discrete runs.
- Service-to-service workflows with user-facing latency are
  application sagas (see saga-pattern), not data orchestration.
- The orchestrator shows task state, not data quality; green DAGs
  publish bad data happily without the gates from
  data-quality-checks.

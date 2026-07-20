---
name: etl-vs-elt
description: Place transformations before or after loading based on warehouse economics, governance, and reuse. Use when architecting a data platform or deciding where a transformation should live.
---

# ETL vs ELT

The question is where transformation runs: in a pipeline engine before
loading (ETL) or inside the warehouse after loading raw (ELT). Modern
warehouse economics usually favor ELT; the exceptions are worth knowing
precisely.

## Method

1. **Default to ELT on a modern warehouse.** Columnar warehouses
   transform SQL at scale cheaper than bespoke pipeline compute, raw
   data landing first preserves replayability (see
   data-pipeline-design), and transformations-as-SQL are versionable,
   testable, and readable by analysts, not just engineers. The dbt
   pattern: raw, staging views (rename/cast/clean), marts
   (business logic), each layer materialized deliberately.
2. **Keep the T before load only where it must be.** PII
   redaction/tokenization that must not land raw for compliance (see
   pii-handling), heavy unstructured parsing (images, PDFs, logs to
   structured) that SQL cannot express, real-time enrichment on
   streams (see batch-vs-streaming), and volume reduction when moving
   everything is cost-prohibitive (IoT firehoses aggregated at the
   edge).
3. **Structure the ELT layers with contracts.** Staging models are
   1:1 with sources, thin and boring; marts join and aggregate;
   consumers read marts only. Raw and staging are implementation
   details free to change; marts are the API with schema-evolution
   discipline. Analysts querying raw tables directly is how every
   refactor becomes a breaking change.
4. **Materialize by cost and freshness.** Views for cheap/rarely-read,
   tables for heavy/hot, incremental models for large fact tables
   (see incremental-processing). Rebuild-everything-nightly is fine
   until it is not; measure model build times and go incremental at
   the pain threshold, not before.
5. **Test transformations like code.** Source freshness checks,
   uniqueness/not-null/relationship tests on keys, and a few
   golden-query regression tests on the marts (see
   data-quality-checks); run in CI on pull requests against a slice.
   SQL without tests rots exactly like any other untested code.
6. **Watch the warehouse bill.** ELT shifts cost from pipeline
   infrastructure to warehouse compute: tag workloads, cap runaway
   queries, and schedule heavy builds off-peak. When a transformation
   dominates the bill, that specific model is a candidate to move to
   cheaper batch compute; move models, not the architecture.

## Boundaries

- ELT requires the warehouse to be the center of gravity; if primary
  consumers are services needing low-latency reads, that is a
  different architecture (see cqrs, data-pipeline-design), not a
  warehouse pattern.
- Landing raw data means storing raw data: retention, access control,
  and PII policy apply from day one (see data-retention), not after
  the first audit.
- The choice is per-flow, not per-company; healthy platforms run ELT
  for analytics and targeted ETL where the exceptions in step 2 hold.

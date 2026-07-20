---
name: data-partitioning
description: Partition datasets by pruning-friendly keys with healthy file sizes and scheduled compaction. Use when laying out lake or warehouse tables, or fixing slow scans and small-file explosions.
---

# Data partitioning

Partitioning is physical layout serving the dominant query filter. Get
two numbers right (partition count, file size) and most scan
performance follows; get them wrong and no cluster size saves you.

## Method

1. **Partition by what queries filter on.** Almost always event date
   (daily; hourly only at very high volume), because pipelines write
   by run date (see data-pipeline-design) and queries filter by time
   ranges. A second partition column must be low-cardinality and in
   most WHERE clauses (region, tenant tier); partitioning by
   high-cardinality columns (user_id) creates millions of directories
   and kills the metadata layer.
2. **Verify pruning actually happens.** EXPLAIN the top queries:
   partition filters must appear as partition pruning, not full scans
   with post-filters. Functions wrapping the partition column
   (`date(ts) = ...` over a timestamp-partitioned table) defeat
   pruning in many engines; store and filter on the partition column
   directly (same discipline as indexing-strategy).
3. **Target 128MB-1GB files inside partitions.** Thousands of KB-sized
   files per partition drown the planner in metadata and the reader
   in open() calls: the small-file problem is the most common lake
   performance bug. Size writer parallelism to output healthy files,
   and compact where streaming or frequent micro-batches (see
   batch-vs-streaming) inevitably produce shards.
4. **Cluster within partitions for the second-order filter.** Sort or
   cluster files by the next-most-filtered column (user_id, device)
   so min/max statistics and data skipping prune inside partitions;
   modern table formats (Iceberg/Delta-class) expose this as
   clustering/ordering directives. This is where high-cardinality
   selectivity belongs, instead of the partition key.
5. **Adopt a table format that decouples layout.** Iceberg/Delta-class
   formats give hidden partitioning (queries need not know the
   scheme), safe partition evolution (change scheme for future data
   without rewriting history), ACID appends, and time travel: which
   turns partition mistakes from migration projects into
   configuration changes.
6. **Schedule maintenance as part of the pipeline.** Compaction on
   hot-write tables, snapshot/manifest cleanup with retention (see
   data-retention), and partition-size monitoring (skew report: one
   partition 100x its siblings signals a hot key; see
   sharding-partitioning for the analogous OLTP problem).

## Boundaries

- Warehouse-native tables (BigQuery/Snowflake-class) auto-manage
  micro-partitions; there your levers are clustering keys and sort
  order, not directory schemes: same principles, different knobs.
- Partitioning optimizes scans, not point lookups; single-row access
  patterns want an operational store or index, not a lake table.
- Repartitioning history is a heavyweight backfill: cost it and
  schedule it like any migration (see cloud-cost-optimization),
  which is exactly what table-format evolution helps you avoid.

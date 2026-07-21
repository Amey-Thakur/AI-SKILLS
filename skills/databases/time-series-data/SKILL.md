---
name: time-series-data
description: Store time-series data with retention downsampling, compression, out-of-order handling, and the right store choice. Use when handling metrics, events, or sensor streams that grow relentlessly by time.
---

# Time-series data

Time-series data (metrics, events, sensor readings) has a defining
shape: append-heavy, time-ordered, immense volume, and value that
decays with age. A general-purpose table handles it badly; the
techniques are all about exploiting the time dimension for storage,
retention, and query.

## Method

1. **Partition by time.** Range-partition on the timestamp
   (daily or hourly by volume: see data-partitioning): so
   queries filtering by time range prune to a few
   partitions, and old data drops by detaching a partition
   (near-instant) instead of deleting billions of rows.
   Time partitioning is the foundational move that makes
   everything else efficient.
2. **Downsample and expire by age.** Recent data at full
   resolution (per-second), older data aggregated (per-
   minute, then per-hour), oldest expired entirely: because
   nobody queries last year at second resolution. Automated
   retention policies (roll up then drop raw) keep storage
   bounded and queries fast (see data-retention's tiering,
   sensor-data-handling for the edge side). This aggregate-
   then-drop is the standard time-series lifecycle.
3. **Exploit compression.** Time-series compresses
   extremely well (timestamps are near-regular, values
   change slowly: delta and delta-of-delta encoding, plus
   columnar storage): purpose-built stores achieve 10x+
   ratios. Use the store's native compression; storing
   time-series uncompressed in a general table wastes an
   order of magnitude of disk.
4. **Handle out-of-order and late data.** Readings arrive
   late (network delays, batched device uploads: see iot-
   messaging, sensor-data-handling); the store and queries
   must accept writes into past windows and recompute
   affected rollups (see incremental-processing's late-data
   window). A design assuming strictly-increasing timestamps
   breaks on the first delayed batch.
5. **Choose the right store for the scale.** Purpose-built
   time-series databases (Timescale, InfluxDB, Prometheus-
   class) give partitioning, compression, downsampling, and
   time-oriented query functions out of the box; a
   relational table with manual partitioning works at
   modest scale. Match the store to the volume and query
   needs (see managed-vs-selfhosted): at high ingest rates,
   the specialized store's built-in mechanics beat
   hand-rolling them.
6. **Model for time-range queries and aggregation.** The
   dominant queries are "values over a time range,
   aggregated by interval and grouped by series/tag":
   design tags/dimensions for the group-bys you need (like
   warehouse-modeling's grain, for time), index the time
   plus tag columns (see indexing-strategy), and precompute
   common rollups (continuous aggregates: see materialized-
   views). Point lookups are rare; range-scan-and-aggregate
   is the workload.

## Boundaries

- Time-series stores optimize for append-heavy time-ordered
  data; they are poor for data needing updates, complex
  relations, or transactions (see transactions-isolation):
  do not force relational workloads into them or vice
  versa.
- Metrics/observability time-series (see infrastructure-
  monitoring) and business/analytics time-series overlap
  in technique but differ in tooling and retention needs;
  match the stack to the use.
- Extremely high-cardinality tag combinations blow up many
  time-series stores (each unique series is tracked);
  cardinality management is the specific scaling gotcha to
  design against.

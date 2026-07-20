---
name: warehouse-modeling
description: Model warehouse tables with explicit grain, conformed dimensions, and deliberate SCD handling. Use when designing analytics schemas or fixing double-counted metrics and unjoinable tables.
---

# Warehouse modeling

Every fact table has exactly one grain: what one row means. State it,
enforce it, and most modeling debates resolve themselves; violate it
and every metric downstream double-counts.

## Method

1. **Declare the grain first, in words.** "One row per order line per
   day" written at the top of the model. Every measure must be
   additive at that grain; a mixed-grain table (order rows and
   order-line rows together) is the root cause behind most "numbers
   don't match" tickets.
2. **Facts are events with foreign keys and measures.** Numeric,
   additive measures (amounts, quantities, durations) plus keys to
   dimensions; no free-text descriptions in facts. Keep facts append-
   friendly and thin; width belongs in dimensions.
3. **Dimensions carry the descriptive weight, conformed.** One
   `dim_customer`, one `dim_date`, shared by every fact so metrics
   slice consistently across marts. Surrogate keys (hash or sequence)
   insulate from source key reuse; natural keys stay as attributes.
4. **Choose SCD handling per attribute, honestly.** Type 1
   (overwrite) for corrections and attributes where history is noise;
   Type 2 (validity-ranged rows: effective_from/to, is_current) where
   "what was true then" matters (segment, plan, owner). Type 2
   everywhere is a join-complexity tax nobody thanks you for; Type 1
   everywhere silently rewrites history. Facts join Type 2 dimensions
   on the key valid at event time.
5. **Wide marts are fine as the last layer.** Star schema for the
   modeled core; denormalized one-big-table marts generated from it
   for specific dashboards (columnar storage makes width cheap;
   see etl-vs-elt layering). The mistake is skipping the modeled core
   and building every mart straight from raw: ten unreconcilable
   definitions of revenue.
6. **Define metrics once, centrally.** Revenue, active user, churn:
   each gets one tested definition (a metrics layer or a canonical
   model), consumed everywhere (see saas-metrics for the definitions
   themselves). Metric drift between dashboards costs more trust than
   any outage.
7. **Guard the model with tests.** Uniqueness on (grain keys),
   not-null on foreign keys, referential tests facts-to-dimensions,
   and accepted-value tests on enums (see data-quality-checks), in CI.

## Boundaries

- This models analytics; application databases normalize for write
  correctness instead (see database-normalization, schema-design).
- Real-time operational dashboards reading the warehouse inherit
  pipeline latency; sub-minute needs are a streaming problem (see
  batch-vs-streaming), not a modeling problem.
- Grain and dimensions encode business definitions; model them with
  the domain owners in the room, or remodel them next quarter.

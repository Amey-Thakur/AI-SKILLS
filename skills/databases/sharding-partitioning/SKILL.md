---
name: sharding-partitioning
description: Scale databases by partitioning and sharding with a good key, handling resharding and cross-shard queries, and knowing when to avoid it. Use when one database can no longer hold or serve the load.
---

# Sharding partitioning

Sharding splits data across multiple databases to scale beyond one
machine; it is powerful and expensive, and the shard key you choose is
a decision you will live with painfully if it is wrong. Exhaust the
cheaper options first, and if you must shard, get the key right.

## Method

1. **Exhaust vertical and read-scaling first.** A bigger
   machine, read replicas for read-heavy load (see
   scalability-planning), caching (see caching-strategy),
   and single-node table partitioning (splitting one big
   table into partitions within one database: easier, no
   cross-node queries) solve many "we need to shard"
   problems. Sharding is the last resort because it is the
   most complex; reach it only when writes or data volume
   genuinely exceed one node.
2. **Choose the shard key for even distribution and query
   locality.** The key must spread data and load evenly
   (avoid hot shards: a key like "country" concentrates the
   big country: see data-partitioning's skew warning) and
   keep related data that is queried together on the same
   shard (so common queries hit one shard, not all). These
   two goals can conflict; the key is the central design
   decision and the hardest to change later.
3. **Keep queries within a shard where possible.** A query
   that hits one shard scales; a query that must gather from
   all shards (a scatter-gather) is slow, bounded by the
   slowest shard, and gets worse as you add shards.
   Cross-shard joins, aggregations, and transactions are
   hard-to-impossible: design so the common access patterns
   stay shard-local (the nosql-modeling access-pattern-first
   discipline, at the sharding layer).
4. **Plan resharding before you need it.** Data grows and
   distribution changes; you will need to add shards and
   rebalance. Consistent hashing or a lookup/directory
   layer (mapping keys to shards indirectly) makes
   rebalancing feasible; hardcoded modulo-N sharding makes
   adding a shard require moving almost all data. Design the
   resharding mechanism into the initial architecture.
5. **Handle cross-shard operations explicitly.** Global
   uniqueness (IDs unique across shards: use UUIDs or a
   central sequence: see clock-skew for ID generation),
   cross-shard transactions (usually avoided, or handled as
   sagas: see saga-pattern), and reference data (small
   tables replicated to every shard rather than sharded).
   Each is a design decision, not a default the database
   handles for you.
6. **Prefer managed sharding where it exists.** Some
   databases and services shard transparently (distributed
   SQL, managed sharded stores); the operational burden of
   hand-rolled sharding (rebalancing, cross-shard queries,
   per-shard backups and monitoring, failure handling) is
   enormous (see managed-vs-selfhosted). If a managed
   option fits, it usually wins on total cost.

## Boundaries

- Partitioning (within one database) and sharding (across
  databases) are different in cost: single-node
  partitioning gives many performance and maintenance
  benefits without the distributed complexity, and is
  often the right stopping point (see data-partitioning).
- Sharding trades the simplicity of one database (joins,
  transactions, one place to query and back up) for scale;
  it is a distributed-systems commitment (see distributed-
  systems category) that reshapes the application, not a
  config flag.
- The shard key is expensive to change (it requires moving
  data by a new scheme); this makes the key choice a
  high-stakes upfront decision that rewards deep analysis
  of access patterns and growth.

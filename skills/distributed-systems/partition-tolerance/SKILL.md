---
name: partition-tolerance
description: Decide per operation what happens during a network partition, and design degraded modes that fail safe. Use when planning multi-node or multi-region behavior under network failure.
---

# Partition tolerance

Partitions are not optional; the network will split. The only choice CAP
leaves you is per-operation: refuse (consistent) or proceed on possibly
stale state (available). Systems fail badly when nobody made that choice
on purpose.

## Method

1. **Choose per operation, not per system.** Withdrawals and uniqueness
   checks: refuse without quorum (CP). Reads of a product page, feature
   flags, telemetry ingest: serve stale and buffer (AP). Write the
   choice into a table of operations vs partition behavior; that table
   is the design.
2. **Decide the minority's behavior.** Quorum systems stall the
   minority side (see consensus-basics): a minority-partitioned node
   serving anything must serve it labeled stale, read-only, and only
   for the AP column. Nodes that keep accepting writes on both sides of
   a split converge only via merge design (version vectors, CRDTs) or
   not at all.
3. **Prevent split brain with quorum plus fencing.** Placement so no
   failure domain holds exactly half (3 zones, odd voters); leadership
   through leases with fencing tokens (see leader-election). STONITH-
   style "shoot the old primary" beats hoping it noticed the partition.
4. **Prefer static stability.** Components keep working from last-known
   configuration when the control plane is unreachable: cached flags
   with TTLs and safe defaults, DNS answers held, workers finishing
   current jobs. A data plane that dies when the control plane blinks
   has inverted its dependency arrows.
5. **Make degraded modes explicit features.** Read-only mode, queue-
   and-apologize (accept intents, reconcile after heal, with a
   conflict story), reduced functionality banners. Fail safe by
   domain: a paywall fails closed, a fraud check may fail open with
   limits; each such default is a product decision to record.
6. **Rehearse the partition.** Inject network splits (between zones,
   between app and DB, minority isolation) in a gameday (see
   chaos-gameday): verify the CP paths refuse, the AP paths serve
   stale, timeouts fire (see timeouts-and-retries), and healing does
   not stampede or double-apply buffered writes.

## Boundaries

- Retries and failover do not remove partitions; they move you along
  the same consistency/availability tradeoff, sometimes to the wrong
  end (failover during a partition is how you get two primaries).
- Async replication means RPO > 0: choosing availability during
  partition is choosing possible data divergence to reconcile later;
  see multi-region-design for the failover arithmetic.
- Most single-region outages are partial partitions (one AZ flaky);
  designs that only consider clean splits miss the messy majority.

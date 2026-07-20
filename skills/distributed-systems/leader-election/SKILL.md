---
name: leader-election
description: Run one active node with lease-based election, split-brain prevention, and clean handoff. Use when exactly one instance must do a job (scheduler, migrator, singleton consumer) across a fleet.
---

# Leader election

"Exactly one instance runs this" is a lease renewed forever, plus the
discipline to stop instantly when renewal fails. Split brain is not an
edge case; it is the default outcome of skipping either half.

## Method

1. **Elect by lease, not by deployment.** A designated singleton pod is
   an availability hole. Every candidate runs; each tries to acquire or
   renew a lease (etcd/Consul session, Kubernetes Lease object, or a DB
   row with owner + expires_at compare-and-swapped); the holder leads.
2. **Renew early, resign fast.** Renew at TTL/3. On renewal failure or
   timeout: stop leading immediately (halt loops, cancel in-flight
   dangerous work), do not finish the batch first. The window between
   your last successful renewal and your halt is your split-brain
   exposure; keep it seconds, not minutes.
3. **Fence the resources anyway.** GC pauses and network stalls mean a
   deposed leader can act while deposed (same gap as distributed-locks).
   Carry the lease generation/token on every write the leader makes;
   receivers reject stale generations. Election chooses who should act;
   fencing enforces who may.
4. **Make leadership observable.** Export who leads, since when, and
   election count. Frequent elections mean the TTL is tight against your
   GC/network reality or the store is unhealthy; alert on churn, and on
   zero leaders (minority partition or misconfig: the job silently not
   running is the failure users find last).
5. **Hand off cleanly on shutdown.** Resign the lease (delete/release)
   during graceful-shutdown so the successor starts in seconds instead
   of waiting out the TTL. Rolling deploys otherwise add a full TTL of
   leaderless time per restart.
6. **Design followers to be warm.** Followers keep caches and
   connections ready but take no actions; promotion is flipping a flag,
   not booting a subsystem. If promotion takes minutes, the lease TTL
   protects nothing.

## Boundaries

- If the work can be partitioned (shard schedulers by key range,
  consumers by partition), partition it; leadership serializes
  everything through one node and caps throughput at its capacity.
- Leader election coordinates activity; it does not replicate state.
  A new leader reading its predecessor's half-written state needs that
  state transactional or checkpointed (see background-jobs).
- Cross-region leadership means cross-region lease latency; either
  accept it, or run per-region leaders with a partitioned domain.

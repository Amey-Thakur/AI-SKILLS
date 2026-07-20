---
name: consensus-basics
description: Understand what Raft and Paxos actually provide, quorum arithmetic, and when you need consensus at all. Use when deploying replicated coordination systems or deciding whether a problem truly requires consensus.
---

# Consensus basics

Consensus makes a cluster of unreliable machines agree on one ordered
log of decisions. It is the foundation under leader election, unique
ids, and configuration stores, and it is expensive: use it for
decisions, not for data.

## Method

1. **Know what the protocol gives you.** Raft/Paxos provide: a single
   agreed sequence of entries, surviving minority failure, with a
   leader through whom writes flow. They do not provide: performance at
   scale, multi-cluster agreement, or safety with a majority down.
2. **Do the quorum math before sizing.** N nodes tolerate
   floor((N-1)/2) failures: 3 nodes survive 1, 5 survive 2. Even counts
   add cost without tolerance (4 still survives only 1); more than 5
   voters slows every write for marginal gain. Across three zones:
   3 or 5 voters spread so no zone holds a majority.
3. **Respect the failure modes that remain.** A minority partition
   cannot elect a leader and stalls (by design; see
   partition-tolerance). Clock-independent safety means correctness
   holds, but liveness suffers under flapping networks and long GC
   pauses: leadership churns and writes stall. Watch election counts as
   a health metric.
4. **Use consensus for coordination, not data.** Store: configuration,
   membership, locks, leader leases, small critical metadata (etcd,
   ZooKeeper, Consul model). Do not store: application data, queues,
   large blobs; every byte is replicated through the leader and fsynced
   into the log.
5. **Prefer rented consensus.** Managed control planes, or building on
   an existing store's primitives (compare-and-swap, leases), beat
   embedding a Raft library, which beats implementing a paper. The
   protocols are proven; the operational surface (snapshots, membership
   change, disk behavior) is where deployments fail.
6. **Verify liveness assumptions in tests.** Kill leaders under load,
   partition the minority and the majority, pause a node with SIGSTOP
   through an election. What the docs promise and what your
   configuration delivers meet only in these drills.

## Boundaries

- If a single coordinator with failover-and-fencing suffices (one
  scheduler, one migration runner), a lease from an existing store
  (see distributed-locks, leader-election) beats running your own
  consensus cluster.
- Consensus does not order events across independent clusters or
  regions; that requires either one stretched quorum (latency) or
  application-level reconciliation.
- Byzantine failures (lying nodes) are outside Raft/Paxos scope
  entirely; that is BFT territory with different protocols and costs.

---
name: multi-region-design
description: Choose between active-passive and active-active multi-region architectures with eyes open to data, cost, and failover reality. Use when regional resilience or data residency forces the multi-region question.
---

# Multi-region design

Multi-region is a data problem wearing an infrastructure costume. Decide
how writes replicate and reconcile first; everything else (routing,
failover, cost) follows from that answer.

## Method

1. **Demand the requirement in numbers.** Region-down RTO/RPO targets,
   latency targets per user geography, and residency laws naming
   specific data classes. "The board wants multi-region" without
   numbers produces expensive theater; a single region across three
   zones already survives most real outages.
2. **Climb the ladder only as far as needed.** (a) Backups replicated
   cross-region (RTO hours-days). (b) Active-passive warm standby:
   async-replicated data, scaled-down stack, promote on failure (RTO
   minutes-hours, RPO seconds-minutes). (c) Active-active reads: one
   write region, replica reads everywhere (adds read latency wins).
   (d) Active-active writes: multi-master or partitioned writes (RTO
   ~0, and a standing engineering tax). Each rung roughly doubles
   complexity; stop early.
3. **Solve writes explicitly.** Options: single write region (simple;
   cross-region write latency for far users), partition by home region
   (each user's writes land locally; needs a partition key and a
   relocation story), true multi-master (conflict resolution by CRDT,
   version vector, or last-write-wins data loss; see
   consistency-models and clock-skew). Never let async replication
   masquerade as zero-RPO: on failover the tail is gone; measure and
   accept it or pay for synchronous/quorum writes.
4. **Route with health-checked policies and a kill switch.**
   Latency/geo DNS or anycast for steady state, low TTLs, and a manual
   override that pins all traffic to one region: automated failover on
   flapping health checks causes split-brain traffic (see
   partition-tolerance); most teams run detection-automated,
   decision-human.
5. **Keep regions independently deployable and boring-identical.**
   Same IaC modules instantiated per region (see
   infrastructure-as-code), no cross-region synchronous dependencies
   in the request path, control-plane services (auth, config) either
   regionalized or statically stable when the home region dies.
6. **Drill the failover quarterly.** Game-day a full region evacuation
   (see chaos-gameday): measure real RTO, find the single-region
   assumptions (that one cron, the token cache, the primary-only
   migration job), and re-drill until the runbook timing is believed.
   An untested standby is a diagram, not a capability.

## Boundaries

- Multi-region multiplies cost 1.7-2.5x and every operational task by
  the region count; if the honest requirement is surviving zone loss,
  spend the money on multi-AZ excellence instead.
- Residency is not resilience: keeping EU data in EU regions is a
  partitioning requirement that may add regions without adding
  failover capability.
- Stateless tiers replicate trivially; if your data layer cannot meet
  the RPO, no amount of global load balancing fixes the architecture.

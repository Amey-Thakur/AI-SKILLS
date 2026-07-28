---
name: redundancy-design
description: Add redundancy where it removes a single point of failure, understanding what each level protects against and what it costs. Use when designing for availability targets.
---

# Redundancy design

Redundancy is expensive and frequently ineffective, because duplicated
components often share a dependency that fails together. Useful
redundancy is defined by what it makes independent.

## Method

1. **Identify the failure domain you are protecting against.** Process,
   host, zone, region, or provider, since redundancy within a domain
   does not protect against that domain failing.
2. **Check for shared dependencies.** Two instances behind one
   database, one network path, or one credential fail together
   regardless of count (see failure-mode-analysis).
3. **Match the level to the objective.** Multi-region costs far more
   than multi-zone and is only justified by a target that requires it
   (see service-level-objectives).
4. **Verify failover actually works.** Standby capacity that has never
   taken traffic is an assumption (see disaster-recovery-testing).
5. **Prefer active-active where possible.** Standby paths that are never
   exercised are usually broken when needed.
6. **Account for the coordination cost.** Replication introduces
   consistency trade-offs that are a design decision rather than a
   detail (see consensus-basics).
7. **Include the operational overhead.** Redundant systems are more
   complex to operate and debug, which is part of the cost.

## Boundaries

Redundancy addresses infrastructure failure and not bugs, which
replicate perfectly to every copy. It increases cost and complexity
proportionally. Some correlated failures such as configuration errors
defeat redundancy entirely (see chaos-engineering).

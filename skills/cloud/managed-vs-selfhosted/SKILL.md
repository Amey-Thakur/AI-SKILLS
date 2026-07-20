---
name: managed-vs-selfhosted
description: Decide between managed services and self-hosting with honest TCO, lock-in assessment, and exit paths. Use when choosing infrastructure components or revisiting a costly managed dependency.
---

# Managed vs self-hosted

The sticker price comparison is always wrong in both directions:
self-hosting hides engineer-hours, managed hides egress, per-request
fees, and the price of leaving. Compare total costs including the exit.

## Method

1. **Default managed for anything stateful and boring.** Databases,
   queues, object storage, Kubernetes control planes: the undifferentiated
   heavy lifting where your custom requirements are near zero and the
   failure cost is high. Reserve self-hosting appetite for components
   where you have real differentiating requirements or crushing scale
   economics.
2. **Compute TCO with engineer-hours priced in.** Self-hosted =
   instances + storage + the fraction of engineers who patch, upgrade,
   back up, tune, and get paged for it (0.25-1.0 FTE per serious
   stateful system is realistic) + the incident cost of doing it worse
   than a provider's dedicated team. Managed = service fees + the
   traffic-shaped charges (egress, per-request, per-connection) modeled
   at 10x your current volume, because that is when renegotiating is
   hardest.
3. **Grade the lock-in by interface, not vendor.** Open-protocol
   managed services (Postgres-compatible, S3-API, Kafka-compatible,
   OpenTelemetry) are rentals you can walk from; proprietary APIs with
   gravity (bespoke query languages, integrated event buses,
   ML platforms) are marriages. Prefer the open-interface managed
   option even at a modest premium; it converts exit from a rewrite to
   a data move.
4. **Write the exit path before signing.** For each critical managed
   dependency: how does the data leave (export tooling, egress cost,
   downtime), what replaces it, and roughly how many engineer-weeks?
   If the answer is "we could not, realistically", that is a strategic
   dependency: fine, but priced and acknowledged in the decision
   record (see architecture-decision-records).
5. **Re-decide at the trigger points.** Crossovers happen: the managed
   bill passing the loaded cost of the FTEs it saves, a compliance need
   the provider cannot meet, scale where per-request pricing dwarfs
   hardware. Put the decision on a yearly review with current numbers
   (see vendor-evaluation for the assessment frame); grandfathered
   defaults are how six-figure line items hide.
6. **If self-hosting, budget the whole job.** HA topology, backups
   with tested restores (see backup-restore), upgrade cadence,
   security patching SLA, monitoring and runbooks, and a named owning
   team. Self-hosted without that budget is not cheaper; it is
   deferred-incident financing.

## Boundaries

- Control-plane outages of a provider are correlated risk you cannot
  engineer away from inside; if that is unacceptable, the answer is
  multi-provider architecture, which costs more than either option
  alone.
- Compliance sometimes decides unilaterally (data residency, audit
  requirements, air-gapped environments); check before running the
  economics.
- This is a per-component decision, not a philosophy; healthy stacks
  mix both and re-evaluate component by component.

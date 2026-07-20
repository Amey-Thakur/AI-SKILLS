---
name: cloud-networking
description: Lay out VPCs, subnets, private connectivity, and DNS so services reach each other privately and the internet only on purpose. Use when designing cloud network topology or debugging cross-service connectivity.
---

# Cloud networking

Default-deny is the design stance: nothing reaches the internet, another
VPC, or your data stores unless a rule you wrote says so. Everything
else is plumbing to make that stance livable.

## Method

1. **Plan address space before the first VPC.** Non-overlapping CIDRs
   across VPCs, regions, and the office/VPN ranges, sized with 4x
   growth headroom, recorded in one registry. Overlaps discovered at
   peering time cost re-IP projects; ten minutes of spreadsheet now
   prevents them.
2. **Tier subnets by exposure.** Public subnets hold only entry points
   (load balancers, NAT); private subnets hold compute; isolated
   subnets hold data stores with no internet path at all. Workloads
   never get public IPs; inbound flows through the LB, outbound through
   NAT (watch its processing cost; see cloud-cost-optimization).
3. **Prefer identity rules over IP rules.** Security groups referencing
   other security groups ("db-sg allows app-sg on 5432") survive
   autoscaling and re-IPs; CIDR-based rules rot. Keep NACLs at coarse
   subnet guardrails; per-flow logic lives in security groups where
   state is handled for you.
4. **Reach managed services privately.** Private endpoints/Private Link
   for object storage, queues, and third-party SaaS keep traffic off
   the public internet and let isolated subnets function; they also
   carry per-GB cost, so hubs share endpoints where volume justifies.
5. **Scale inter-VPC with a hub, not a mesh.** Two or three VPCs:
   peering is fine. Beyond that, a transit hub (transit gateway
   pattern) centralizes routing, on-prem VPN/Direct Connect attachment,
   and egress inspection; peering meshes grow O(n^2) route tables that
   nobody can audit.
6. **Treat DNS as the service map.** Private zones per environment
   (`svc.internal`), records managed by IaC alongside the services;
   split-horizon so internal names never leak to public resolvers.
   Connectivity debugging order: DNS resolution, then security group,
   then route table, then endpoint policy; flow logs answer the "is it
   even arriving" question.

## Boundaries

- This is L3/L4 topology; service-to-service authn/z and mTLS live a
  layer up (see service-mesh-tradeoffs, zero-trust-basics), and network
  segmentation does not replace them.
- Kubernetes overlays its own networking (CNI, services, ingress) on
  top of this; pod-level policy is a separate control plane (see
  kubernetes-workloads).
- Multi-region topology (failover, data locality) is driven by
  multi-region-design; do not build global network plumbing ahead of a
  decided architecture.

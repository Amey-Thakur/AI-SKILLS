---
name: kubernetes-workloads
description: Configure Kubernetes workloads with correct requests, probes, disruption budgets, and workload types. Use when deploying services to Kubernetes or debugging evictions, OOMKills, and rollout failures.
---

# Kubernetes workloads

The scheduler and the kubelet only know what you declare. Most
production pain (evictions, OOMKills, dropped requests during deploys)
is a missing or dishonest declaration.

## Method

1. **Pick the controller for the lifecycle.** Deployment for stateless
   services; StatefulSet only for stable identity/storage (databases,
   ordered clusters); DaemonSet for per-node agents; Job/CronJob for
   run-to-completion (with `backoffLimit`, `activeDeadlineSeconds`, and
   idempotent work; see background-jobs). Wrong controller choices
   surface as workarounds everywhere else.
2. **Set requests from measurement; cap memory, not CPU.** Requests are
   the scheduling contract: set them at observed p95 (see
   get-available-resources thinking: measure, then declare). Memory
   limit = request (Guaranteed-ish, avoids surprise OOM from
   overcommit); CPU limit usually omitted, since throttling a bursty
   service hurts more than sharing. OOMKilled pods mean the limit lies
   or the app leaks (see memory-leaks).
3. **Wire all three probes honestly.** Liveness = process health only;
   readiness = can serve (dependencies); startup covers slow boots so
   liveness can stay tight; full reasoning in health-checks. Probe
   mistakes convert dependency blips into restart storms.
4. **Make deploys and evictions dropless.** `preStop` sleep a few
   seconds + SIGTERM handling (see graceful-shutdown),
   `terminationGracePeriodSeconds` above request timeout;
   PodDisruptionBudget (`maxUnavailable: 1` or a floor) so node drains
   and cluster upgrades cannot take the whole service; spread across
   zones with `topologySpreadConstraints`, and 2+ replicas or the PDB
   is fiction.
5. **Autoscale on the right signal.** HPA on CPU works for CPU-bound
   services; queue-driven workers scale on queue depth/age (external
   metrics, KEDA-style); latency-critical paths scale on concurrency or
   RPS. Set sensible min (cold-start floor) and max (protects
   downstream; see backpressure), and never HPA+VPA on the same metric.
6. **Declare the security posture per pod.** `runAsNonRoot`,
   `readOnlyRootFilesystem`, drop all capabilities, no default
   ServiceAccount token unless the pod calls the API; resource-scoped
   RBAC when it does (container hardening detail in container-security).
7. **Config and secrets flow in declaratively.** ConfigMaps/Secrets
   mounted or injected, rotated by rollout (checksum annotations
   trigger it); no config fetched at boot from wikis or hand-edited in
   place (see config-management).

## Boundaries

- This covers workload manifests; cluster architecture (node pools,
  CNI, ingress controllers, upgrade cadence) is platform work with its
  own review.
- If every service copies the same 200 lines of YAML, the fix is a
  shared chart/kustomize base owned by platform, not more copying.
- Local dev parity via mini-clusters has limits; test the manifests in
  a real staging cluster before trusting probes and budgets.

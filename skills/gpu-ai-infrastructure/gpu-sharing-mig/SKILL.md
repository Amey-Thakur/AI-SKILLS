---
name: gpu-sharing-mig
description: Share one physical GPU across several small workloads using MIG, MPS, or time slicing, and pick the mode whose isolation matches the risk. Use when GPUs sit at low utilization because each job needs far less than a whole A100 or H100.
---

# GPU sharing and MIG

A single inference model or a notebook may use 10 percent of an 80GB H100 yet
hold the entire card. Three sharing mechanisms exist, and they are not
interchangeable: each trades isolation for flexibility differently, so the wrong
choice either strands the GPU or lets one tenant crash another. Know what each
one actually guarantees before you split a card.

## Method

1. **Use MIG for hard isolation between tenants.** Multi-Instance GPU partitions
   an A100 or H100 into up to seven instances, each with dedicated SMs, an L2
   slice, and its own memory (profiles like 1g.10gb or 3g.40gb). Faults and
   memory pressure stay inside a slice, and a neighbor's spike does not move your
   latency. Choose MIG when tenants do not trust each other or need a firm QoS.
2. **Size the MIG profile to the workload, not evenly.** Profiles are fixed
   geometries: a 1g.10gb slice gives one seventh of the compute and 10GB. A
   model needing 18GB OOMs on a 10GB slice and wastes 22GB on a 40GB one.
   Reconfigure the layout with `nvidia-smi mig` to match the real mix, and note
   that reconfiguration requires draining the GPU first.
3. **Use MPS for cooperative, trusted co-location.** CUDA Multi-Process Service
   lets several processes share SMs concurrently without time-slicing overhead,
   which suits many small kernels from one team's batch jobs. It gives no memory
   protection: one process's OOM or crash can take the others down. Keep it
   inside a single trust boundary.
4. **Use time slicing only for bursty, fault-tolerant work.** The Kubernetes
   device plugin can oversubscribe one GPU to several pods that round-robin the
   whole card. There is no memory isolation and no compute guarantee, so a heavy
   pod stalls the rest. Fine for dev notebooks and CI, wrong for latency-bound
   serving.
5. **Match the mechanism to the SLA.** Serving with a p99 latency target: MIG,
   so a co-tenant cannot steal SMs mid-request. Training microbatches from one
   team: MPS. Interactive dev at a 5 percent duty cycle: time slicing to pack
   many users. Do not run latency-critical inference on time slicing and then
   chase mysterious tail spikes.
6. **Expose the slices to the scheduler correctly.** Advertise MIG instances as
   distinct allocatable resources: the NVIDIA device plugin reports names like
   `nvidia.com/mig-3g.40gb`, so the scheduler places by slice, not whole GPU.
   Confirm with `nvidia-smi` that each pod landed on the instance you intended.

## Checks

- Does each tenant's mechanism match its trust level: MIG across teams, MPS within one?
- Do MIG profiles fit the models, with neither OOMs nor tens of gigabytes stranded?
- On time slicing, have you accepted that one heavy pod can stall its neighbors?
- Does the scheduler see and place individual MIG slices, not just whole cards?

## Boundaries

This covers splitting one GPU among small jobs. It does nothing for a job that
already saturates a full card, and it is orthogonal to placing whole-GPU jobs
across a cluster (gpu-cluster-scheduling). Whether sharing pays off against
buying fewer, larger cards is a cost question (gpu-cost-planning).

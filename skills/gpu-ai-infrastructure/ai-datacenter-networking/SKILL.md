---
name: ai-datacenter-networking
description: Lay out the network for distributed training so collectives run on the fastest link that spans them, using NVLink, InfiniBand, and topology-aware placement. Use when a training job spans multiple GPUs or nodes and interconnect, not compute, is capping throughput.
---

# AI datacenter networking

Training at scale is a communication problem wearing a compute costume. Every
gradient all-reduce and every activation exchange rides a link, and the fabric
has tiers that differ by more than 10x in bandwidth. Place a collective on the
wrong tier and the GPUs sit idle waiting on the wire, so the job is to match
each communication pattern to the fastest link that contains its group.

## Method

1. **Inventory the fabric tiers by bandwidth.** Inside a node, NVLink and
   NVSwitch give roughly 900 GB/s per H100 all-to-all. Between nodes, InfiniBand
   NDR runs 400 Gb/s per port, about 50 GB/s. That gap, near 18x, is why intra
   and inter-node traffic must be treated as different budgets, not one network.
2. **Bind each collective to the tier that spans its group.** Keep the
   tensor-parallel all-reduce, the chattiest collective, inside one NVLink node
   of 8 GPUs. Let data-parallel gradient all-reduce and pipeline point-to-point
   cross nodes on InfiniBand, where their lower frequency tolerates the slower link.
3. **Demand a rail-optimized topology.** In a rail design each GPU reaches the
   leaf switch through its own NIC on a fixed rail, so same-rank GPUs across
   nodes talk without crossing the spine. Confirm one NIC per GPU and rail
   alignment; a shared or misrailed NIC halves effective bandwidth under load.
4. **Turn on GPUDirect RDMA and point NCCL at the right HCAs.** Set
   `NCCL_IB_HCA` to the InfiniBand adapters, `NCCL_NET_GDR_LEVEL` to allow
   GPU-to-NIC DMA, and supply a `NCCL_TOPO_FILE` so NCCL builds rings and trees
   that follow the real wiring instead of guessing across a PCIe hop.
5. **Place ranks with a topology-aware scheduler.** Use SLURM block placement or
   the cluster's topology plugin to pack a job into adjacent nodes under one leaf
   switch. Scattering 64 ranks across a congested spine adds hops and queueing
   that no NCCL tuning recovers.
6. **Prefer in-network reduction and adaptive routing where the fabric offers
   it.** SHARP offloads all-reduce into the switch ASIC, cutting data that
   crosses the wire. Adaptive routing spreads flows so a single hot link does
   not stall a collective. Enable both when the hardware supports them.
7. **Measure busbw before you trust the layout.** Run `all_reduce_perf` from
   nccl-tests and read bus bandwidth, not raw algbw. If NVLink groups miss ~80
   percent of peak or IB groups fall well under line rate, a rank crossed the
   wrong tier and the plan is wrong on paper.

## Signals

- Do tensor-parallel groups stay within a single NVLink node in the placement?
- Does nccl-tests busbw land near peak for both the NVLink and InfiniBand groups?
- Is every GPU mapped to its own rail-aligned NIC with GPUDirect RDMA active?
- Did the scheduler pack ranks under shared leaf switches instead of the spine?

## Boundaries

This covers wiring collectives to the fabric, not choosing how to split the
model across devices, which is model-parallelism. Sizing GPUs and interconnect
before purchase is gpu-cost-planning. The optimal NCCL algorithm and tree shape
are cluster-specific and come from measurement, not a fixed recipe.

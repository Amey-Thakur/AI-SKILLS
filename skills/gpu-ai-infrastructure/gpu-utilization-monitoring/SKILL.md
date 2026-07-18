---
name: gpu-utilization-monitoring
description: Monitor a GPU fleet so you can tell a genuinely busy GPU from one reporting 100 percent utilization while computing almost nothing, and find the wasted spend. Use when GPUs look busy on the dashboard but throughput or cost per token says otherwise.
---

# GPU utilization monitoring

The number everyone quotes, `nvidia-smi` GPU utilization, only means "a kernel
was resident during the last sample." A GPU pinned at 100 percent util can be
running one tiny kernel and idling most of its SMs. To find real waste you need
occupancy and throughput metrics, not the headline gauge, and DCGM exposes them.

## Method

1. **Stop trusting GPU-Util alone.** `DCGM_FI_DEV_GPU_UTIL` is time-based: the
   fraction of samples with any active kernel. It says nothing about how many SMs
   ran. A memory-bound or launch-latency-bound loop reads 100 percent while doing
   a fraction of the FLOPs. Treat it as "not idle," never as "working hard."
2. **Measure SM activity and occupancy.** Pull `DCGM_FI_PROF_SM_ACTIVE`, the
   fraction of SMs with a resident warp, and `DCGM_FI_PROF_SM_OCCUPANCY`,
   resident warps against the maximum. SM_ACTIVE well below GPU_UTIL means the
   card is busy running work that occupies few SMs: kernels too small or the grid
   undersized.
3. **Watch the tensor cores and memory pipes.** For mixed-precision training the
   metric that matters is `DCGM_FI_PROF_PIPE_TENSOR_ACTIVE`; on an A100 or H100
   doing real matmuls it should sit around 0.4 to 0.8. Compare it with
   `DCGM_FI_PROF_DRAM_ACTIVE`: high DRAM and low tensor means memory-bound, and
   no util figure changes that.
4. **Deploy dcgm-exporter into Prometheus.** Run dcgm-exporter as a DaemonSet,
   scrape into Prometheus, and dashboard in Grafana per GPU, per node, and per
   job. Tag each metric with the job or pod so idle GPUs have an owner. Alert
   when a GPU is allocated but SM_ACTIVE stays near zero for more than 10
   minutes: that is paid-for silicon doing nothing.
5. **Hunt the specific waste patterns.** Allocated-but-idle, claimed with
   SM_ACTIVE near zero, means reclaim or right-size. High util with low
   tensor-active is a kernel or batch-size problem, not a capacity one. Power
   draw far under TDP (`DCGM_FI_DEV_POWER_USAGE`) confirms a coasting card, and
   step-time spread across ranks points at a straggler.
6. **Correlate metrics with application throughput.** Tie the GPU counters to
   tokens per second or samples per second and to watts. The real target is
   throughput per GPU and per watt, not any single gauge. A change that lifts
   tensor-active and throughput together is a win; one that only moves GPU-Util
   is noise.

## Signals

- For a training job, is `PIPE_TENSOR_ACTIVE` high, or is GPU-Util masking near-idle tensor cores?
- Can you list GPUs allocated to a job but sitting at SM_ACTIVE near zero right now?
- Does power draw track the workload, or are cards coasting far below TDP while marked busy?
- Is every GPU metric tagged to an owner, so each pool of waste has a name?

## Boundaries

This tells you a GPU is underused and roughly why; it does not fix the kernel
(see cuda-kernel-basics) or the input pipeline. Fleet right-sizing and
break-even math belong to cost planning (gpu-cost-planning), and reclaiming idle
allocations is enforced by the scheduler (gpu-cluster-scheduling).

---
name: gpu-cluster-scheduling
description: Schedule GPU jobs on a shared cluster so distributed jobs get all their GPUs at once, fragmentation stays low, and preemption is predictable. Use when several teams share a GPU pool and jobs sit pending while GPUs sit idle.
---

# GPU cluster scheduling

A GPU cluster's worst enemy is the half-placed job: a 64-GPU run that got 60
GPUs and waits, holding them idle, while a single-GPU notebook grabs the last
card it needed. Default Kubernetes scheduling makes this worse by placing pods
one at a time. Good GPU scheduling is mostly about placing whole jobs and
reclaiming space when they leave.

## Method

1. **Gang-schedule distributed jobs.** Use a scheduler that does all-or-nothing
   placement: Volcano, Kueue, or Slurm with exclusive nodes. A multi-node job
   must get every rank at once or none, because partial placement wastes the
   GPUs it holds and can deadlock two jobs that each hold half of what the other
   needs.
2. **Bin-pack to fight fragmentation.** Prefer filling a partly-used node over
   spreading across many. Free GPUs scattered as one or two per host across eight
   nodes cannot run an 8-GPU job even though the count exists. Set the scheduler
   to a binpack or MostAllocated policy, and drain-and-defragment when a large
   job queues behind scattered capacity.
3. **Respect topology for tightly coupled jobs.** Place all ranks of a
   tensor-parallel job inside one NVLink or NVSwitch domain, and multi-node jobs
   on the same leaf switch or rail. Label nodes by NVLink group and place
   accordingly so an all-reduce does not cross a slow hop; topology-blind
   placement can halve throughput.
4. **Set an explicit priority and preemption policy.** Define tiers, such as
   production above batch above best-effort, with PriorityClasses. Higher tiers
   preempt lower ones, but only after a grace window: send SIGTERM, then SIGKILL
   roughly 120 seconds later, so the victim can checkpoint. Publish which tier
   can evict which so users are not surprised.
5. **Enforce quotas and backfill the holes.** Give each team a guaranteed quota
   plus a burst ceiling so one team cannot starve the pool. Enable backfill: let
   short, small jobs run in the gaps while a large job accumulates its
   reservation, as long as they finish before the reservation is ready.
6. **Cap queue time with reservations.** For a large gang that keeps losing the
   race, create a time-based reservation that drains nodes toward it, so a
   128-GPU job is not starved forever by a stream of small ones. Track
   pending-time percentiles per tier to catch starvation early.

## Litmus tests

- Can a 32-GPU job either start fully or stay pending, never hold 20 GPUs idle while waiting?
- Do free GPUs cluster into runnable blocks, or scatter as unusable singletons?
- When production preempts batch, does the batch job get a SIGTERM window to checkpoint?
- Is there a per-team quota, so no single user drains the shared pool?

## Boundaries

This is about placing and preempting whole jobs on a shared pool. It assumes
jobs can checkpoint and resume when preempted (checkpointing-large-training,
fault-tolerant-training). Splitting a single GPU among small jobs is a separate
lever (gpu-sharing-mig), and the buy-versus-rent capacity decision belongs to
cost planning (gpu-cost-planning).

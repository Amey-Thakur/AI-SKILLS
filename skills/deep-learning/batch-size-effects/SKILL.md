---
name: batch-size-effects
description: Choose batch size understanding its effect on gradient noise, memory, throughput, and generalisation, and adjust the learning rate with it. Use when scaling training or running out of memory.
---

# Batch size effects

Batch size is usually chosen by what fits in memory, which hides that it
changes the optimisation problem. Larger batches give less noisy
gradients, need larger learning rates, and often generalise slightly
worse.

## Method

1. **Understand gradient noise as a feature.** Small batches produce
   noisy gradients that help escape sharp minima, which is part of why
   they can generalise better.
2. **Scale the learning rate with the batch.** Increasing batch size
   without increasing the rate slows learning, and the two must be tuned
   together (see learning-rate-schedules).
3. **Use gradient accumulation for large effective batches.** Several
   forward and backward passes before one step gives a large batch
   within a small memory budget.
4. **Find the throughput sweet spot.** Larger batches use hardware
   better up to a point, beyond which memory pressure and diminishing
   parallelism reverse the gain (see gpu-utilization-monitoring).
5. **Keep batch composition representative.** Shuffling matters, and
   batches that correlate with a label or a source introduce bias into
   every step.
6. **Watch normalisation layer interactions.** Batch-dependent
   normalisation behaves poorly at very small batch sizes, which is why
   alternatives exist.
7. **Re-tune when changing it.** Batch size interacts with learning
   rate, warmup, and regularisation, so a change invalidates previous
   tuning.

## Boundaries

Batch size is constrained by memory, which is often the binding
constraint regardless of what is optimal. Its generalisation effect is
smaller than data quality and architecture. Distributed training changes
the effective batch across workers (see distributed-training).

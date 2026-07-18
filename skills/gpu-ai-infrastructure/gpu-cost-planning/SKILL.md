---
name: gpu-cost-planning
description: Plan GPU spend by comparing owned hardware, reserved cloud, and on-demand against real utilization and lead time, so you commit at the right break-even. Use when deciding whether to buy GPUs, reserve cloud capacity, or burst on-demand for a workload.
---

# GPU cost planning

An H100 costs roughly the same to own for a year as to rent on-demand for a few
months, so the buy-versus-rent answer turns entirely on how busy the card will
actually be. Teams overspend by reserving for peak or underspend by bursting a
steady workload on on-demand rates. The decision is arithmetic once you have an
honest utilization number.

## Method

1. **Establish a true duty cycle first.** Pull weeks of fleet utilization (see
   gpu-utilization-monitoring) and compute the fraction of hours GPUs do real
   work, not merely sit allocated. A steady duty cycle above 70 percent argues
   for owning or reserving; a spiky 20 percent with idle nights argues for
   on-demand or spot. Plan on measured hours, not aspirational ones.
2. **Compute the break-even honestly.** Amortize owned hardware over a useful
   life near three years, add power, cooling, networking, and colo, then divide
   by expected busy GPU-hours to get a real dollar-per-GPU-hour. Set it against
   reserved cloud, a one-to-three-year commit at roughly 40 to 60 percent off
   on-demand, and against on-demand list. Owning usually wins only above about 60
   to 70 percent sustained utilization.
3. **Layer commitment to the demand curve.** Buy or reserve the steady baseline,
   burst the peaks on on-demand, and run interruptible work such as
   checkpointed batch training on spot at a 60 to 90 percent discount. Never
   reserve for peak: the reserved GPUs you cannot keep busy erase their own
   discount.
4. **Price in lead time and capacity queues.** New H100 or H200 capacity carries
   weeks-to-months lead time for owned hardware and can be quota-limited or
   waitlisted even in the cloud. If the roadmap needs GPUs in Q3, a cheaper owned
   option arriving in Q4 is not cheaper. Hold a reserved or on-demand bridge for
   the gap.
5. **Count total cost, not the sticker.** Add interconnect (InfiniBand or NVLink
   switches), storage, egress, the ops headcount to run a cluster, and idle-time
   overhead. Cloud folds these into the hourly rate; owned hides them. Egress and
   cross-zone traffic in particular can dwarf the compute line for data-heavy
   jobs.
6. **Revisit on a fixed cadence.** GPU prices, new silicon that can cut cost per
   token by two to three times, and your own utilization all move. Re-run the
   break-even quarterly and before any multi-year commit, and keep the commitment
   horizon shorter than the hardware stays competitive.

## Litmus tests

- Is the buy-versus-rent call backed by a measured duty cycle, not a hoped-for one?
- Does the break-even include power, cooling, networking, and ops, not just the card?
- Is the steady baseline committed and only the spiky peak left on on-demand or spot?
- Does the plan account for procurement lead time and cloud capacity quotas?

## Boundaries

This sizes and sources capacity; it does not tune the workloads that fill it or
negotiate the contract. Utilization inputs come from monitoring
(gpu-utilization-monitoring), and raising real utilization through sharing is a
separate lever (gpu-sharing-mig). Final commitments still depend on your finance
team's cost of capital and risk tolerance.

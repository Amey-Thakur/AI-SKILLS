---
name: resource-planning
description: Match people and capacity to project needs over time, accounting for partial allocation, ramp-up, and the cost of splitting attention. Use when planning who works on what across projects.
---

# Resource planning

Planning by headcount over-predicts capacity, because people are
partially allocated, take time to become productive, and lose
substantial output to context switching between projects.

## Method

1. **Plan in realistic availability, not full time.** Meetings, support,
   and interruptions consume a large share, and planning at full
   capacity guarantees the plan fails (see agent-capacity-planning).
2. **Account for ramp-up.** Someone new to a codebase is slower for
   weeks, and adding people to a late project usually makes it later.
3. **Avoid splitting people across projects.** Two half allocations
   produce well under one person's output because of switching cost.
4. **Identify the specialists everything depends on.** A single person
   on the critical path for several projects is the constraint, whatever
   the headcount says (see schedule-and-critical-path).
5. **Plan for absence.** Holiday, illness, and departure are certain in
   aggregate and should be in the plan rather than treated as
   exceptions.
6. **Sequence rather than parallelise when capacity is tight.**
   Finishing one project then starting the next delivers value sooner
   than running both slowly.
7. **Re-plan when allocation changes.** A plan built on an allocation
   that no longer holds is actively misleading.

## Boundaries

Resource planning allocates capacity; it does not create it, and
persistent overcommitment needs scope or staffing decisions. People are
not interchangeable units, and treating them as such produces plans that
fail on the specifics. Allocation decisions affect careers and morale
(see agent-people-ops-desk).

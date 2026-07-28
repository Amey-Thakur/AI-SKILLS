---
name: agent-workload-balancing
description: Redistribute work across desks and workers as load shifts, so one bottleneck does not stall the company while others idle. Use when some desks are overwhelmed and others have nothing queued.
---

# Agent workload balancing

Static allocation guarantees imbalance, because demand does not arrive
evenly. Balancing is the continuous adjustment that keeps work moving
through the system rather than pooling in front of whichever desk is
currently the constraint.

## Method

1. **Find the actual constraint.** The desk with the longest queue and
   the slowest completion sets the pace of everything downstream, and
   optimising anywhere else changes nothing.
2. **Move work, not just workers.** Some items can be reassigned, some
   can be simplified, and some can be dropped. Reassignment is only one
   of three options and often not the cheapest.
3. **Respect capability limits when rebalancing.** Moving specialist
   work to a desk that cannot do it converts a queue into rework (see
   agent-work-assignment).
4. **Protect the constraint from non-essential work.** The bottleneck
   should do only what only it can do, with everything else routed away
   or handled upstream.
5. **Rebalance on a rhythm, not continuously.** Constant reassignment
   costs context and confuses ownership; a defined checkpoint is enough
   for most work.
6. **Watch for chronic imbalance.** A desk permanently over capacity is
   a structural problem needing more resource or less scope, not
   repeated rebalancing (see agent-capacity-planning).
7. **Keep the queue visible to everyone.** Hidden queues prevent people
   from seeing where help would matter.

## Boundaries

Balancing moves work within existing capacity; it cannot fix a system
that is under-resourced overall. Reassigning work between people has
fairness and morale implications that belong to a manager rather than an
algorithm (see agent-people-ops-desk). Frequent reassignment damages
quality through lost context, so stability has value that balancing must
not override.

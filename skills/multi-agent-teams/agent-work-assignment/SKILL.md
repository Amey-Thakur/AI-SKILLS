---
name: agent-work-assignment
description: Match work to the agent or person best able to finish it, with explicit capacity limits so nothing is assigned into an already full queue. Use when work is distributed by whoever is nearest rather than by fit and capacity.
---

# Agent work assignment

Assignment fails in two directions: everything routed to the most
capable worker until they are the bottleneck, or work spread evenly
onto whoever is free regardless of fit. Good assignment considers both
capability and current load, and refuses when neither works.

## Method

1. **Describe the work before assigning it.** The deliverable, the
   constraints, and what done looks like. Vague work returns vague
   output regardless of who does it.
2. **Match on capability, then on load.** The best fit that has capacity
   beats the best fit that does not, because queued work delivers
   nothing.
3. **Give every worker an explicit capacity.** Concurrent items or
   tokens or hours, stated. Without a limit, assignment continues until
   quality collapses (see agent-capacity-planning).
4. **Refuse rather than overload.** When nothing has capacity, the
   correct output is a message saying so with the trade-off, not a
   silent queue.
5. **Assign to one owner, always.** Shared ownership produces mutual
   assumption. Collaborators are named separately from the owner.
6. **Include the context the worker needs, and no more.** Enough to
   act, without the whole company's state, which wastes context and
   leaks (see agent-context-isolation).
7. **Confirm acceptance before counting it as assigned.** A worker that
   cannot do the work must say so immediately rather than at the
   deadline (see agent-handoff-protocol).

## Boundaries

Assignment allocates work; it does not create capacity, and a system
that is genuinely oversubscribed needs scope cut or resources added by a
human. Assigning work to people carries fairness and employment
implications and is a management responsibility, not an agent's (see
agent-people-ops-desk). Capability estimates for agents are approximate
and need real outcomes to calibrate.

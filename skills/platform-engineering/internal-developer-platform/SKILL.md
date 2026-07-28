---
name: internal-developer-platform
description: Build a platform that lets product teams ship without filing tickets, treating the platform as a product with users. Use when infrastructure work is a bottleneck or every team solves the same problems differently.
---

# Internal developer platform

A platform succeeds when teams choose it because it is the easiest path,
and fails when it is mandated and worked around. The distinction is
whether it was built as a product for its users or as a control point
for its owners.

## Method

1. **Start from the friction teams actually have.** Observe how long a
   new service takes to reach production today, and where it waits (see
   platform-as-product).
2. **Automate the common case completely.** The ninety percent path
   should need no human approval and no ticket, since queueing is the
   friction you are removing.
3. **Keep an escape hatch.** Teams with genuinely unusual needs must be
   able to step outside the platform rather than being blocked, or they
   will route around it entirely.
4. **Expose capability, not configuration.** Teams should ask for a
   database rather than choosing instance types, with the platform
   holding the expertise (see platform-abstractions).
5. **Make the paved road the fastest road.** Adoption follows
   convenience far more reliably than policy (see paved-road-adoption).
6. **Version and evolve without breaking teams.** Platform changes
   affect everyone at once, so they need the discipline of a public API
   (see api-change-management).
7. **Measure time to first deploy.** How long a new team takes to ship
   something is the platform's core metric (see
   developer-productivity-metrics).

## Boundaries

A platform adds a layer that must be maintained forever, which small
organisations rarely justify. It cannot fix organisational problems that
present as technical friction (see organizational-design). Building one
before the common patterns are known produces abstractions over
guesswork.

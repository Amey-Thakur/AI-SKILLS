---
name: monolith-first
description: Build a modular monolith with clean internal seams and split to services only on proven pressure. Use when starting a system or resisting premature microservice decomposition.
---

# Monolith first

Most systems should start as a well-structured monolith and stay one
longer than fashion suggests. A modular monolith gives you clean
boundaries without network complexity; you extract services later,
from seams you have proven, when a specific pressure demands it.

## Method

1. **Build modules with the discipline of services, minus
   the network.** Clear internal boundaries (packages/
   modules by business capability: see
   microservices-boundaries' capability split), each owning
   its data and exposing an interface other modules call:
   in-process, but as if it were a contract. This is the
   whole trick: service-grade boundaries, in-process
   simplicity (see module-boundaries, layered-architecture).
2. **Enforce boundaries the compiler cannot forget.** Module
   dependencies point one way (see coupling-analysis),
   cross-module access goes through the interface not the
   internals, and tooling (visibility modifiers, package
   rules, architecture-fitness tests) fails the build when
   a module reaches past a boundary. Boundaries maintained
   by good intentions dissolve; enforced ones survive to
   become extraction seams.
3. **Keep data ownership clean inside the monolith.** Each
   module owns its tables; other modules query through the
   owning module, not by joining across (even though one
   database makes cheating trivial). This is the single
   most valuable discipline: it is what makes a future
   service extraction a boundary move, not a data-untangling
   project (see microservices-boundaries' data ownership).
4. **Deploy the simplicity while you can.** One artifact,
   one deploy, in-process calls (no network partial
   failure), one database transaction across modules when
   genuinely needed, one place to debug: this operational
   ease is real value, not a limitation to escape. A team
   drowning in a premature dozen services would trade back
   for it (see deployment-pipelines' lower ceremony).
5. **Extract a service on specific, demonstrated pressure.**
   Legitimate triggers: a module needs independent scaling
   (different load profile), independent deployment (release
   cadence conflict), team autonomy (Conway's law), or
   technology divergence. Extract via strangler-fig (see
   strangler-fig): route through the boundary you already
   have, move the data, cut over. Extraction from a clean
   seam is a week; from a tangled one, a quarter.
6. **Revisit the decision, do not relitigate it monthly.**
   The monolith is not permanent, and it is not a failure
   to still have one at scale (many large successful
   systems are modular monoliths). Split when a real
   pressure appears; resist splitting because an
   architecture diagram looks more impressive with boxes
   (see technical-vision for keeping the direction honest).

## Boundaries

- "Monolith first" is not "monolith forever" nor an excuse
  for a big ball of mud: without the internal modularity
  (steps 1-3), you get an unstructured monolith that is as
  hard to work in as bad microservices, and harder to
  extract from.
- Some systems start distributed for real reasons (a
  genuinely independent domain, a team boundary from day
  one, a component with radically different scaling): the
  rule is a default, not a law.
- The modular monolith requires enforcement tooling and
  team discipline; without them the boundaries erode and
  the future extraction gets expensive (see
  coupling-analysis, tech-debt-register).

---
name: coupling-analysis
description: Measure and manage coupling with afferent/efferent metrics, change amplification, and one-way dependency rules. Use when a codebase is hard to change safely or you are deciding where to draw module boundaries.
---

# Coupling analysis

How hard a system is to change safely is mostly a function of its
coupling: how much one part must know about another, and how far a
change ripples. Good architecture is not about eliminating coupling
(impossible) but directing it: toward stable things, in one direction,
across as few boundaries as possible.

## Method

1. **Measure the two directions.** Afferent coupling (how
   many things depend on this module: its responsibility)
   and efferent coupling (how many things this module
   depends on: its fragility). A module with high afferent
   coupling must be stable (many depend on it); a module
   with high efferent coupling is hard to change (it breaks
   when any dependency does). Tools compute these; the
   numbers name your risky modules.
2. **Point dependencies toward stability.** Stable, abstract
   things (interfaces, core domain: see
   domain-driven-design) are depended upon; volatile,
   concrete things (UI, external integrations) depend
   outward and are depended on by nothing (the
   dependency-inversion instinct: see layered-architecture,
   hexagonal-architecture). A stable module depending on a
   volatile one is inverted and will churn.
3. **Enforce one-way dependencies.** Cycles are the enemy:
   two modules depending on each other cannot be understood,
   tested, or deployed independently (see
   circular-dependencies). Pick a direction per boundary,
   enforce it with tooling (architecture-fitness tests,
   package/visibility rules: see module-boundaries), and
   when a cycle appears, it names a missing shared concept
   to extract downward.
4. **Watch change amplification as the real symptom.** The
   practical measure of bad coupling: how many files/modules
   a typical change touches. One logical change requiring
   edits across five modules means those modules are
   coupled around that change axis: co-locate what changes
   together (high cohesion), separate what changes
   independently (the microservices-boundaries and
   monolith-first module test).
5. **Prefer loose coupling mechanisms deliberately.**
   Depend on interfaces not implementations (see
   go-project-layout's consumer-side interfaces), pass data
   not behavior across boundaries, use events for genuinely
   independent reactions (see event-driven-architecture),
   and keep shared data structures minimal (a fat shared
   type couples everyone who touches it). Each loosening
   trades directness for changeability: apply where change
   is likely, not everywhere (see premature-abstraction).
6. **Distinguish coupling kinds by cost.** Data coupling
   (passing parameters: fine) up through control coupling,
   shared-state coupling, to content coupling (reaching
   into another module's internals: the worst). The audit
   question is not "is there coupling" but "is it the cheap
   kind, pointed the right way, across a boundary that
   earns it" (see cognitive-load: coupling is also what
   makes code hard to hold in your head).

## Boundaries

- Zero coupling is zero system; the goal is appropriate
  coupling, not none. Over-decoupling (indirection
  everywhere, events for synchronous needs) creates its
  own unreadability (see premature-abstraction,
  cognitive-load).
- Metrics guide but do not decide: a high-afferent module
  that is genuinely stable and well-designed is healthy;
  the numbers flag candidates for judgment, not verdicts.
- Coupling analysis informs where to draw boundaries
  (modules, services); it is the measurement behind
  microservices-boundaries and monolith-first, applied
  before and after those decisions.

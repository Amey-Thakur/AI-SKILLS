---
name: cqrs
description: Split read and write models when their shapes genuinely diverge, and manage the sync lag honestly. Use when one data model cannot serve both commands and queries well, or when reviewing an over-engineered CQRS setup.
---

# CQRS

Command Query Responsibility Segregation means the model that validates
writes is not the model that serves reads. It is a targeted tool for
shape divergence, not an architecture to spread by default.

## Method

1. **Adopt per hot spot, not per system.** The trigger is concrete: a
   write model normalized for invariants while reads need denormalized
   aggregations (dashboards, search, feeds), or read scale demanding
   replicas/caches the write path should not care about. One or two
   aggregates usually qualify; the rest of the app stays plain CRUD.
2. **Commands validate, then change, then tell.** A command targets one
   aggregate, enforces invariants transactionally, and emits what
   changed (an event via transactional-outbox, or CDC from the write
   tables). Commands return success/failure and ids, not query data.
3. **Project into read models built for each query.** Consumers fold
   the change stream into purpose-shaped stores: a wide SQL table for
   the dashboard, a search index for lookup, a cache for the hot path.
   Each projection is independently rebuildable from the source; a
   projection you cannot rebuild is a second source of truth.
4. **Treat lag as a product decision.** Reads trail writes by the
   projection delay. Where users notice, choose deliberately:
   read-your-writes by returning the result from the command response,
   optimistic UI, version tokens the client polls until the projection
   catches up, or routing that one query at the write model. Measure
   projection lag and alert on it like queue age.
5. **Keep projections deterministic and idempotent.** Same events in,
   same table out; dedupe on event id (see idempotent-consumers).
   Rebuild is your migration strategy: new read shape = new projector
   replaying history beside the old one, cut over when caught up.
6. **Draw the seam at the API layer.** Query endpoints hit read stores
   only; command endpoints hit the write model only. The moment a
   query handler joins the write tables "just this once", the split's
   costs remain and its benefits are gone.

## Boundaries

- CQRS does not require event sourcing; CDC from a normal database
  feeds projections fine. Combine them only when each is independently
  justified (see event-sourcing).
- Cross-aggregate transactions do not exist in this model; workflows
  spanning aggregates are sagas (see saga-pattern).
- If reads and writes fit one model with an index or two, the split
  buys you two deployables, a lag SLA, and a rebuild pipeline for
  nothing; keep CRUD.

---
name: event-driven-architecture
description: Design event-driven systems with well-shaped events, schema contracts, and honest handling of choreography's costs. Use when decoupling services through events or debugging an event system nobody can reason about.
---

# Event-driven architecture

Events invert control: producers announce what happened and forget;
consumers react on their own schedule. This buys decoupling and
scalability at the price of a system whose behavior lives in no single
place, so the design discipline is making that distributed behavior
traceable and its contracts stable.

## Method

1. **Model events as immutable business facts.** Past tense,
   named for what happened (`OrderPlaced`, not
   `OrderService.update`), carrying the identifiers and the
   facts consumers need, with a version and timestamp (see
   event-sourcing's event design; the same rule whether or
   not you store the log). Events are commands' opposite:
   they announce, they do not instruct, and they cannot be
   rejected.
2. **Choose choreography and orchestration deliberately.**
   Choreography (services react to events independently)
   scales and decouples but scatters the workflow: no one
   place answers "where is order 123" (see saga-pattern's
   same tradeoff). Orchestration (a coordinator drives the
   steps) keeps flows readable at the cost of a central
   component. Use choreography for genuinely independent
   reactions, orchestration for multi-step business
   processes: mixing them by accident is how event systems
   become unknowable.
3. **Treat event schemas as contracts.** Producers and
   consumers are coupled through the event shape; evolve it
   additively (new optional fields), version breaking
   changes, and enforce compatibility mechanically (schema
   registry: see schema-evolution, api-change-management).
   An event's schema is a public API with many invisible
   consumers.
4. **Deliver at-least-once, consume idempotently.** The
   transport redelivers; consumers dedupe or design
   naturally idempotent handlers (see idempotent-consumers,
   delivery-guarantees), and never assume ordering beyond
   per-key (see message-queues, clock-skew). Producers emit
   events reliably via the outbox pattern so state change
   and event never diverge (see transactional-outbox).
5. **Make the invisible traceable.** Correlation IDs
   threaded through every event and handler (see
   distributed-tracing), a catalog of events with their
   producers and consumers (see data-lineage's instinct for
   events), and observability that reconstructs a flow
   across services (see observability). Without these, an
   event system is a debugging nightmare where cause and
   effect live in different repos.
6. **Provide a reconciliation path.** Consumers miss events
   (downtime, bugs); a replayable log (see message-queues'
   retention) or a query API to re-fetch current state
   (see rest-endpoint-design) lets a recovered consumer
   catch up. Event-driven without a catch-up story loses
   data silently on every consumer outage.

## Boundaries

- Events decouple, but eventual consistency is the price:
  the UI and users see intermediate states (see cqrs's read
  lag), and workflows are not atomic (see saga-pattern);
  design the UX for in-flight and the data for reconcile.
- Not everything is an event: request/response is simpler
  and correct for synchronous needs (a user awaiting a
  result); reaching for events to decouple two services
  that must agree synchronously adds latency and
  complexity for nothing.
- The broker becomes critical infrastructure with its own
  scaling, retention, and failure modes (see
  message-queues, capacity-planning); event-driven is a
  distributed-systems commitment, not a library import.

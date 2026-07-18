---
name: hexagonal-architecture
description: Isolate domain logic behind ports it owns while frameworks, databases, and transports live in adapters that plug into those ports. Use when business rules keep getting entangled with the web framework or database and you want the core testable and swappable in isolation.
---

# Hexagonal architecture

Also called ports and adapters. The idea is a hard rule: the domain depends on
nothing, and everything depends on the domain. When the HTTP handler and the
SQL query bleed into the business rules, you cannot test the rules without a
server and a database, and you cannot change either without risking the rules.

## Method

1. **Define ports as interfaces the domain owns.** A port is a Python Protocol,
   a Java interface, a Go interface declared inside the domain package. The
   domain names the shape it needs, `PaymentGateway.charge(amount)`, and never
   imports the thing that fulfills it.
2. **Keep the domain import-clean.** No `import requests`, no ORM base class, no
   framework annotation inside the core. Grep the domain package for your web
   and database libraries: a single hit is a leak to fix, not to tolerate.
3. **Split ports into driving and driven.** Driving (primary) ports are how the
   outside calls in: a use-case interface a REST controller invokes. Driven
   (secondary) ports are how the domain calls out: repositories, gateways,
   clocks. Naming the two directions keeps the wiring legible.
4. **Put every concrete detail in an adapter.** The REST adapter drives a
   primary port; the Postgres adapter implements a secondary port; a Stripe
   adapter implements the payment port. Each adapter is replaceable without the
   domain noticing.
5. **Wire everything at a composition root.** One place, usually `main`, that
   constructs adapters and injects them into the domain. The domain receives
   its dependencies; it never reaches out and builds them.
6. **Test the core with fakes.** Swap in an in-memory repository and a stub
   gateway to test business rules with no network and no I/O. If a domain test
   needs a running database, a boundary has been crossed.
7. **Translate at the adapter edge.** Map request payloads and database rows to
   domain models inside the adapter, so external formats never reach the core.

## Checks

- Do the domain tests run with no database, no HTTP server, and no clock skew?
- Could you replace Postgres with an in-memory store by writing one adapter and
  changing one line at the composition root?
- Does any domain file import a framework, driver, or transport library?

## Boundaries

Domain-driven design supplies the model that lives inside the hexagon: this
skill governs the boundary around it, not the modeling within. For a thin CRUD
service with no real business rules, the indirection buys little worth its cost.

---
name: domain-driven-design
description: Apply DDD pragmatically: bounded contexts, ubiquitous language, and aggregates sized to invariants. Use when modeling a complex domain or when code and business people describe the same thing differently.
---

# Domain-driven design

DDD's durable core is small: name things the way the business names
them, draw boundaries where the language changes meaning, and cluster
data around the rules that must stay consistent. The tactical
machinery is optional; the strategic modeling is where the value is.

## Method

1. **Build a ubiquitous language, and use it everywhere.**
   The terms the domain experts use become the terms in
   code, APIs, and conversation: no translation layer
   between "what the business calls it" and "what the class
   is named" (see naming-things). When a developer says
   "record" and the expert says "policy" for the same
   thing, bugs breed in the gap; close it by adopting the
   expert's word in the code.
2. **Find bounded contexts where the language shifts.** The
   same word means different things in different parts of
   the business ("customer" in sales vs support vs
   billing): each coherent meaning is a bounded context
   with its own model, and the boundaries between contexts
   are exactly where you draw module or service lines (see
   microservices-boundaries, monolith-first). One universal
   model for the whole enterprise is the anti-pattern:
   it satisfies no context fully.
3. **Map the relationships between contexts.** How contexts
   integrate (shared events, published APIs, an
   anti-corruption layer translating another context's
   model into yours: see event-driven-architecture,
   api-gateway-pattern) and the power dynamics (upstream/
   downstream): a context map makes the system's real
   structure visible and prevents one context's model from
   silently corrupting another's.
4. **Size aggregates around invariants.** An aggregate is
   the cluster of objects that must stay consistent
   together, with one entry point (the root); it is the
   transactional and consistency boundary (see
   event-sourcing, transactions-isolation). Keep aggregates
   small: a huge aggregate is a lock-contention and
   scaling problem, and cross-aggregate consistency is
   eventual (via events/sagas: see saga-pattern), so put
   only the truly-must-be-atomic together.
5. **Reach for tactical patterns only when they pay.**
   Entities (identity over time), value objects (immutable,
   compared by value: see python-dataclasses' twin),
   domain events, repositories, domain services: use the
   ones that clarify, skip the ceremony that does not.
   Rich domain models (behavior with the data) beat
   anemic ones (data structs plus a service doing
   everything) for genuinely complex logic; for CRUD, the
   simple approach wins (see premature-abstraction).
6. **Model collaboratively, iterate on it.** The domain
   model comes from conversations with domain experts
   (event storming, examples: see customer-interviews'
   listening ethic applied internally), not from a
   developer guessing; and it evolves as understanding
   deepens. A model handed down once and frozen drifts
   from the business it was meant to capture.

## Boundaries

- DDD's cost is justified by domain complexity; for
  simple or generic domains (a standard CRUD app, a thin
  integration) the full apparatus is overhead, and
  ubiquitous language plus sensible modules suffice.
- Tactical patterns without strategic design (aggregates
  and repositories over a model with no bounded contexts
  or shared language) is cargo-cult DDD: the ceremony
  without the insight.
- Bounded contexts inform but do not dictate service
  boundaries; a context can be a module in a monolith
  (see monolith-first) before it is ever a service.

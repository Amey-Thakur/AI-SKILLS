---
name: caching-strategy
description: Decide what to cache and where by choosing layers, key shapes, and TTLs against the read pattern and freshness need. Use when reads are hot and repeated and you are deciding whether and where to add a cache before writing invalidation code.
---

# Caching strategy

A cache is a bet that a value will be read again before it changes, and read
often enough to pay for the memory and the staleness risk. Placed without that
bet, it either never hits or serves wrong data. Design the strategy before the
code: layer, key, lifetime, and what makes it wrong.

## Method

1. **Confirm the access pattern justifies it.** Cache reads that are frequent,
   repeated on the same key, and expensive to recompute. A value read once per
   key, or cheap to derive, gains nothing but a coherence problem. Check the
   hit rate you expect, not the one you hope for.
2. **Choose the layer by scope and blast radius.** In-process (a map or
   Caffeine) is fastest but per-instance and lost on restart. A shared store
   (Redis, Memcached) survives restarts and is coherent across instances at a
   network hop. A CDN or HTTP cache handles static and public responses at the
   edge. Cache at the highest layer that still sees the same key.
3. **Design keys to be specific and collision-proof.** Include every input the
   value depends on: `user:42:cart:v3`, not `cart`. Namespace by entity and
   include a schema version so a shape change cannot serve a stale format.
   Omit a dependency and you serve one user another user's data.
4. **Set TTLs from tolerable staleness, per key class.** Reference data can
   live hours; a price or inventory count lives seconds. Write the freshness
   budget down: "catalog is allowed to be 5 minutes stale". Add jitter to
   expiries so a thousand keys do not expire in the same second and stampede
   the origin.
5. **Pick a read pattern and name it.** Cache-aside (read cache, miss, load,
   populate) is the default and keeps the app in control. Read-through hides
   the load behind the cache client. Decide up front so misses have one code
   path, not three.
6. **Guard the stampede.** On a cold or expired hot key, use a lock or
   single-flight so one request recomputes while the rest wait, instead of a
   thundering herd hitting the database at once.

## Signals

- Is the measured hit rate high enough to justify the coherence cost?
- Does every key contain each input the value depends on, plus a version?
- Does each key class have a written staleness budget and a matching TTL?
- Do concurrent misses on a hot key collapse into one origin call?

## Boundaries

This skill sizes and places the cache; correctly clearing it when data changes
is its own discipline, covered by cache-invalidation. Precomputing expensive
aggregates rather than caching on demand is materialized-views territory.

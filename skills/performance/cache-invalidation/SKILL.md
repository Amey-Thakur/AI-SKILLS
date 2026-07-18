---
name: cache-invalidation
description: Keep cached data correct as the source changes using write-through, event-driven eviction, and versioned keys. Use when a cache exists and stale reads are a risk, or when users report seeing old data after a write.
---

# Cache invalidation

The hard part of caching is not filling the cache, it is knowing the moment a
cached value became a lie. A stale read is a correctness bug wearing good
latency. Every cache needs a written answer to one question: when the source
changes, how does the copy learn?

## Method

1. **Enumerate every write path to the source of truth.** The API handler, the
   admin tool, the batch job, the replication stream, the manual database
   fix. Any path that mutates data and does not touch the cache is a stale-read
   generator. List them before choosing a mechanism.
2. **Prefer write-through or write-behind for data you own.** Update the cache
   in the same transaction or commit hook that updates the store, so the two
   move together. Write-through updates synchronously; write-behind queues the
   update. Either beats hoping a TTL expires before someone reads.
3. **Use events for cross-service invalidation.** When another service owns the
   write, subscribe to its change stream (Kafka, a Postgres logical
   replication feed, an outbox table) and evict on the event. Do not poll, and
   do not assume a short TTL papers over another team's write.
4. **Version keys instead of hunting them down.** For values derived from a
   schema or ruleset, embed a version in the key (`product:42:v7`). Bump the
   version and every consumer misses to fresh data at once, with no scan and
   no delete storm. Old keys age out on their own TTL.
5. **Invalidate the exact set, and its dependents.** Editing a product must
   drop `product:42` and any aggregate that includes it: the category listing,
   the search facet, the homepage block. Map these dependencies explicitly;
   the bug is always the derived key you forgot.
6. **Make eviction idempotent and failure-tolerant.** A delete that runs twice
   must be harmless, and a missed event must be recoverable by a bounded TTL as
   backstop. Never rely on the invalidation firing exactly once.

## Litmus tests

- Name a write path where the cache is not updated: if one exists, it leaks.
- After an edit, does every derived and aggregate key reflect it, not just the
  primary key?
- If an invalidation event is dropped, does a TTL still bound the staleness?

## Boundaries

This assumes the cache layout and TTLs are already chosen; that design belongs
to caching-strategy. Refresh scheduling for precomputed aggregates is handled
in materialized-views. Distributed multi-region coherence adds consensus
concerns beyond a single cache tier.

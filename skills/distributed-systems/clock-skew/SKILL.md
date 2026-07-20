---
name: clock-skew
description: Stop trusting wall clocks for ordering and expiry across machines; use logical clocks and single-writer timestamps. Use when timestamps decide ordering, uniqueness, or expiry in a distributed system.
---

# Clock skew

Every machine's clock is wrong by an unknown, changing amount. Any
design where correctness depends on two machines agreeing what time it
is has a bug with a random fuse.

## Method

1. **Inventory where time decides things.** Ordering (latest-write-wins
   merges), expiry (leases, tokens, caches), uniqueness (timestamp ids),
   measurement (cross-machine latency = t2 - t1, which is skew plus
   latency). Each use needs a skew story; most have none.
2. **Order with logical clocks, not wall clocks.** Per-entity sequence
   numbers from the single writer are best (see idempotent-consumers).
   Across writers: Lamport clocks give a total order consistent with
   causality; version vectors detect concurrent edits so you can merge
   instead of silently dropping one (wall-clock LWW discards the
   slower-clocked writer's data forever).
3. **Let one clock own each timestamp.** created_at from the database
   (`now()` in the insert), not from N application servers; expiry
   checked by the same system that set it. A token minted by server A
   and expired by server B's clock is wrong by their relative skew;
   compare against issued-at from the same authority plus a TTL.
4. **Buffer every deadline you did not own.** Honoring external
   expirations (JWT exp, lease TTLs): allow minutes of slack on
   validation windows, renew leases at TTL/3 (see distributed-locks),
   and treat "expired by 20 seconds" as ambiguous, not authoritative.
5. **Run NTP as monitored infrastructure.** chrony everywhere, alert
   when estimated offset exceeds your tolerance (an SLO like "skew
   < 100ms"), and watch for the killers: VM pause/resume jumps,
   leap-second smearing mismatches between providers, containers
   inheriting host drift. Monotonic clocks for intra-process durations,
   never wall time deltas.
6. **Know when bounded-uncertainty clocks apply.** TrueTime-style APIs
   (Spanner, some cloud time services) return an interval, and
   commit-wait turns bounded skew into real ordering guarantees. Unless
   your platform gives you that bound and you wait it out, you do not
   have this tool.

## Boundaries

- Human-facing timestamps (UI display, business reporting) tolerate
  seconds of skew; this discipline is for correctness paths, not for
  banning wall clocks generally.
- Logical clocks order events; they do not tell you when something
  happened. Auditing and debugging still want NTP-disciplined wall
  time alongside.
- Perfect sync is unachievable; the goal is designs whose correctness
  window exceeds worst-case skew by a wide margin.

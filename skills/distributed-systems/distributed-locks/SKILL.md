---
name: distributed-locks
description: Use leases with fencing tokens for mutual exclusion across machines, or restructure to need no lock at all. Use when serializing distributed work or reviewing lock code that must not double-execute.
---

# Distributed locks

A distributed lock is a lease plus a fencing token. Without the token it
is a probabilistic hint; with it, even an expired holder cannot corrupt
anything.

## Method

1. **Try to delete the lock first.** Unique constraints make duplicate
   inserts safe; idempotency keys serialize retries; queue partition
   keys serialize per entity; SKIP LOCKED hands out work items without
   coordination. Most "we need a distributed lock" problems are one of
   these in disguise.
2. **Locks are leases.** A lock without expiry plus a crashed holder is
   a permanent outage. Acquire with a TTL (store-side expiry:
   `SET key owner NX PX ttl`, or an etcd/ZooKeeper lease bound to a
   session), sized at several times the expected critical section.
3. **The expiry gap is real: fence it.** The holder can pause (GC,
   network) past its TTL and resume believing it still holds the lock,
   while a new holder proceeds. Fix: the lock service issues a
   monotonically increasing token on each acquisition; every protected
   resource rejects writes carrying a token lower than the highest seen.
   Without fencing, correctness depends on timing luck.
4. **Heartbeat long work, checkpoint longer work.** Renew the lease from
   the working process at TTL/3; if renewal fails, stop mutating
   immediately, because someone else may hold the lock. Work longer than
   a few TTLs should checkpoint so a successor resumes rather than
   restarts.
5. **Release safely, verify ownership.** Release only your own lock
   (compare owner id atomically with delete: Lua script in Redis,
   version check in a database row). Blind DELETE releases the next
   holder's lock.
6. **Choose the store by guarantee needed.** Efficiency locks (avoid
   duplicate cache fills, mostly-harmless double work): single Redis
   with NX+TTL is fine. Correctness locks (must never double-execute):
   a consensus-backed store (etcd, ZooKeeper) or your primary database
   row locks, always with fencing at the resource.

## Boundaries

- Redlock-style multi-node timing schemes still lack fencing; treat
  them as efficiency locks regardless of marketing.
- If the protected resource cannot check a token (a third-party API),
  no lock protocol fully protects it; make the operation idempotent at
  that boundary instead.
- Lock-per-request patterns serialize your whole system; if everything
  needs the same lock, the design needs sharding, not a better lock
  (see leader-election for the one-active-node case).

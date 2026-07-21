---
name: transactions-isolation
description: Choose isolation levels by the anomalies they prevent, understand locking versus MVCC, and retry on serialization failures. Use when transactional correctness matters or concurrency bugs appear under load.
---

# Transactions isolation

Isolation levels are a menu of guarantees against concurrency
anomalies, each trading correctness for concurrency. Most bugs come
from running at the default level without knowing which anomalies it
permits, then being surprised when two transactions interleave in a way
the code assumed impossible.

## Method

1. **Know the anomalies each level prevents.** Read
   uncommitted (dirty reads: almost never use). Read
   committed (prevents dirty reads; permits non-repeatable
   reads and phantoms: the common default). Repeatable read
   (prevents non-repeatable reads; MVCC implementations also
   prevent phantoms). Serializable (prevents all anomalies:
   transactions behave as if run one at a time). Pick the
   weakest level that prevents the anomalies your logic
   cannot tolerate, and know what your database's default
   actually permits.
2. **Match the level to the correctness need.** A read-
   modify-write that must not lose updates (increment a
   balance) needs repeatable-read-or-stronger, or explicit
   locking, or an atomic operation: at read committed, two
   transactions read the same value and one overwrites the
   other (the lost update). Financial and inventory
   invariants often need serializable; a dashboard read
   tolerates read committed. Decide per transaction.
3. **Understand your engine: locking vs MVCC.** MVCC
   databases (Postgres, Oracle, MySQL/InnoDB) give readers a
   consistent snapshot without blocking writers (readers do
   not block writers, writers do not block readers): the
   model most modern code assumes. Lock-based isolation
   blocks more. This difference changes how contention
   manifests and how you tune it (see deadlock-analysis,
   concurrency-tuning).
4. **Retry on serialization failures.** At serializable (and
   sometimes repeatable read), the database aborts a
   transaction that would violate isolation rather than
   blocking: your code must catch the serialization-failure
   error and retry the whole transaction (see timeouts-and-
   retries's idempotent-retry discipline). Code that treats
   these aborts as fatal errors breaks under load at
   stronger isolation; the retry loop is mandatory, not
   optional.
5. **Keep transactions short and focused.** Long
   transactions hold locks/snapshots longer, increasing
   contention, deadlocks, and (in MVCC) bloat from retained
   old versions. Never do I/O, user waits, or external calls
   inside a transaction (see spring-boot-discipline's same
   rule): open late, commit early, touch only what the unit
   of work needs.
6. **Use explicit locking and atomic ops deliberately.**
   `SELECT ... FOR UPDATE` to lock rows for a read-modify-
   write, `SKIP LOCKED` for work-queue patterns (see
   background-jobs), and atomic single-statement updates
   (`SET balance = balance + ?`) to avoid the read-modify-
   write race entirely. Often the cleanest fix is not a
   higher isolation level but an atomic operation.

## Boundaries

- Isolation is single-database; consistency across
  services or shards is a distributed-systems problem
  (see distributed-systems category, saga-pattern), not an
  isolation-level setting.
- Stronger isolation reduces concurrency and throughput;
  the right level is the weakest that is correct, not the
  strongest available (serializable everywhere is a
  performance choice you may not have meant to make).
- Default isolation levels vary by database (read committed
  in Postgres, repeatable read in MySQL); never assume,
  check what yours does, because the same code behaves
  differently across engines.

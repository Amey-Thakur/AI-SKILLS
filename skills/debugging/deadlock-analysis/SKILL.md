---
name: deadlock-analysis
description: Find why threads are stuck forever by dumping their state and building the wait-for graph that reveals the lock cycle. Use when a program hangs with no progress and no crash, or throughput drops to zero while CPU sits idle.
---

# Deadlock analysis

A deadlock is a cycle of waiting: thread A holds lock 1 and wants lock 2
while thread B holds lock 2 and wants lock 1, and neither will ever move.
The process is not crashed, it is frozen, which fools you into looking for a
slow operation instead of a stuck one. The cycle is always visible in a
thread dump if you know how to read the waits.

## Method

1. **Confirm it is a deadlock, not slowness.** Idle CPU with zero progress
   for minutes points at blocking, not computation. A busy CPU spinning
   forever is a livelock or infinite loop, a different bug. Check that
   threads are parked in a wait state, not running hot.
2. **Capture a thread dump at the moment of the hang.** `jstack <pid>` or
   `kill -3` on the JVM, `py-spy dump --pid` for Python, `dlv` or `SIGQUIT`
   for Go (which prints all goroutine stacks), `gdb -p <pid>` then `thread
   apply all bt` for native. Take two dumps a few seconds apart: if the
   stacks are identical, nothing is moving.
3. **Read who holds what and who waits for what.** A good dump names it
   directly: the JVM prints "Found one Java-level deadlock" with the lock
   ids, "waiting to lock <0x...>" versus "locked <0x...>". For each blocked
   thread, write down the lock it holds and the lock it wants.
4. **Draw the wait-for graph and find the cycle.** Nodes are threads, an
   edge runs from a thread to the thread holding the lock it waits on. A
   cycle in that graph is the deadlock, and the locks on the cycle are the
   ones acquired in conflicting order. Two locks is the common case; the
   graph scales to more.
5. **Fix with a global lock ordering.** Pick a total order for the locks on
   the cycle (by address, by name, by a fixed rank) and make every code path
   acquire them in that order. If ordering is impractical, use a single
   coarser lock, a `tryLock` with timeout and backoff, or lock-free
   structures. Consistent order breaks every cycle by construction.
6. **Prove it under contention.** Run the path that hung under many threads
   for an extended loop. A deadlock that reproduced in minutes should now run
   indefinitely. Static tools help catch regressions: `-Xlint`, `jcstress`,
   or Clang's `-Wthread-safety` annotations flag out-of-order acquisition.

## Signals

- Do two thread dumps taken seconds apart show identical, parked stacks?
- Can you trace a closed cycle through the wait-for graph?
- Does every path that touches those locks now take them in one fixed order?

## Boundaries

This covers mutual-exclusion deadlocks between threads in one process.
Distributed deadlocks across services, database lock waits, and connection-
pool exhaustion wear the same mask but resolve with transaction timeouts,
lock ordering at the database, or pool sizing, not with a thread dump.

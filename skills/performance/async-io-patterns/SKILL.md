---
name: async-io-patterns
description: Structure async code so the event loop stays free, slow producers apply backpressure, and blocking calls never stall unrelated work. Use when writing or debugging async IO and throughput is low, latency is spiky, or the loop appears to hang.
---

# Async IO patterns

Async concurrency runs thousands of IO operations on one thread by never
waiting idly: while one request is in flight, the event loop advances another.
That model breaks the instant one task blocks the thread, or one producer
outruns its consumer and floods memory. The failures are quiet until the loop
freezes under load.

## Method

1. **Never block the event loop.** A synchronous call inside a coroutine (a
   `requests.get`, a `time.sleep`, a CPU-heavy loop, a blocking DB driver)
   stops every other task on that loop. Push it to a thread pool with
   `asyncio.to_thread` or `loop.run_in_executor`, or swap in an async-native
   client (`aiohttp`, `asyncpg`).
2. **Await concurrently, not in sequence.** Ten awaits in a `for` loop run one
   at a time. Gather them: `await asyncio.gather(*tasks)` for a fixed set, or
   feed them through a bounded worker pattern so all ten IO waits overlap.
3. **Bound in-flight work with a semaphore.** Firing 10,000 requests at once
   exhausts sockets and gets you rate-limited. Wrap each task in
   `async with semaphore:` sized to the downstream limit (say 50) so only that
   many are ever active.
4. **Apply backpressure at the queue.** When a producer is faster than its
   consumer, an unbounded `asyncio.Queue` grows without limit. Give it a
   `maxsize` so `put` suspends the producer until the consumer catches up, and
   memory stays flat.
5. **Always time out external calls.** A hung socket with no timeout ties up a
   task forever. Wrap network awaits in `asyncio.wait_for(coro, timeout=...)`
   or the client's own timeout, so a dead peer fails fast instead of leaking a
   task.
6. **Handle cancellation and gather errors.** One failing task in `gather`
   cancels its siblings unless you pass `return_exceptions=True`. Decide the
   policy, and let `CancelledError` propagate rather than swallowing it, or you
   leak tasks on shutdown.

## Litmus tests

- Under load, does the loop keep serving other requests, or does one slow call
  freeze all of them?
- Is every batch of independent awaits gathered rather than run in a loop?
- Is the number of simultaneously in-flight operations capped by a semaphore
  or bounded queue?
- Does every external await carry a timeout, so a dead peer cannot pin a task?

## Boundaries

This skill covers correct use of a single-threaded event loop and its
backpressure. Choosing how many OS threads or processes to run alongside it is
concurrency-tuning's job. Framework-specific lifecycle rules (ASGI startup,
task groups, structured-concurrency libraries) defer to that framework's
documented contract.

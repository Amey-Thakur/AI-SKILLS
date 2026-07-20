---
name: python-asyncio
description: Decide whether asyncio pays off, keep the event loop unblocked, and structure concurrency with TaskGroup and disciplined cancellation. Use when writing async Python or diagnosing a hung, slow, or silently-failing event loop.
---

# Python asyncio

Asyncio wins for high-concurrency I/O waiting, not for CPU work and not for
a handful of calls. Its whole model rests on one rule: never block the event
loop, because one blocking call stalls every other task.

## Method

1. **Confirm async is the right tool.** Use it when you have many concurrent
   I/O-bound operations (hundreds of sockets, requests, or DB calls) that
   spend their time waiting. For CPU-bound work use processes; for a few
   sequential calls, plain synchronous code is simpler and faster to reason
   about. See python-concurrency for the decision table.
2. **Keep the loop pure I/O.** Any synchronous call that blocks (a `requests`
   call, `time.sleep`, heavy computation, a blocking driver) freezes all
   tasks. Push it off the loop with `asyncio.to_thread(fn, ...)` for I/O or a
   process pool for CPU. Enable `PYTHONASYNCIODEBUG=1` or pass `debug=True`
   to `asyncio.run` to log slow callbacks.
3. **Structure concurrency with TaskGroup.** On 3.11+, `async with
   asyncio.TaskGroup() as tg: tg.create_task(...)` awaits all children and
   cancels siblings if one fails, surfacing errors as an ExceptionGroup. It
   replaces bare `gather`, which leaves orphaned tasks running when one task
   raises and you forget `return_exceptions`.
4. **Use gather only for its shape.** `gather(*coros)` fits a fixed fan-out
   where you want results positionally and are ready to handle partial
   failure explicitly. Do not fire tasks with `create_task` and drop the
   reference; the loop may garbage-collect them mid-flight. Hold references
   or use a TaskGroup.
5. **Treat cancellation as cooperative.** Cancelling raises
   `CancelledError` at the next await; always re-raise it rather than
   swallowing it in a broad `except`. Guard cleanup with `finally`, and bound
   external calls with `asyncio.timeout()` so a stuck peer cannot hang a task
   forever.
6. **Never nest or block the loop from sync code.** One `asyncio.run` per
   program entry; calling it from inside a running loop raises. To bridge sync
   callers, use `asyncio.run` at the top only, and never
   `loop.run_until_complete` inside async code.

## Boundaries

- Async does not speed up CPU-bound work; the GIL still serializes it. Reach
  for multiprocessing instead.
- One blocking library call defeats the model. If a dependency has no async
  client, wrap it in a thread or pick a different tool.
- Mixing async and threads shares no automatic safety; the loop is not
  thread-safe, so hand work across with `run_coroutine_threadsafe`.

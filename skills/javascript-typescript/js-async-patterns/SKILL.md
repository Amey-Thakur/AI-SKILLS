---
name: js-async-patterns
description: Compose async JavaScript with promises and async/await correctly, propagating errors and cancelling with AbortController. Use when writing async code, running work concurrently, or debugging swallowed errors and unhandled rejections.
---

# JS async patterns

Async JavaScript is easy to write and easy to write wrong: a missing
`await`, an unhandled rejection, or a sequential loop that should have run
in parallel. The patterns are few; applying them consistently is the
skill.

## Method

1. **Prefer async/await, and await everything that returns a promise.**
   The most common bug is a forgotten `await`: the code continues before
   the work finishes, and errors escape as unhandled rejections. Enable
   the lint rules (`no-floating-promises`, `require-await`) that catch it
   (see linting-setup); a promise you do not await or `.catch()` is a
   silent failure waiting to happen.
2. **Run independent work concurrently.** `await`-ing in a loop
   serializes calls that could overlap. Use `Promise.all([...])` for
   independent operations you need all of, `Promise.allSettled` when some
   may fail and you want every result, `Promise.race` for
   first-wins/timeouts. A `for` loop of awaits over 100 requests is 100x
   slower than it should be (see python-asyncio for the same lesson in
   another runtime).
3. **Propagate errors, do not swallow them.** `try/catch` around
   `await`, re-throw or handle deliberately; a bare `.catch(() => {})`
   hides real failures. At the top of every async entry point (event
   handler, route, job), have one place that catches and reports (see
   js-error-handling). Set a global `unhandledRejection` handler as the
   backstop, not the plan.
4. **Cancel with AbortController.** Long or abandoned operations (a fetch
   the user navigated away from, a search superseded by a newer one)
   should be cancellable: pass an `AbortSignal` to fetch and cancellable
   APIs, abort the stale one. Uncancelled async work is wasted compute
   and a source of race-condition bugs (the older response overwriting
   the newer; see optimistic-ui).
5. **Bound concurrency against downstreams.** `Promise.all` over a
   thousand items fires a thousand simultaneous requests and overwhelms
   the target. Use a concurrency-limited map (a small pool, `p-limit`-
   style) so you run N at a time (see backpressure).
6. **Do not mix callbacks, promises, and await randomly.** Wrap
   callback-based APIs once with `promisify` or `new Promise`, then stay
   in async/await. Interleaving styles is where control flow becomes
   unfollowable.

## Boundaries

- Async concurrency overlaps waiting (I/O), it does not parallelize CPU
  work; JavaScript runs your code on one thread (see js-event-loop). Heavy
  computation needs Web Workers or worker threads, not more promises.
- Error handling across async boundaries loses the natural stack; capture
  context at the throw site (see js-error-handling's cause chains).
- Sequential is sometimes correct (each step depends on the last, or you
  must not hammer a rate limit); parallelize only genuinely independent
  work.

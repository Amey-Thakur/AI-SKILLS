---
name: js-event-loop
description: Reason about the JavaScript event loop, microtasks vs macrotasks, and why blocking it freezes everything. Use when debugging ordering surprises, UI jank, or code that runs in an unexpected sequence.
---

# JS event loop

JavaScript runs your code on a single thread with an event loop: it runs
one task to completion, then drains queued work, then repeats. Almost
every "why did this run in that order" and "why did the UI freeze" bug is
explained by how that loop schedules work.

## Method

1. **Hold the core model: run-to-completion, then drain queues.** The
   engine runs the current synchronous code fully (nothing interrupts
   it), then processes queued callbacks. Two queues matter: microtasks
   (promise `.then`, `await` continuations, `queueMicrotask`) and
   macrotasks (`setTimeout`, I/O callbacks, events). Understanding this
   ordering resolves most surprises.
2. **Know that microtasks beat macrotasks.** After the current task, the
   engine drains the ENTIRE microtask queue before the next macrotask. So
   a `Promise.resolve().then(...)` runs before a `setTimeout(..., 0)`
   queued earlier. This is why promise chains resolve "immediately" and
   why the ordering of mixed promise/timeout code is not source order.
3. **Never block the loop.** A long synchronous loop, a huge JSON.parse,
   or heavy computation freezes everything: no rendering, no clicks, no
   other callbacks, until it finishes (the one thread is busy). This is
   the cause of "the page hung" and unresponsive servers. Break long work
   into chunks yielded across tasks, or move it off-thread (Web Workers,
   worker threads).
4. **Do not starve the loop with microtasks either.** An unbounded chain
   of microtasks (a recursive `.then` or `await` that never yields to a
   macrotask) blocks rendering and I/O as effectively as a sync loop,
   because the microtask queue drains fully before anything else. Yield
   to a macrotask (`setTimeout`) when doing long iterative async work.
5. **Reach for the right yield primitive.** `queueMicrotask` to defer
   within the current cycle; `setTimeout(fn, 0)` to yield to rendering and
   I/O; `requestAnimationFrame` to run before the next paint (browser UI
   work); `requestIdleCallback` for low-priority background work. Each
   schedules into a different phase.
6. **Reason about ordering bugs from the queues, not intuition.** When
   code runs "too early" or "too late", map each piece to sync / microtask
   / macrotask and the order falls out. A `console.log` after an `await`
   runs later than the sync code following the call, because everything
   after `await` is a queued microtask (see js-async-patterns).

## Boundaries

- The single-threaded model applies to your JavaScript; the runtime does
  I/O and timers on other threads and queues their callbacks back to your
  loop. "Non-blocking I/O" means the waiting is off-thread, not that your
  code runs in parallel.
- Node and browsers share the model but differ in phases and extra queues
  (Node's `process.nextTick`, phase order); the microtask-vs-macrotask
  core transfers, the fine print does not.
- CPU-bound work does not belong on the loop at all; parallelism needs
  workers (see js-async-patterns' boundary).

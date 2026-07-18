---
name: batching-and-debouncing
description: Coalesce a flood of small operations into fewer larger ones with batch windows, debounce, or throttle, chosen by whether you need the last event or a steady rate. Use when high-frequency triggers each do expensive work: per-keystroke queries, per-event writes, per-scroll handlers.
---

# Batching and debouncing

When events arrive faster than their handler is worth running, three tools
coalesce them, and they are not interchangeable. Batching groups operations by a
window or count. Debounce waits for the storm to stop, then runs once. Throttle
runs at most once per interval during the storm. Pick the wrong one and you
either drop work you needed or run work you did not.

## Method

1. **Debounce when only the final state matters.** Search-as-you-type, autosave,
   resize-settled, validate-after-typing: reset a timer on each event and act
   only after quiet. Set the delay to human pause length, 200 to 400ms for
   typing, so the query fires once the user stops, not per keystroke.
2. **Throttle when you need steady progress during the storm.** Scroll position,
   drag updates, progress bars, telemetry: run at most once per interval (16ms
   for a 60fps handler, 1s for metrics) so the handler stays responsive without
   firing on every event. Debounce here would show nothing until motion stops.
3. **Batch when work is cheaper in bulk.** Accumulate writes, log lines, or API
   calls and flush on a window (every 50ms), a count (every 500 items), or a
   size (every 256KB), whichever trips first. Dual triggers bound both latency
   and batch size so a slow trickle still flushes.
4. **Set the window from the latency budget, not by feel.** A larger window
   coalesces more but delays every item by up to its length. Choose it against
   the tolerable delay: micro-batching writes at 10ms is invisible; a 5s window
   on a user action is not.
5. **Preserve correctness across the coalesce.** For debounce, capture the latest
   arguments, not the first. For batch, cap the buffer and flush on shutdown so
   queued work is not lost on crash or deploy. Make the flush idempotent so a
   retried batch does not double-apply.
6. **Give trailing edges and errors a policy.** Decide leading versus trailing
   invocation: fire immediately then go quiet, or wait then fire. On a failed
   batch flush, retry with backoff or dead-letter the items; never silently drop
   the buffer.

## Checks

- Does the choice match intent: debounce for last value, throttle for rate,
  batch for bulk efficiency?
- Is the window sized against a stated latency budget, not guessed?
- Does a batch flush on size, count, and time, so neither latency nor memory is
  unbounded?
- Is buffered work flushed on shutdown and safe to retry?

## Boundaries

This coalesces triggers on one side of a call. Sizing the pool that serves the
resulting calls is connection-pooling; the event-loop backpressure that slows a
fast producer is async-io-patterns. Deferring work until first use, rather than
merging repeats, is lazy-loading.

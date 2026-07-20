---
name: dotnet-async
description: Write async C# that never blocks on tasks, flows cancellation everywhere, and uses ValueTask where it pays. Use when writing .NET async code or debugging thread-pool starvation and deadlocks.
---

# .NET async

Async in .NET is viral by design: one blocking call inside an async
stack undoes the whole model. The rules are few and absolute: async
all the way, cancellation everywhere, and never sync-over-async.

## Method

1. **Go async end to end.** Controllers, services, repositories:
   `async Task` from the entry point down to the I/O. The forbidden
   moves are `.Result`, `.Wait()`, and `.GetAwaiter().GetResult()`
   on incomplete tasks: they block a thread-pool thread waiting for
   work that needs a thread-pool thread, which is how services
   deadlock under load and starve at scale. If a sync boundary is
   truly unavoidable, isolate it at the outermost edge and document
   it.
2. **Flow CancellationToken through every signature.** Accept a
   token, pass it to every awaited call, and honor it in loops;
   ASP.NET hands you `RequestAborted` so abandoned requests stop
   costing work (the timeouts-and-retries budget idea, in-process).
   Link tokens (`CreateLinkedTokenSource`) for per-operation
   timeouts layered on caller cancellation; treat
   `OperationCanceledException` as control flow, not an error to
   log as failure (see kotlin-idioms' identical rule).
3. **Return the right task shape.** `Task` for most APIs;
   `ValueTask` only on hot paths that usually complete synchronously
   (cache hits) and with its rules respected: await once, never
   store or await twice. `async void` is for event handlers alone;
   anywhere else it swallows exceptions and breaks composition.
   Avoid fake async (`Task.Run` wrapping sync work in a request
   path): it burns two threads to pretend one blocking call is
   async.
4. **Compose with the combinators, bounded.** `Task.WhenAll` for
   independent fan-out (exceptions aggregate: catch and inspect
   all); `Task.WhenAny` for races and timeouts; `Parallel.ForEachAsync`
   or a `SemaphoreSlim` gate for bounded concurrency against
   downstreams (see backpressure); `IAsyncEnumerable` with
   `await foreach` for streams, passing the token via
   `WithCancellation`. Fire-and-forget work goes to a hosted
   background service with error handling, not a dropped task
   (see background-jobs).
5. **Know where ConfigureAwait matters.** Library code:
   `ConfigureAwait(false)` throughout (no context to preserve,
   avoids deadlocks with context-bound callers). ASP.NET Core has
   no synchronization context, so app code there gains nothing;
   UI frameworks (WPF/MAUI) do have one, and returning to it after
   awaits is the point. The rule is per project type, set once,
   enforced by analyzer.
6. **Let the analyzers and metrics enforce it.** Enable the async
   analyzers (CA2007, CA2012, VSTHRD-class rules) in CI so blocking
   calls and misused ValueTasks fail the build (see linting-setup);
   watch thread-pool queue length and starvation counters in
   production dashboards (see infrastructure-monitoring): rising
   queue length with idle CPU is sync-over-async somewhere.

## Boundaries

- Async buys scalability for I/O-bound work, not speed for
  CPU-bound work; heavy compute belongs on dedicated workers or
  `Task.Run` at the boundary with concurrency limits (the
  python-concurrency triage, .NET edition).
- Async does not synchronize shared state; two awaits touching the
  same dictionary still race (see jvm-memory-model's lesson,
  mutatis mutandis: use concurrent collections or locks).
- Legacy interfaces that are sync-only (old ADO drivers, COM)
  cannot be made truly async by wrapping; plan the dependency
  upgrade rather than laundering blocking calls.

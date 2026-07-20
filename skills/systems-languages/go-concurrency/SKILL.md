---
name: go-concurrency
description: Structure goroutines with owned lifecycles, context propagation, and channel patterns that cannot leak or race. Use when writing concurrent Go or debugging goroutine leaks and data races.
---

# Go concurrency

Goroutines are cheap to start and easy to leak. The discipline: every
goroutine has an owner who knows how it stops, every blocking operation
can be cancelled, and shared data has exactly one guardian.

## Method

1. **Never start a goroutine without its exit story.** Who stops it
   (context cancellation, channel close, work exhaustion) and who
   waits for it (`sync.WaitGroup`, errgroup) are decided at the
   `go` statement, not later. A goroutine blocked forever on a
   channel nobody writes is the standard Go leak; watch
   `runtime.NumGoroutine()` in tests and profiles (see memory-leaks).
2. **Propagate context through every blocking call.**
   `ctx context.Context` as the first parameter, checked in loops
   (`select` on `ctx.Done()`), passed into I/O and subprocesses;
   cancellation then flows top-down through the whole call tree
   (the deadline-budget idea from timeouts-and-retries). Deriving
   with `context.WithTimeout` at each boundary keeps one slow branch
   from holding the request open.
3. **Choose channels for handoff, mutexes for state.** Channels
   excel at transferring ownership of data between stages (pipelines,
   fan-out/fan-in, work queues); `sync.Mutex` guards shared state
   accessed in place (counters, maps, caches). Using channels to
   simulate shared variables, or mutexes to build queues, produces
   the convoluted versions of both. One writer owning the data and
   others messaging it is the idiomatic middle.
4. **Close channels from the sender, size buffers from analysis.**
   Only the (single) sender closes; receivers detect via
   `v, ok := <-ch` or `range`. Unbuffered = synchronization point;
   small fixed buffers = decoupling with backpressure intact
   (see backpressure); "big buffer to fix a deadlock" hides the bug
   until production finds it. With multiple senders, coordinate
   shutdown through a done-channel or errgroup instead of closing.
5. **Use errgroup for the common fan-out shape.**
   `errgroup.WithContext` runs N tasks, cancels siblings on first
   error, waits for all, returns the error: replacing the
   WaitGroup+error-channel boilerplate most bugs live in. Bound
   parallelism with `SetLimit` rather than unbounded goroutine
   storms against downstreams.
6. **Run the race detector as a gate, not a tool of last resort.**
   `go test -race` in CI always (see concurrency-testing); it
   catches real races with near-zero false positives. Treat every
   report as a bug even when output "looks fine": racy programs
   have undefined behavior by spec. `go vet` and staticcheck flag
   the classic misuse patterns (loop-variable capture pre-1.22,
   copied mutexes).

## Boundaries

- Goroutines parallelize waiting and coordination cheaply; CPU-bound
  speedup is capped by `GOMAXPROCS`, and heavy compute may still
  belong in worker pools sized to cores (see python-concurrency for
  the same workload triage in another runtime).
- `sync/atomic` is for counters and flags with proven contention;
  reach for it after a mutex profile says so, not before (see
  concurrency-tuning).
- Panics in goroutines kill the process unless recovered inside
  that goroutine; supervisors and job runners recover-and-report at
  the top of each worker (see error-tracking).

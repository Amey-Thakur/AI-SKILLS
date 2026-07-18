---
name: startup-time
description: Cut startup latency by deferring heavy imports, precompiling ahead of time, and pruning the dependency tree that loads before first useful work. Use when CLI launch, serverless cold start, or dev-loop boot time is too slow.
---

# Startup time

Startup latency is paid every launch: on each CLI invocation, every serverless
cold start, every dev-server reload. It is dominated by loading and initializing
code the process does not need yet. Cut it by deferring what can wait,
precompiling what must run, and pruning what should not be there at all.

## Method

1. **Profile the import and init cost, do not guess.** Use `python -X
   importtime`, `node --cpu-prof` on boot, or a startup trace. Find the modules
   that cost the most milliseconds at load, before the first useful line of work
   runs.
2. **Make heavy imports lazy.** Move a slow dependency (`pandas`, TensorFlow, a
   cloud SDK) from the module top level into the function that first needs it. A
   CLI that imports everything upfront pays for subcommands it never runs.
3. **Precompile ahead of time.** Ship bytecode with `python -m compileall` or a
   warmed `__pycache__`, take a V8 snapshot, or build a GraalVM native image to
   skip JIT warmup. Ahead-of-time work trades build time for boot time.
4. **Prune the dependency tree.** Each transitive package is more code to find,
   parse, and initialize. Audit with `pipdeptree` or `npm ls`, drop packages
   pulled in for a single helper, and replace a heavyweight library with a few
   lines where you can.
5. **Defer connections and warmups past the critical path.** Opening database
   pools, fetching config over the network, or priming caches at import time
   blocks the first response. Do it lazily or in the background after the process
   reports ready.
6. **Measure cold and warm starts separately.** For serverless, a fresh container
   and a warm invocation differ by an order of magnitude. Time both and optimize
   the one that hits your p99: cold start for spiky, bursty traffic.

## Signals

- Does an import-time profile name the expensive modules, or is it a hunch?
- Does an unused subcommand avoid loading the heavy dependency?
- Is anything done at import time that could wait until first use?
- For serverless, did cold-start p99 move, not just warm latency?

## Boundaries

Steady-state throughput after warmup is cpu-optimization or concurrency-tuning;
this is the one-time cost to first useful work. Shrinking a browser's JavaScript
parse cost is bundle-size. Build-tool specifics defer to the toolchain in use.

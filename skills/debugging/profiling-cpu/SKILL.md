---
name: profiling-cpu
description: Find the code that actually burns CPU time using a sampling profiler and a flame graph instead of guesswork. Use when a program is slower than it should be and you need to locate the hot path before touching any code.
---

# Profiling CPU

Intuition about what is slow is wrong often enough that acting on it wastes
days. The bottleneck is rarely the clever algorithm you remember writing; it
is a string format in a loop or a lock nobody noticed. A profiler replaces the
guess with a measurement of where cycles go.

## Method

1. **Reach for a sampling profiler, not an instrumenting one.** Sampling
   interrupts the program hundreds of times a second and records the stack:
   `perf record -F 999 -g -- ./app` on Linux, `py-spy record -o out.svg --
   python app.py` for Python, `async-profiler` for the JVM. Instrumenting
   every call (like `cProfile`) distorts the very timings you are measuring.
2. **Profile a release build under a real workload.** Debug builds and
   toy inputs move the hot spot somewhere it will never be in production.
   Compile with optimizations on, feed the profiler the traffic or dataset
   that actually hurts, and run long enough to collect tens of thousands of
   samples so the numbers are stable.
3. **Read the flame graph by width, not by height.** Width is time: the
   widest frame at any level spent the most CPU. Height is only call depth
   and means nothing on its own. Scan the top edge of the graph, the leaf
   frames doing the actual work, and find the widest plateau.
4. **Separate self time from total time.** A function wide because its
   children are wide is not the culprit; drill into the child. A leaf that is
   wide with no children below it is burning cycles itself: that is where an
   optimization pays off. `perf report` shows this split as self vs children.
5. **Follow surprise frames into system and runtime code.** A fat
   `malloc`, `memcpy`, garbage-collection, or futex plateau names the real
   problem: allocation churn, copying, or lock contention rather than your
   arithmetic. The named syscall or runtime function tells you which fix
   applies before you read a line of your own source.
6. **Fix the widest bar, then reprofile from scratch.** Optimizing anything
   but the top item moves numbers you will not feel. After one change, capture
   a fresh graph: the hot spot has usually moved, and the old profile no
   longer describes the program.

## Litmus tests

- Can you name the single function with the largest self time, in samples?
- Did the graph come from an optimized build under representative load?
- After your change, did the widest plateau shrink or just shift elsewhere?

## Boundaries

A CPU profile explains where compute goes, not where wall-clock time goes. A
program blocked on disk, network, or a lock sits idle off-CPU and barely
appears; use off-CPU profiling or tracing for that. For allocation pressure
specifically, an allocation profiler attributes the churn more directly.

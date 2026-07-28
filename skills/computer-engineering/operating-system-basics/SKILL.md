---
name: operating-system-basics
description: Understand what the kernel does for your process, so system-level behaviour such as scheduling, file descriptors, and signals stops being mysterious. Use when debugging behaviour that application-level reasoning cannot explain.
---

# Operating system basics

Application code runs inside abstractions the kernel maintains, and when
those abstractions leak, application-level reasoning stops working. File
descriptor exhaustion, unexpected scheduling delays, and signals
arriving mid-operation all look like impossible bugs from above.

## Method

1. **Know what a system call costs.** Crossing into the kernel is orders
   of magnitude more expensive than a function call, which is why
   buffered input and output exist.
2. **Understand file descriptors as a limited resource.** Sockets and
   files consume them, leaks exhaust the limit, and the resulting errors
   name a resource most developers never think about.
3. **Know how scheduling affects your process.** The kernel decides when
   you run, so wall-clock timing includes time you were not scheduled,
   which distorts naive benchmarks.
4. **Understand signals and their constraints.** They interrupt at
   arbitrary points, and the set of operations safe inside a handler is
   very small.
5. **Distinguish process from thread boundaries.** Processes have
   isolated memory and a real failure boundary; threads share
   everything, which makes them cheaper and far more dangerous (see
   process-and-threads).
6. **Read the environment your process inherits.** Working directory,
   environment variables, resource limits, and open descriptors come
   from the parent and cause reproducible-only-in-production bugs.
7. **Use the observation tools.** Tracing system calls and inspecting
   process state answers questions that adding log lines cannot (see
   debugging).

## Boundaries

These fundamentals apply broadly and differ in detail between operating
systems, particularly around signals and process creation. Containers
add namespaces and limits that change what a process sees. Application
frameworks abstract most of this successfully until they do not.

---
name: interrupt-safe-code
description: Write ISRs that stay minimal, share data through volatile-correct handoffs, and defer real work safely. Use when writing interrupt handlers or debugging corruption that only happens sometimes.
---

# Interrupt-safe code

An interrupt can fire between any two instructions. Every shared byte
between ISR and main context is a race unless the handoff is designed;
"only happens sometimes" corruption is almost always this.

## Method

1. **Keep ISRs to a few microseconds.** Read the hardware, clear
   the flag, stash the data, set a signal, return: no loops over
   unbounded data, no floating point (context-save costs), no
   allocation, no logging, and never a blocking call. Everything
   else defers to task context (the "top half / bottom half"
   split; see rtos-task-design for the receiving side).
2. **Hand off through single-writer structures.** The canonical
   ISR-to-main pipe is a lock-free single-producer single-consumer
   ring buffer: ISR writes head, main reads tail, each index
   written by exactly one side, sized power-of-two. For scalars:
   write the value, then set a flag; reader clears flag, then
   reads (order matters: the flag is the release). Multi-word
   data needs the critical-section route instead: torn reads of
   a 32-bit value on an 8/16-bit MCU are real.
3. **Use volatile for what it is.** Every variable shared with an
   ISR (and every hardware register) is `volatile`: it forces
   the compiler to actually load/store. It does *not* provide
   atomicity or ordering between variables (see jvm-memory-model
   for the same trap at higher altitude); where the ISA reorders
   or buffers (Cortex-M DMB cases, DMA visibility), add the
   platform's barriers explicitly.
4. **Bound critical sections; prefer them rare.** Where main
   context must touch multi-word shared state: disable the
   *specific* interrupt (or use priority masking, BASEPRI-style)
   for the handful of cycles needed, saving/restoring prior
   state so nesting works; measure the worst-case masked window
   against your latency budget (a masked UART at 921600 baud
   drops bytes fast). Redesign toward the SPSC handoff whenever
   a critical section grows.
5. **Respect priority and nesting design.** Assign priorities
   from real deadlines (motor fault above telemetry), know
   which ISRs can preempt which, and keep shared-data analysis
   per priority pair; on RTOSes, only the ISR-safe API variants
   (`...FromISR`) may be called, with the deferred-wakeup
   pattern (give semaphore/queue, request context switch on
   exit; see rtos-task-design's priority-inversion notes).
6. **Verify with the ugly tests.** Stress at maximum interrupt
   rate while main context hammers the shared paths; assert
   ring-buffer invariants and overflow counters (dropped events
   must be *counted*, not silent: see
   embedded-memory-constraints' exhaustion rule); measure ISR
   duration and max latency with a scope/logic analyzer on a
   GPIO toggle (see embedded-debugging): the only honest
   profiler at this level.

## Boundaries

- This is single-core discipline; multi-core MCUs add true
  concurrency where volatile-plus-masking is insufficient:
  use the platform's spinlocks/atomics and memory model docs.
- DMA is a second "interrupt context" writing memory behind
  the compiler's back: buffers shared with DMA need the same
  volatile/barrier/cache-maintenance care (plus cache
  invalidation on cores with data cache).
- If most logic is migrating into ISRs for latency, the design
  wants a faster main loop or an RTOS with proper priorities,
  not bigger handlers (see rtos-task-design).

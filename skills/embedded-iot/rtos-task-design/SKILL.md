---
name: rtos-task-design
description: Decompose firmware into RTOS tasks with deadline-derived priorities, queue-based communication, and priority-inversion defenses. Use when structuring FreeRTOS/Zephyr-class applications or debugging missed deadlines.
---

# RTOS task design

An RTOS buys you preemptive scheduling; the design work is deciding
what deserves a task, which task must win the CPU when, and how tasks
talk without deadlocking or inverting priorities.

## Method

1. **Create tasks for rates and deadlines, not for nouns.**
   Group work by timing requirement: a 1kHz control loop task, a
   100Hz sensor task, a background comms task: not one task per
   peripheral. Each added task costs a stack (see
   embedded-memory-constraints) and context switches; most
   firmware needs 3-7 tasks, and same-rate cooperative work can
   share one.
2. **Derive priorities from deadlines.** Rate-monotonic as the
   default: shorter period = higher priority; deadline-critical
   control above telemetry above housekeeping. Verify
   schedulability roughly (utilization sum under ~70% for RMS)
   and empirically: instrument per-task CPU and worst-case
   latency (most RTOSes expose runtime stats; see
   game-performance's budget ethic on a smaller frame).
3. **Communicate by queue, own data by task.** Each task owns
   its state; others request via queues/message buffers
   (the go-concurrency share-nothing rule, firmware edition).
   ISRs feed queues from the FromISR APIs (see
   interrupt-safe-code). Blocking receives with timeouts, never
   infinite waits on external events without a recovery path:
   the timeout is where you kick watchdogs and detect stalls.
4. **Defend against priority inversion.** Mutexes with priority
   inheritance for genuinely shared resources (I2C bus, flash
   driver); better, eliminate sharing: a single owner task per
   resource serializing requests via queue turns the mutex
   into a design artifact. Never take two locks in different
   orders anywhere (see deadlock-analysis); never hold a lock
   across a blocking call.
5. **Design idle and overload behavior.** Idle task hooks run
   power management (see low-power-design's tickless idle);
   overload (queue full, deadline slip) has a stated policy per
   task: drop-with-counter for telemetry, degrade rate for
   control, reset for corruption (see backpressure,
   embedded-memory-constraints exhaustion rules). A watchdog
   task checks that every critical task checks in; a hung task
   must become a reset with a logged reason, not a silent
   zombie (see firmware-ota-updates' boot accounting).
6. **Instrument the scheduler in development.** Trace hooks
   (task switch in/out to GPIO or trace buffer: Tracealyzer/
   systemview-class tooling) make preemption visible: the bugs
   this catches (unexpected preemption mid-transaction, a task
   starving, jitter sources) are invisible in source review
   (see embedded-debugging).

## Boundaries

- Superloop-plus-interrupts remains the right architecture for
  simple devices; adopt an RTOS for genuinely independent
  timing domains, not for fashion (the monolith-first instinct,
  firmware edition).
- Hard real-time guarantees require WCET analysis and
  interrupt-latency bounds beyond this checklist; safety-
  certified domains (motor control, medical) follow their
  standards' methods (see iso-13485-adjacent processes).
- Zephyr/FreeRTOS/ThreadX differ in API and IPC costs; the
  design rules transfer, the primitives' fine print does not:
  read the specific kernel's docs for priority counts and
  queue semantics.

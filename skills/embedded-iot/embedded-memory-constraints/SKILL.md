---
name: embedded-memory-constraints
description: Fit firmware into kilobytes with static allocation, measured stack sizing, and linker-map budgeting. Use when developing on microcontrollers or debugging overflows and fragmentation on-device.
---

# Embedded memory constraints

A microcontroller gives you kilobytes, no MMU, and no swap: memory
bugs do not throw, they corrupt. The discipline is knowing where every
byte lives at link time and proving the stack fits before the field
proves it does not.

## Method

1. **Allocate statically; ban or bound the heap.** Fixed-size
   pools, static buffers, and compile-time arrays for everything
   long-lived: heap use after init is where fragmentation slowly
   kills month-uptime devices. Where dynamic-ish behavior is
   needed, fixed-block pools (same-size chunks per object type)
   fragment nothing and fail loudly on exhaustion (the
   c-memory-safety arena idea, sized for kilobytes).
2. **Read the linker map as a budget.** Per-section (.text,
   .data, .bss, per-module) sizes tracked in CI with diffs per
   PR (see bundle-size's twin): flash and RAM budgets with
   headroom targets (~15-20% for growth and stack). The map also
   catches the classics: accidental stdlib pull-ins (printf's
   float support doubling .text), debug strings shipping to
   production, duplicated const tables missing `PROGMEM`/flash
   placement.
3. **Size stacks by measurement, not vibes.** Fill stacks with a
   pattern at boot, measure high-water marks under worst-case
   load (deep call paths, nested interrupts: see
   interrupt-safe-code) per task (see rtos-task-design);
   static analysis (`-fstack-usage`, call-graph tools) bounds
   what tests miss. Enable hardware protection where available
   (MPU guard regions, stack canaries): a silent stack overflow
   into .bss is the least debuggable bug on a device (see
   embedded-debugging).
4. **Choose data representations for the platform.** Right-sized
   integer types, packed flags, indices instead of pointers
   (2 bytes vs 4/8, and serializable: see
   entity-component-system's handle logic), lookup tables in
   flash not RAM, strings as IDs resolved off-device where a
   log pipeline exists (see sensor-data-handling's batching).
   Alignment padding audit on structs (`-Wpadded` spot checks)
   recovers surprising bytes in arrays of thousands.
5. **Make exhaustion behavior explicit.** Every pool and queue
   has a stated full policy (drop-oldest for telemetry,
   reject-and-flag for commands: see backpressure's policy
   table, message-queues) and a counter observable in the field;
   out-of-memory in an embedded system must be a designed state,
   never a surprise, because there is no OOM-killer to blame.
6. **Keep debug and release honest.** Asserts and logging cost
   RAM/flash: use link-time-removable levels (see log-levels),
   but keep the *safety* checks (bounds, pool exhaustion,
   watchdog kicks) in release; a build that only asserts in the
   lab ships its bugs silently (see
   defensive-programming's release-assert stance).

## Boundaries

- Linux-class embedded (Pi-grade, with MMU) relaxes these rules
  toward ordinary systems programming (see c-memory-safety);
  this skill is for the MCU world beneath it.
- Rust-on-embedded moves several disciplines into the compiler
  (no-heap enforced by no_std, ownership: see rust-ownership)
  but stack sizing and linker budgeting remain manual.
- Ultra-low-power sleep states interact with RAM retention
  (which banks survive sleep); memory layout and power design
  are coupled decisions (see low-power-design).

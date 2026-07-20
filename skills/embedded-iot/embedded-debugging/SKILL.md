---
name: embedded-debugging
description: Debug firmware with JTAG/SWD workflows, console-free logging, and hard-fault analysis that names the faulting line. Use when a device crashes, hangs, or misbehaves only in the field.
---

# Embedded debugging

On-device bugs hide behind missing consoles, optimized builds, and
hardware timing. The toolkit: a debug probe for the lab, lightweight
trace for timing truth, and crash storage that survives reset for the
field.

## Method

1. **Wire the probe workflow first.** SWD/JTAG with an
   openocd/probe-rs/vendor-IDE stack: breakpoints, watchpoints
   (break on *data* change: the tool for "who corrupts this
   variable"), memory/peripheral-register inspection, and
   flash-and-halt cycles in seconds. Keep a debug build profile
   with -Og and asserts; but reproduce release-only bugs in
   release with map files at hand (see
   embedded-memory-constraints' linker literacy).
2. **Log without a console, cheaply.** SWO/ITM or RTT-class
   channels give printf-grade streams over the debug probe with
   microsecond overhead; deferred formatting (log IDs +
   arguments, formatted host-side: defmt-style) cuts cost
   further (see log-levels' structure, embedded edition).
   For timing questions, a GPIO toggle read by logic analyzer
   is the most honest profiler on an MCU (ISR duration, task
   timing: see interrupt-safe-code, rtos-task-design's
   tracing).
3. **Make hard faults report their origin.** A fault handler
   that captures the stacked PC/LR/registers and fault-status
   registers (CFSR on Cortex-M decodes to "bus fault at
   address X"/"usage fault: divide by zero"), stores them in
   noinit RAM, and logs after reboot: turns "it resets
   sometimes" into file:line via `addr2line` on the captured
   PC. This handler is twenty lines and pays for itself the
   first week (see stack-trace-reading's ethic, bare-metal).
4. **Treat reset causes as first-class telemetry.** Read and
   log the reset-cause register every boot (watchdog, brown-
   out, software, pin): fleets summarize it (see
   mobile-observability's crash-rate analog); a rising
   watchdog-reset rate is a hang epidemic announcing itself.
   Watchdog design: kicked from a health-checking task (never
   an ISR or a timer blindly: that guards nothing; see
   rtos-task-design's watchdog task).
5. **Bisect hardware vs firmware deliberately.** Same firmware
   on a second board (board fault?), scope the actual signals
   at the pins (is the sensor really answering? see
   sensor-data-handling's garbage-at-ADC rule), check power
   rails during the failure (brown-outs mimic software bugs:
   see low-power-design), and swap suspected components. Half
   of "firmware bugs" on new hardware are electrical; the
   scope settles arguments the debugger cannot.
6. **Build the field-diagnosis path before shipping.** Crash
   records + reset causes + a diagnostic mode uploadable over
   the normal channel (see iot-messaging, firmware-ota-updates'
   confirm telemetry); a serial/debug header that survives into
   production units (fused off only if security demands);
   and a device-side log ring in flash for the support case
   that arrives with "it stopped working Tuesday" (see
   production-debugging's mindset at device scale).

## Boundaries

- Debugger-halted timing lies: halting the core mid-protocol
  breaks every live bus transaction; timing bugs need trace
  (ITM/ETM, logic analyzer), not breakpoints.
- Optimized-out variables and reordered lines in release
  builds are the compiler doing its job; debug the release
  binary with the map and disassembly when the bug lives only
  there (see zero-cost-abstractions' inspection habit).
- Secure/locked devices (readout protection, sealed debug)
  trade debuggability for security deliberately; design the
  field-diagnosis path *before* enabling the locks, because
  after is too late.

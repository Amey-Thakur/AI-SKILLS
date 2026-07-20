---
name: low-power-design
description: Reach battery-life targets through sleep-state budgeting, duty cycling, and measured (not estimated) current draw. Use when designing battery-powered devices or hunting a power regression.
---

# Low power design

Battery life is an arithmetic problem: average current = (active
current x active fraction) + (sleep current x sleep fraction), and the
sleep term usually dominates. Design the duty cycle first, then make
sleep genuinely cheap, then measure because estimates always lie.

## Method

1. **Build the power budget spreadsheet first.** Battery capacity
   (derated for temperature and aging), target lifetime, and the
   resulting average-current ceiling; then allocate: sleep floor,
   per-wake cost (sensor read, radio transmission), wakes per
   hour. This arithmetic decides the architecture (see
   capacity-planning's spirit in microamps): a 5uA budget with a
   20mA radio means the radio runs seconds per day, which shapes
   everything (see iot-messaging's batching).
2. **Sleep as deep as state allows, wake on events.** Map the
   MCU's sleep states (stop/standby with RAM retention tradeoffs:
   see embedded-memory-constraints' retention note) and choose
   per situation; wake sources are interrupts (RTC, GPIO edge,
   comparator), never polling loops; RTOS tickless idle so the
   scheduler itself stops the tick (see rtos-task-design's idle
   hooks). The design question per feature: "what is the
   cheapest state that can notice this event".
3. **Kill the parasitic draws.** Floating GPIOs (configure every
   pin), pull-ups fighting drivers, sensors and regulators left
   enabled, debug interfaces powered in the field, LEDs
   (a single LED can dwarf your MCU budget): power-gate
   peripheral rails where hardware allows. Most "impossible"
   sleep-current numbers are one forgotten peripheral; the
   hunt-order is a checklist, not intuition.
4. **Make radio time the scarcest resource.** Transmit costs
   orders of magnitude over compute: batch readings (see
   sensor-data-handling), compress/delta-encode, prefer
   connectionless or long-interval protocols suited to the
   link (see iot-messaging's QoS and keepalive costs), and
   back off reconnect attempts exponentially: a device that
   retries a dead network every second dies in days (see
   timeouts-and-retries, translated to milliamp-seconds).
5. **Measure with real instruments across modes.** A power
   profiler (Joulescope/PPK-class) or precision shunt across
   the actual operating modes: sleep floor, wake spike shape,
   radio bursts: not a multimeter average. Automate a power
   regression test (scripted device cycle on the profiler, CI
   or nightly): power regressions arrive silently with any
   firmware change (see performance-testing's gate ethic,
   in microamps).
6. **Account for the analog realities.** Brown-out behavior at
   battery end-of-life (clean shutdown, state saved: see
   firmware-ota-updates' power-loss machine), cold-temperature
   capacity collapse, self-discharge and quiescent regulator
   draw in the total, and duty-cycle jitter so synchronized
   fleets do not all wake together (see scheduled-jobs'
   jitter).

## Boundaries

- Energy harvesting (solar, kinetic) changes the problem to
  power *management* (make progress when energy exists,
  checkpoint always); the measurement discipline transfers,
  the budget becomes stochastic.
- Wall-powered devices still care (thermals, efficiency
  standards) but the microamp obsession does not transfer;
  do not tax those designs with battery ceremony.
- Battery chemistry selection, fuel gauging, and charging are
  electrical engineering with safety implications; firmware
  consumes their outputs but the design belongs to hardware
  review.

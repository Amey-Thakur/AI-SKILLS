---
name: sensor-data-handling
description: Turn raw sensor readings into trustworthy data with correct sampling, filtering, calibration, and timestamped batching. Use when building sensor pipelines or debugging noisy, aliased, or drifting measurements.
---

# Sensor data handling

A sensor gives you a noisy, biased, drifting proxy for reality. The
pipeline's job is honesty: sample fast enough, filter with intent,
calibrate against truth, and never let timestamps or units get
ambiguous.

## Method

1. **Sample at the signal's rate, not the firmware's
   convenience.** Nyquist demands >2x the highest frequency of
   interest; below that, aliasing folds fast phenomena into
   plausible-looking slow lies (mains hum becoming a "drift").
   Anti-alias in analog or with sensor-side filtering before
   downsampling digitally; jitter in sampling intervals is
   itself noise, so sample from timers/DMA, not from "whenever
   the loop gets there" (see interrupt-safe-code's handoff for
   the ISR side, rtos-task-design for the rate task).
2. **Filter with a chosen tool, not an accumulated habit.**
   Moving average for cheap smoothing (know its lag); EMA/IIR
   for memory-light smoothing with tunable response; median
   filter for spike rejection (outliers from EMI, loose
   wires); complementary/Kalman-class fusion when combining
   sensors (IMU + magnetometer). Every filter trades latency
   for smoothness: control loops need that trade made
   explicitly (a laggy filter inside a fast loop oscillates;
   see rtos-task-design deadlines).
3. **Calibrate against reference, store per-device.** Offset
   and gain (two-point) at manufacture, stored in NVM with the
   calibration date; temperature compensation where the
   datasheet's tempco matters; field re-zeroing flows for
   drift-prone sensors (gas, load cells). Uncalibrated fleets
   produce beautiful dashboards of nonsense: per-device
   calibration is what makes cross-device comparison
   meaningful (see data-quality-checks' spirit at the source).
4. **Timestamp at acquisition, in one time base.** Stamp when
   the reading was *taken* (not when transmitted), monotonic
   locally, mapped to real time at sync points; batching and
   store-and-forward then preserve ordering and gaps (see
   clock-skew: the device clock drifts, so record sync offsets
   rather than rewriting history). Sequence numbers detect
   loss; explicit gap markers beat silently missing rows
   (see delivery-guarantees).
5. **Reduce on-device, ship what the question needs.** Raw
   1kHz vibration becomes RMS/peak/spectral bands per window;
   temperature becomes minute min/mean/max: aggregation near
   the sensor cuts radio cost 100x (see low-power-design,
   iot-messaging) while keeping the analytics honest: design
   aggregates *from the downstream question* (see
   warehouse-modeling's grain thinking), and keep a raw-burst
   diagnostic mode for the field engineer.
6. **Flag quality at the source.** Out-of-physical-range,
   stuck-at (no change beyond deadband for too long),
   rate-of-change violations, sensor self-test failures:
   attach validity flags rather than dropping or "fixing"
   silently (see data-quality-checks' quarantine rule): the
   platform can discard flagged data, but it cannot recover
   data the device judged and deleted.

## Boundaries

- Control-loop feedback filtering and telemetry filtering have
  different latency budgets; do not share one filtered value
  between them without checking both masters.
- Sensor selection, analog front-end design, and EMI layout
  decide the noise floor before firmware sees a bit; when the
  data is garbage at ADC, the fix is hardware review, not
  filtering heroics.
- ML-at-the-edge (anomaly detection on-device) rides on this
  pipeline's quality; deploy it after the calibration and
  quality-flag layers exist, not instead of them (see
  ml-baselines).

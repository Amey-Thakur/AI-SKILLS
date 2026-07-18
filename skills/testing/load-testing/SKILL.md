---
name: load-testing
description: Simulate realistic multi-user load with ramp profiles, think time, and pacing, then find where the system saturates. Use when validating capacity or headroom for a service before a launch or expected traffic spike.
---

# Load testing

A load test that fires requests as fast as a loop allows measures your load
generator, not your users. Real traffic arrives in waves, with pauses between
actions and a mix of endpoints, from clients spread across a network. Model
that shape honestly or you will size the system for a workload that never
happens and be surprised by the one that does.

## Method

1. **Model the scenario from real traffic.** Pull endpoint mix, request
   ratios, and payload sizes from production logs or access metrics. A test
   that hammers one cheap endpoint proves nothing about a homepage that fans
   out to eight services.
2. **Add think time between steps.** Insert realistic pauses, one to several
   seconds, between a user's actions. Zero think time concentrates load into
   an unnatural burst and inflates contention that real users never create.
   In k6, Locust, or Gatling this is an explicit sleep or pace setting.
3. **Ramp, do not slam.** Start at low concurrency and increase virtual users
   in stages, holding each level long enough to reach steady state. A step
   ramp shows how latency responds to load; a cold jump to full concurrency
   only shows connection-storm behavior.
4. **Run the generator off the system under test.** Drive load from separate
   machines close in the network to the target. A generator sharing CPU with
   the service competes with it and corrupts every number you collect.
5. **Watch for the saturation knee.** As you add users, throughput rises then
   flattens while latency climbs: that inflection is the capacity limit.
   Report the concurrency at the knee, not the maximum requests you managed
   to push through it.
6. **Assert on percentiles and error rate, not the mean.** Gate on p95 and
   p99 latency and the failure rate against the service level objective. An
   average of 80ms can hide a p99 of four seconds and a rising stream of 500s.
7. **Push to failure once, on purpose.** In an isolated environment, ramp
   past the knee until the system breaks and record how: queue overflow,
   timeouts, out-of-memory. Knowing the ceiling and the failure mode is worth
   more than a clean pass.

## Signals

- Does the load profile reproduce production's endpoint mix and pacing, or
  just one hot loop?
- Can you name the concurrency level where latency crossed the objective and
  the mode the system failed in beyond it?
- Are your reported numbers percentiles under sustained steady-state load,
  not averages from the ramp?

## Boundaries

Load testing sizes a system under concurrent traffic; single-function timing
belongs to performance-testing. It measures behavior under load, not behavior
under failure: deliberately killing instances or injecting latency is
chaos-testing. Capacity targets and cost ceilings are product and budget
decisions this test informs but does not set.

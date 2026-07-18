---
name: chaos-testing
description: Inject failures like killed instances and network latency on purpose to verify a system degrades gracefully instead of collapsing. Use when validating the resilience of a distributed system that claims to tolerate faults.
---

# Chaos testing

Every distributed system carries failure-handling code that has never
actually run. A retry that deadlocks, a timeout set to infinity, a fallback
that also depends on the dead service: these hide until real failure finds
them at 3 a.m. Chaos testing triggers the failure deliberately, under
supervision, while you watch whether the system holds.

## Method

1. **State a steady-state hypothesis first.** Define the normal you expect to
   survive: "checkout success rate stays above 99% and p99 latency under
   800ms." Without a measured baseline you cannot tell degradation from
   collapse when you break something.
2. **Start in staging with a small blast radius.** Run the first experiments
   away from customers, scoped to one service or one availability zone. The
   goal is to learn the failure mode, not to cause an incident proving it
   exists.
3. **Inject one failure at a time.** Kill a pod, add 200ms of latency, drop a
   percentage of packets, fill a disk, or blackhole a dependency. Tools like
   Chaos Mesh, Gremlin, toxiproxy, and `tc netem` scope a single fault so you
   can attribute the result to it.
4. **Verify graceful degradation, not mere survival.** Confirm the system
   sheds load, serves a fallback, or fails fast with a clear error, and that
   it recovers when the fault clears. A request that hangs for the full
   timeout is a failure even if nothing crashed.
5. **Keep an abort switch and stop conditions.** Define in advance the metric
   that halts the experiment, such as error rate past 5%, and wire a
   one-command rollback. An experiment you cannot stop instantly does not
   belong near production.
6. **Automate the experiment and repeat it.** Encode the fault and the
   hypothesis check as code in CI or a scheduled run. Resilience regresses;
   a fix that held last quarter breaks when someone adds a new synchronous
   call, and only a repeated experiment catches it.
7. **Graduate to production game days once staging is boring.** When staging
   experiments stop surprising you, run a scheduled, staffed exercise in
   production with the team watching. Real topology and real traffic expose
   faults no staging clone reproduces.

## Checks

- Is there a measured steady state to compare against, or only a hope that
  things are fine?
- Does each experiment change exactly one variable so you can attribute the
  outcome?
- Can any observer halt the experiment and restore normal in a single action?

## Boundaries

Chaos testing validates resilience to faults, not throughput: use
load-testing to find the saturation point and performance-testing for raw
speed. Run it only where you have observability and a rollback; injecting
failure into a system you cannot watch or revert is sabotage, not testing.

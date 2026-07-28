---
name: chaos-engineering
description: Deliberately inject failures to verify that resilience mechanisms work before a real incident tests them. Use when a system has failover, retries, or redundancy that has never actually been exercised.
---

# Chaos engineering

Every resilience mechanism is untested until it has run under failure.
Chaos engineering exercises them on purpose, at a time you choose, with
people watching, which is far cheaper than discovering they do not work
at three in the morning.

## Method

1. **Form a hypothesis first.** State what should happen when this
   dependency fails, since the experiment tests a prediction rather than
   causing chaos.
2. **Start small and in a lower environment.** Build confidence in the
   process before touching production, and keep the first blast radius
   tiny.
3. **Have a stop button.** An immediate way to end the experiment,
   tested before starting.
4. **Run during working hours with people watching.** The point is
   learning with the team present, not proving resilience at night.
5. **Inject realistic failures.** Latency, partial failure, and
   dependency errors are far more common than clean instance loss (see
   integration-resilience).
6. **Measure user impact, not just system behaviour.** The question is
   whether users noticed, which is what the resilience was for.
7. **Fix what you find and re-run.** An experiment that finds a gap and
   changes nothing was theatre (see incident-postmortem).

## Boundaries

Chaos experiments cause real failures and need organisational consent.
They test known failure modes and cannot anticipate novel ones. Systems
without basic observability should build that first, since an experiment
you cannot observe teaches nothing (see observability).

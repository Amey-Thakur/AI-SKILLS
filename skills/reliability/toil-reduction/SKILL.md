---
name: toil-reduction
description: Identify repetitive manual operational work and eliminate it, so capacity goes to improvement rather than maintenance. Use when an on-call rotation is consumed by routine intervention.
---

# Toil reduction

Toil is manual, repetitive work that scales with the system and produces
no lasting value. Left alone it grows until the team has no capacity for
anything else, and it is invisible because everyone is busy.

## Method

1. **Measure it before attacking it.** Time spent on repeated manual
   tasks per week, which is usually larger than anyone estimates (see
   developer-productivity-metrics).
2. **Rank by frequency times duration.** The daily five-minute task
   costs more than the quarterly afternoon and is easier to automate.
3. **Ask why the intervention is needed.** Restarting a service weekly
   is a defect to fix rather than a task to automate (see
   root-cause-analysis).
4. **Automate the response after understanding the cause.** Automating a
   workaround entrenches the problem and removes the pressure to fix it.
5. **Cap toil as a share of time.** An explicit ceiling forces the trade
   rather than letting operational work consume everything.
6. **Make self-service the answer to request toil.** Requests handled
   manually are a platform gap (see self-service-infrastructure).
7. **Track it after automating.** Toil returns as systems change, so the
   measurement is ongoing rather than a project.

## Boundaries

Not all manual work is toil; judgement-requiring work is the job.
Automation has its own maintenance cost that must be lower than the toil
it removes. Reducing toil needs protected time, which competes with
feature delivery.

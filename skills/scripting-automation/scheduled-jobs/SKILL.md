---
name: scheduled-jobs
description: Run cron and timer jobs with overlap locks, jitter, missed-run policies, and monitoring for silent absence. Use when scheduling recurring automation or debugging jobs that overlap, pile up, or quietly stop.
---

# Scheduled jobs

Cron fires on time and cares about nothing else: not whether the last
run finished, not whether the machine was asleep, not whether the job
succeeded, not whether anyone noticed it stopped. Every one of those
gaps is yours to close.

## Method

1. **Lock against overlap, always.** A slow run meeting the next
   trigger is the classic pileup: wrap invocations in
   `flock -n /run/job.lock` (skip if held) or the scheduler's
   native no-concurrency setting (systemd units serialize;
   Kubernetes CronJob `concurrencyPolicy: Forbid`). Decide
   skip-vs-queue explicitly; skipping is usually right for
   periodic syncs, queueing for must-not-miss ledgers (see
   distributed-locks when the job runs on a fleet).
2. **Make every run rerunnable.** The job processes "work as of
   its logical slot" idempotently (see script-idempotency,
   data-pipeline-design's logical-date rule): then retries,
   overlaps-that-slipped, and manual reruns are safe. A job that
   appends blindly or mutates without keys turns every scheduling
   hiccup into data corruption.
3. **Add jitter to fleet schedules.** A hundred machines firing at
   `0 * * * *` is a self-inflicted thundering herd on your API or
   database: `sleep $((RANDOM % 300))` at job start, or
   `RandomizedDelaySec=` in systemd timers (see backpressure,
   timeouts-and-retries for what the herd does downstream).
   Stagger business-hours-sensitive jobs deliberately instead of
   defaulting everything to midnight.
4. **Choose the missed-run policy.** Machine off or asleep at
   trigger time: plain cron silently skips. Systemd timers with
   `Persistent=true` run once on wake for catch-up; Kubernetes
   CronJobs have `startingDeadlineSeconds`. For jobs where each
   slot matters (billing, reports), the job itself should detect
   and process the gap (compare last-processed slot to now)
   rather than trusting the scheduler's memory.
5. **Alert on absence, not just failure.** Failing jobs email
   nobody reads; *missing* jobs say nothing at all. Dead-man's
   switch: each successful run pings a heartbeat monitor that
   alerts when the ping stops (healthchecks.io-class, or a
   metric with an absence alert: see
   infrastructure-monitoring). Capture output to logs with
   timestamps (cron's default mail is where errors go to die;
   see log-analysis), and exit codes to metrics.
6. **Put the schedule in code with the job's environment
   explicit.** Cron entries/systemd units/CronJob manifests in
   the repo, deployed like config (see config-management,
   infrastructure-as-code); remember cron's environment is
   nearly empty (no PATH you expect, no .bashrc): scripts set
   their own environment and use absolute paths (see
   environment-config). Timezone pinned explicitly: DST
   transitions skip and double 1-2am slots yearly, so schedule
   critical jobs outside them or in UTC.

## Boundaries

- Cron is a trigger, not a job system: no retries, no
  dependencies, no backfill. Chains of dependent crons with
  sleep-based ordering belong in an orchestrator (see
  pipeline-orchestration) or a queue with workers (see
  background-jobs).
- Sub-minute scheduling and event-driven triggers are not cron
  problems; use a loop in a supervised service or real events
  (see event-driven-architecture).
- One machine's crontab is a single point of failure with no
  audit trail; fleet-critical schedules run from HA schedulers
  with leader election (see leader-election).

---
name: production-debugging
description: Debug a live system without making the incident worse by staying read-only first, gating changes behind flags, and testing on mirrored traffic. Use when a bug only manifests in production and you must investigate against real users and real data.
---

# Production debugging

Production is a running system with real users, and every debugging action
is also a change to that system. The instinct that works locally, edit and
re-run, is the instinct that turns an incident into an outage here. The
discipline is to learn as much as possible while changing as little as
possible, escalating from pure observation to reversible action to writes.

## Method

1. **Read the signals before touching anything.** Pull the logs, traces, and
   dashboards for the failing requests: error rate, latency percentiles, and
   the correlation id of a known-bad request. Most production causes are
   visible in existing telemetry, and reading is the only zero-risk step.
   Exhaust it first.
2. **Reproduce off the hot path.** Replay the failing request against a
   staging replica, a shadow environment, or a mirror of production traffic
   (Envoy/Istio traffic mirroring, `tcpreplay`, GoReplay) so your probing
   hits a copy, not live users. If you must touch production, use read
   replicas and read-only queries with a `LIMIT` and a statement timeout.
3. **Change behavior behind a flag, never behind a deploy.** Gate any fix or
   diagnostic branch behind a feature flag you can flip for one internal
   user, then a small percentage, then everyone. A flag rolls back in
   seconds; a deploy rolls back in minutes and drags unrelated changes with
   it. Test the fix on your own account first.
4. **Add targeted observability instead of guessing.** When the existing
   signals fall short, add a scoped log line or span for the specific code
   path and ship it, or attach a sampling profiler (`py-spy`, `async-
   profiler`, `perf`) that reads a live process without stopping it. Never
   attach a breakpoint debugger to a serving instance: it freezes every
   request on that node.
5. **Isolate the blast radius before you write.** If a write is truly
   required, scope it to one tenant or one record, wrap it in a transaction
   you can roll back, and confirm the row count before commit. Take a backup
   or snapshot first. Announce the change in the incident channel so no one
   else moves the same ground.
6. **Verify with metrics, then remove the scaffolding.** Confirm the fix by
   the same dashboards that showed the fault, not by one lucky manual
   request. Then roll the flag to 100, delete the temporary logging, and
   record the timeline and root cause for the postmortem.

## Checks

- Did every step so far read state, or did some step change it? Know which.
- Can the last change you made be reverted in seconds, without a deploy?
- Is the fix confirmed by a falling error-rate curve, not a single retry?

## Boundaries

This is investigation discipline, not incident command; declaring severity,
paging owners, and coordinating comms follow the team's incident-response
runbook. Data-fix scripts that touch many rows, schema changes, and anything
irreversible need review and a rollback plan, not a live console session.

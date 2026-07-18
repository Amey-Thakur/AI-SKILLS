---
name: production-readiness-review
description: Run a production readiness review that checks SLOs, runbooks, capacity, and dependencies before an on-call team agrees to own a service. Use when a service is about to be onboarded to a support rotation or handed from its builders to operators.
---

# Production readiness review

The PRR is Google SRE's gate for deciding whether a service is fit to be operated
by people who did not build it. It exists because the failure modes that page an
engineer at 3 a.m. are rarely visible from the code: they live in missing alerts,
untested recovery, and a dependency the team forgot it had. Skip the PRR and the
on-call team inherits every one of those surprises, one incident at a time.

## Method

1. **Define SLOs and the error budget before anything else.** Write the service
   level objectives as measurable indicators: request success rate, latency at
   the 99th percentile, freshness. Without an agreed budget there is no line
   between healthy and broken, and every alert becomes a judgment call at the
   worst possible hour.
2. **Demand runbooks for each alert, not a wiki of prose.** Every page a
   responder can receive needs a runbook with symptoms, diagnosis steps, and the
   exact remediation. A runbook that says "investigate the issue" is a blank page
   with a title; test it by having someone off the team follow it cold.
3. **Audit every dependency and its failure behavior.** List the databases,
   queues, and upstream services this one calls, each one's own SLO, and what
   happens when it is slow or down. Confirm timeouts, retries with backoff, and
   circuit breakers exist, so a dependency's bad day does not become a full
   outage here.
4. **Prove capacity against real load with headroom.** Show load-test numbers, the
   current utilization, the autoscaling limits, and the quota ceilings. State the
   traffic multiple the service survives before it falls over, and confirm the
   plan for the next growth step rather than assuming linear scaling holds.
5. **Verify observability covers the SLOs.** Dashboards for the golden signals,
   alerts wired to the error budget, structured logs, and distributed tracing
   across the request path. If an SLO can be violated without a page firing, the
   monitoring is decorative.
6. **Rehearse failure and recovery, then agree on ownership.** Run a rollback, a
   failover, and a data-restore drill, and record the time each took. Close the
   PRR with the on-call team explicitly accepting the service, or listing the
   blockers that must clear before they will.

## Checks

- Can a responder who has never seen this service resolve its top alert from the
  runbook alone?
- Does every hard dependency have a defined behavior for when it fails, not just
  for when it works?
- Has the recovery path been drilled and timed, or only diagrammed?

## Boundaries

A PRR judges whether a service can be operated, not whether one release should
ship: the go decision for a specific launch belongs to the launch-review skill.
Scale the depth to the risk, follow your SRE org's PRR template where one exists,
and route the incidents it fails to prevent into a postmortem.

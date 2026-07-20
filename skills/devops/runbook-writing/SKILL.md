---
name: runbook-writing
description: Write runbooks with executable steps, decision points, and per-step verification that a stressed responder can follow. Use when documenting operational procedures or reducing 3am guesswork.
---

# Runbook writing

A runbook is written for the worst version of your reader: half-awake,
paged, under pressure, possibly not the person who wrote it. It
succeeds when they can execute it without understanding the whole
system, and it is honest about where judgment is still required.

## Method

1. **Open with trigger, impact, and severity.** When this
   runbook applies (the alert or symptom that led here),
   what is affected, and how urgent: so a responder confirms
   they are in the right place in ten seconds (see
   alerting-design: the alert links here). A runbook you
   have to read fully to know if it applies is a document,
   not a runbook.
2. **Write steps as copy-pasteable actions.** Exact commands
   (not "restart the service" but the command, with
   placeholders clearly marked), expected output, and what
   each does; link to dashboards and consoles directly.
   Prose that describes what to do forces translation the
   stressed reader gets wrong; executable steps do not.
3. **Verify after every consequential step.** "Run X;
   confirm Y shows Z before continuing": so a wrong turn is
   caught immediately, not three steps later (see
   script-idempotency's check-then-act ethic, human
   edition). Steps without verification let small errors
   compound into a second incident.
4. **Make decision points explicit branches.** "If the
   queue depth is still rising, go to section B; if it is
   draining, monitor and stop": name the observable that
   decides, not "use judgment". Where judgment truly is
   required, say so and give the factors (see
   incident-commander-role for escalation decisions):
   false certainty is worse than honest ambiguity.
5. **Flag the dangerous and the irreversible.** Destructive
   steps (data deletion, traffic cutover) get a warning,
   the blast radius, and a confirmation gate (see
   automation-guardrails); include the rollback for each
   risky action (see rollback-strategy). The runbook that
   walks someone off a cliff at step 7 is worse than none.
6. **Keep runbooks alive.** Test them (in game-days, and
   the first time on the real incident, fix what was
   wrong: see chaos-gameday); date them and assign an
   owner; every incident postmortem checks whether the
   runbook helped and updates it (see incident-postmortem).
   A stale runbook confidently gives wrong instructions,
   which is the most dangerous failure mode of all.

## Boundaries

- Runbooks encode known, repeatable responses; novel
  incidents need the runbook's diagnostic starting points
  plus human reasoning (see production-debugging,
  scientific-debugging): do not pretend a runbook covers
  the unforeseen.
- A frequently-run runbook is a candidate for automation
  (auto-remediation): but automate only what is safe and
  well-understood, keeping the manual runbook as the
  fallback (see automation-guardrails).
- Runbooks live where they are reachable during an
  incident (not only in a wiki that might be down);
  linked from alerts and mirrored somewhere resilient
  (see cloud-disaster-recovery's reachability rule).

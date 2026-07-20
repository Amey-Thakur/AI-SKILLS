---
name: blue-green-deployments
description: Deploy with two swappable environments for instant cutover and rollback, handling database compatibility. Use when zero-downtime releases matter or designing a low-risk deploy mechanism.
---

# Blue-green deployments

Two identical production environments, one live: deploy to the idle
one, verify it in isolation, then switch traffic in one move. The
promise is instant rollback (switch back); the catch is that the
database is shared and cannot be duplicated, so schema changes need
their own discipline.

## Method

1. **Stand up two full environments behind one switch.**
   Blue serves; green is idle-but-warm; the switch is a load
   balancer target, DNS weight, or router config (see
   cloud-networking). Both run the same infrastructure from
   the same IaC (see infrastructure-as-code): drift between
   them is where "worked in green, broke in blue" lives.
2. **Verify green in isolation before the switch.** Smoke
   tests, health checks (see health-checks), and a canary
   sample of real traffic (or synthetic) against green while
   blue still serves everyone: the switch happens only on
   evidence, and its criteria are numeric (see
   canary-analysis). Green that only got "it deployed" is
   untested.
3. **Make the database backward-compatible, always.** The
   shared database must satisfy both versions across the
   switch and the rollback window: use expand-contract
   migrations (add columns/tables first, deploy code that
   writes both, backfill, switch, then contract later: see
   database-migrations). A migration that breaks the old
   version turns your instant rollback into a data
   corruption incident.
4. **Drain and switch cleanly.** Move traffic (all at once,
   or ramped via weights), let blue drain in-flight requests
   (see graceful-shutdown), keep blue running untouched for
   the rollback window. Sticky sessions and in-flight
   long-running work need a plan: externalize session state
   so the switch does not log users out.
5. **Roll back by switching back, within the window.** If
   green misbehaves, flip to blue in seconds: the entire
   point. This works only while blue is still running the
   old code AND the database still supports it (step 3);
   set the window explicitly and hold blue until green is
   confirmed healthy on real traffic and metrics (see
   deployment-pipelines, rollback-strategy for the
   fix-forward-vs-rollback call).
6. **Automate the whole dance.** The deploy pipeline builds
   green, verifies, switches, and holds blue on a timer,
   with a one-command rollback (see runbook-writing):
   manual blue-green is error-prone theater. Track which
   environment is live somewhere the whole team can see.

## Boundaries

- Blue-green doubles environment cost during deploys;
  rolling deploys or canary (see canary-analysis) achieve
  zero-downtime at lower cost for stateless services, and
  are often the better default. Blue-green shines when you
  want instant whole-system cutover and rollback.
- Stateful services (databases themselves, stateful
  streams) do not blue-green; their upgrades are careful
  in-place operations (see kubernetes-workloads
  StatefulSets).
- The technique manages release risk, not code quality;
  a bug that passes green's verification ships to
  everyone at once (unlike canary's gradual exposure).

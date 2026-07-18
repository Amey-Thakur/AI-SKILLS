---
name: smoke-tests
description: Define the short, stable suite of critical-path checks that runs after every deploy and blocks promotion the instant it fails. Use when a deploy has no fast gate and breakage is found by users instead of the pipeline.
---

# Smoke tests

A smoke suite answers one question fast: is this build alive enough to serve
users? It is not comprehensive and should not try to be. Its job is to catch
the deploy that broke login, took down the homepage, or lost the database
connection, within a few minutes of shipping, so promotion halts before the
damage reaches everyone. When smoke tests grow into a full regression suite,
they stop gating deploys because nobody waits for them.

## Method

1. **Pick the handful of paths that mean "the app works."** Can a user log in,
   can they complete the one core action, does the homepage return 200, is the
   database reachable. Five to ten checks, chosen because their failure is an
   outage, not because they are easy to write.
2. **Time-box the whole suite to five minutes.** It runs on every deploy, so it
   must finish before anyone reasonably waits. If it creeps past the budget,
   cut the least critical check rather than adding parallelism forever.
3. **Run it against the deployed environment, not a mock.** Point the suite at
   the real, just-deployed instance: hit its health endpoint and drive a few
   genuine transactions through it. The point is to prove this build in this
   environment came up correctly.
4. **Fail loud and block promotion on the first red.** A smoke failure stops
   the rollout or triggers rollback immediately, with no "known flaky, proceed
   anyway." The gate only means something if a failure actually holds the line.
5. **Assert on user-visible outcomes and keep every step stable.** Check that
   the confirmation appears and the status is 200, not that an internal counter
   moved. Zero tolerance for a flaky step here: a smoke test that cries wolf
   gets ignored, which defeats the gate.
6. **Layer smoke checks per stage.** A build smoke (does it start, do health
   checks pass) and a post-deploy smoke (do core journeys work in the live
   environment) catch different failures at the cheapest possible point.

## Litmus tests

- Does the full suite finish inside the five-minute budget?
- Would every check's failure genuinely warrant blocking or rolling back the
  deploy?
- Is the suite free of any step known to flake?

## Boundaries

Smoke tests are a thin, fast gate, deliberately shallow. Deep coverage of
features belongs to integration-testing and unit tests, whole journeys to
e2e-testing, and verification under live traffic to testing-in-production.
Deciding which paths count as critical is a product call: confirm the list with
whoever owns the deploy.

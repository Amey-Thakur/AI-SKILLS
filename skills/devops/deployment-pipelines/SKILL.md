---
name: deployment-pipelines
description: Design deploy pipelines with staged gates, environment promotion, and speed budgets that keep releases safe and frequent. Use when building a CD pipeline or fixing slow, flaky, or unsafe deploys.
---

# Deployment pipelines

A pipeline turns a merge into a production release through a series of
gates, each cheaper to fail than the next stage. The design goals are
in tension and both mandatory: safe enough to deploy without fear,
fast enough to deploy often.

## Method

1. **Build once, promote the same artifact.** The pipeline
   builds one immutable artifact (see artifact-versioning)
   and promotes that exact thing through stages: never
   rebuilds per environment. Promotion is a reference change
   (see gitops-workflow), gated by the prior stage passing.
2. **Order gates cheapest-and-fastest first.** Lint and
   unit tests (seconds: see test-speed), then integration
   tests, then build, then staging deploy with smoke tests,
   then production with canary (see canary-analysis):
   fail-fast so a typo is caught in 30 seconds, not 30
   minutes into a full suite (see testing-strategy's
   pyramid). Each gate is a real quality bar, not a
   checkbox.
3. **Promote through environments that mean something.**
   Each environment tests what the last could not
   (integration, then production-like load, then real
   traffic via canary); staging must resemble production
   in the ways that matter (see test-environment-parity)
   or its green light lies. Skip environments deliberately
   for low-risk changes (path-filtered pipelines: docs
   deploys need no full suite), not by accident.
4. **Gate production on evidence, deploy progressively.**
   Automated smoke tests plus health checks (see
   health-checks), then canary or blue-green (see
   canary-analysis, blue-green-deployments) with numeric
   halt criteria and automatic rollback on breach (see
   rollback-strategy). The pipeline holds the previous
   version ready; a deploy that cannot roll back is not
   done being designed.
5. **Budget pipeline speed and defend it.** A slow pipeline
   batches changes (bigger, riskier deploys) and starves
   deploy frequency: set a target (commit-to-production
   under an hour is a common bar), parallelize stages,
   cache dependencies and layers (see
   docker-image-optimization), and treat pipeline
   regressions as bugs. Flaky gates are worse than slow
   ones: they train teams to re-run until green, defeating
   the gate (see flaky-test-diagnosis).
6. **Make the pipeline itself versioned and observable.**
   Pipeline definitions in the repo, reviewed (see
   docs-as-code, gitops-workflow); dashboards for deploy
   frequency, lead time, change-failure rate, and
   time-to-restore (the DORA metrics: the honest measure
   of delivery health); every deploy marked in monitoring
   so incidents correlate to changes (see
   infrastructure-monitoring).

## Boundaries

- Continuous deployment (every green merge to production)
  requires strong automated gates and progressive rollout;
  continuous delivery (auto to staging, manual production
  gate) is the safer default until the test and canary
  confidence is earned (see testing-strategy).
- Database and stateful changes run through the pipeline
  with their own forward-only, decoupled discipline (see
  database-migrations, rollback-strategy): do not bundle
  schema changes into the code-deploy gate.
- Pipeline security is real surface: it holds production
  credentials and can deploy anything (see
  supply-chain-defense, least-privilege); a compromised
  pipeline is a compromised production.

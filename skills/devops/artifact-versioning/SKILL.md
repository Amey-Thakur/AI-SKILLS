---
name: artifact-versioning
description: Build immutable, provenance-tracked artifacts promoted unchanged through environments. Use when designing a build pipeline or fixing "works in staging, breaks in prod" from rebuilt binaries.
---

# Artifact versioning

Build once, promote the same bytes everywhere. The moment an artifact
is rebuilt per environment, staging and production are testing
different things, and "works in staging" stops meaning anything.
Immutability and provenance are the whole discipline.

## Method

1. **Build the deployable artifact exactly once.** One CI
   build produces the container image, binary, or package;
   that identical artifact flows dev to staging to
   production (see deployment-pipelines). Rebuilding per
   stage reintroduces dependency drift, timestamp
   nondeterminism, and "latest"-tag surprises: the bugs
   promotion is supposed to catch upstream.
2. **Make artifacts immutable and content-addressed.** Tag
   by content digest (image SHA) or immutable version, never
   a moving tag (`latest`, `stable` point at whatever built
   last: a deploy-time lottery). Deploy by digest so what
   ran yesterday can run today byte-identical: this is what
   makes rollback a redeploy, not a rebuild (see
   rollback-strategy).
3. **Version meaningfully and traceably.** Semantic version
   or build number that maps back to the exact commit
   (embed the git SHA in the artifact and expose it at
   runtime: `/version` endpoint, `--version`): so a
   production incident traces to source in one lookup (see
   observability's deploy markers). Tags are cheap; the
   commit-to-artifact link is the load-bearing metadata.
4. **Attach provenance and a bill of materials.** Record how
   it was built (source commit, build environment, inputs)
   and what is inside (dependency SBOM: see sbom-management,
   supply-chain-defense); sign artifacts so consumers verify
   origin (see crypto-usage). Provenance is what answers
   "is this the code we reviewed" during a supply-chain
   scare.
5. **Promote by reference, gate by policy.** Promotion is
   pointing an environment at an already-built digest after
   it passed the prior stage's gates (tests, scans,
   approvals: see deployment-pipelines, gitops-workflow):
   not a new build. A promotion that triggers a rebuild is
   not a promotion.
6. **Retain and clean by policy.** Keep artifacts long
   enough to roll back to any recent release and to
   reproduce old incidents; expire the rest on a schedule
   (registries fill fast and cost real money: see
   cloud-cost-optimization, data-retention). Never delete
   an artifact a running environment still references:
   track deployments-to-artifacts.

## Boundaries

- Reproducible builds (bit-identical from source) are a
  stronger guarantee than immutable artifacts and matter
  for high-assurance supply chains; pursue them when the
  threat model justifies the effort (see
  supply-chain-defense).
- Configuration is not baked into the artifact (that
  would require a rebuild per environment: the anti-
  pattern); config is injected at deploy (see
  config-management), and the artifact stays environment-
  agnostic.
- Interpreted-language deploys still have an artifact (the
  locked dependency set + code at a commit); "we just
  deploy from git" without a lockfile is rebuilding
  implicitly, with the same drift risk.

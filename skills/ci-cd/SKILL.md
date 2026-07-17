---
name: ci-cd
description: Build CI/CD pipelines that are fast, trustworthy, and safe to deploy from. Use when creating or fixing continuous integration, delivery workflows, or release automation.
---

# CI/CD

A pipeline earns its keep with two properties: red means broken, and green
means shippable. Everything else is optimization of those two promises.

## Method

1. **Gate on what defines broken.** The blocking path runs exactly the
   checks the team treats as law: build, tests, lint, type checks, and the
   security scans that block by policy. Anything advisory runs non-blocking;
   a required check people routinely override teaches everyone to override.
2. **Order for fast failure.** Cheap and most-likely-to-fail first: lint
   and types in seconds, unit tests next, integration and end-to-end last
   and parallelized. A pipeline that reveals the lint error after a
   twenty-minute build wastes twenty minutes times everyone.
3. **Make it reproducible.** Pinned tool versions, locked dependencies,
   clean-checkout assumptions, no reliance on state a previous run left
   behind. "Works in CI, fails locally" and its mirror both mean the
   pipeline lies; treat that as an incident, not a quirk.
4. **Kill flakiness, never mute it.** A test that fails five percent of
   the time either gets fixed or quarantined into a visible non-blocking
   lane the same day. Auto-retry as a policy converts real races into
   shipped bugs.
5. **Cache with correct keys** (lockfile hash, not branch name), and let
   caches die rather than serve stale artifacts; a wrong cache is far more
   expensive than a slow build.
6. **Deploys are gradual and reversible.** Deploy the exact artifact that
   passed, not a rebuild. Stage, then a small slice of production, watched
   by the health signals that matter, then the rest. Rollback is a tested
   one-step action, not a document; if rolling back takes a migration, the
   migration strategy is expand-and-contract so old and new code both run.
7. **Secrets live in the platform's secret store,** scoped to the jobs
   that need them, never echoed in logs, and pull requests from forks
   never see them.

## Litmus tests

- Can a new contributor get a trustworthy green within minutes of pushing?
- Has the rollback actually been executed recently, on purpose?
- Does anything blocking fail for reasons unrelated to the change?
- Could you rebuild last month's release from its tag alone?

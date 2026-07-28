---
name: build-system-design
description: Design builds that are fast, reproducible, and cacheable, so developers wait less and CI costs less. Use when builds are slow, flaky, or produce different results locally and in CI.
---

# Build system design

Build time is paid by every developer on every change, which makes it
one of the highest-leverage things to fix. Reproducibility matters
equally, since a build that differs between machines makes every failure
ambiguous.

## Method

1. **Make builds hermetic.** Declared inputs and pinned tools, so the
   same source produces the same output anywhere (see
   compilers-and-toolchains).
2. **Cache aggressively with correct keys.** A key including all real
   inputs is what makes caching safe; a loose key serves stale artefacts
   silently (see github-actions-workflows).
3. **Build only what changed.** Incremental and dependency-aware builds
   avoid rebuilding the world for a one-line change (see
   monorepo-workspaces).
4. **Parallelise independent work.** Most build graphs have substantial
   parallelism that sequential scripts waste.
5. **Fail fast on cheap checks.** Ordering quick checks before slow ones
   returns most failures in seconds (see continuous-integration).
6. **Keep local and CI builds identical.** Divergence produces the works
   on my machine class of problem, which is expensive to diagnose.
7. **Measure and budget build time.** A tracked number with a threshold
   is what prevents gradual decay into a ten-minute build.

## Boundaries

Build optimisation has diminishing returns and competes with feature
work. Sophisticated build systems have their own learning curve and
maintenance. Caching bugs produce confusing failures that are worse than
slow builds.

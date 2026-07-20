---
name: monorepo-vs-polyrepo
description: Decide between one repository and many by tooling readiness, coupling, and team autonomy, and plan the migration. Use when structuring repositories for multiple projects or reconsidering a painful split.
---

# Monorepo vs polyrepo

One repo for everything or one per project: the decision trades atomic
cross-project changes and shared tooling (monorepo) against
independent versioning and lightweight per-project setup (polyrepo).
The right answer depends more on your tooling and coupling than on
which giant company does which.

## Method

1. **Decide by coupling and change patterns.** Code that
   changes together (shared libraries, tightly coupled
   services, a product and its SDK) benefits from a
   monorepo's atomic cross-cutting commits (change the
   library and all callers in one reviewed PR: see
   coupling-analysis). Genuinely independent projects with
   separate lifecycles fit polyrepo. Map your actual
   change patterns before choosing.
2. **Weigh the monorepo's costs against your tooling.** A
   monorepo needs: build tooling that builds only what
   changed (affected-targets: Bazel/Nx/Turborepo-class),
   CI that does the same (or CI time balloons), code
   ownership within one repo (see code-owners), and scale
   handling as history and checkout grow. Without that
   tooling, a monorepo becomes slow CI and merge
   contention: the tooling is the price of entry, not
   optional.
3. **Weigh the polyrepo's costs against your coordination.**
   Polyrepo needs: dependency/version management across
   repos (a shared library change is now N coordinated
   PRs and releases: see api-versioning,
   dependency-management), consistent tooling replicated
   or templated, and cross-repo change discipline. The
   cost is coordination overhead that grows with how
   coupled the projects secretly are.
4. **Match to team autonomy honestly.** Polyrepo gives
   teams clean ownership boundaries and independent
   release cadence (see branch-strategy); monorepo gives
   shared visibility and standards but needs ownership
   *within* the repo enforced by tooling. Conway's law
   applies: fighting your org structure with your repo
   structure loses.
5. **Do not confuse repo structure with architecture.** A
   monorepo can hold cleanly separated services (repo
   layout is not coupling: enforce boundaries with build
   rules: see module-boundaries); a polyrepo can hide a
   distributed monolith (separate repos, lockstep deploys).
   The repo decision and the service-boundary decision
   (see microservices-boundaries, monolith-first) are
   independent; decide them separately.
6. **Plan migrations as real projects.** Splitting a
   monorepo or merging polyrepos touches history, CI,
   tooling, and every developer's workflow: preserve
   history where it matters (`git filter-repo`), migrate
   incrementally, and communicate loudly (see
   cloud-migration's rehearsal ethic applied to repos).
   Repo migrations are disruptive; do them for a real
   reason, not a preference.

## Boundaries

- There is no universally right answer; successful
  companies run both at scale. The decision is
  contextual (tooling maturity, coupling, team
  structure), and re-evaluating it is legitimate as
  those change.
- Monorepo does not mean monolith and polyrepo does not
  mean microservices; these are orthogonal axes people
  routinely conflate.
- The tooling requirement for monorepos is real and
  ongoing (build graph, CI affected-targets, scale):
  a monorepo without it degrades steadily, so budget
  the platform investment or choose polyrepo.

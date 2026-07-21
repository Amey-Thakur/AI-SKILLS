---
name: monorepo-workspaces
description: Run a JavaScript/TypeScript monorepo with workspaces, task orchestration, and internal package versioning that scales. Use when managing multiple packages in one repo or when a growing monorepo's builds and installs get slow.
---

# Monorepo workspaces

A monorepo shares code and coordinates changes across packages in one
repo. The tooling is mature, but the two things that decide whether it
scales or crawls are task orchestration (not rebuilding everything) and
clear internal boundaries.

## Method

1. **Pick the package manager's workspaces plus an orchestrator.**
   pnpm workspaces (the efficient default: content-addressed store, strict
   by design) or npm/yarn workspaces, plus a task runner (Turborepo or
   Nx) that caches and parallelizes. Workspaces alone handle installs and
   linking; the orchestrator is what keeps builds and tests fast at scale.
2. **Let the orchestrator build only what changed.** Task caching keyed on
   inputs (source, deps, config) means an unchanged package's build/test
   is a cache hit, and only affected packages and their dependents run.
   Without this, every change re-runs the whole repo and the monorepo
   becomes a tax (see incremental-processing's idea, applied to builds).
3. **Declare dependencies between packages explicitly.** Internal packages
   reference each other by name (`"@org/utils": "workspace:*"`); the
   orchestrator reads the graph to order tasks. Keep the dependency graph
   acyclic and one-directional (shared/core packages depended on, not
   depending; see coupling-analysis): cycles break incremental builds and
   reasoning.
4. **Use TypeScript project references for incremental typechecking.**
   `composite: true` and `references` so `tsc` checks packages in
   dependency order and caches results (see tsconfig-mastery); path
   aliases and workspace links kept in sync so imports resolve in editor,
   build, and test alike.
5. **Decide the versioning model.** Fixed/locked (all packages share one
   version, released together: simple, coarse) or independent (each
   versions on its own: flexible, more bookkeeping). Changesets automates
   either: contributors declare the bump per package, and release
   tooling versions, changelogs, and publishes (see npm-publishing,
   release-tagging).
6. **Keep boundaries and shared config real.** Shared tsconfig/lint/build
   base configs extended per package (see js-tooling-selection);
   lint rules that forbid reaching into another package's internals
   (import only its public entry). A monorepo without enforced boundaries
   becomes a big ball of mud faster than separate repos would.

## Boundaries

- Monorepo vs polyrepo is a real tradeoff (shared code and atomic changes
  vs independent lifecycles and blast radius); choose it for the
  coordination benefit, not by default (see monorepo-vs-polyrepo).
- The orchestration tooling (Turborepo/Nx) is itself a dependency and a
  learning cost; small repos with 2-3 packages may need only plain
  workspaces without it.
- Remote caching and distributed task execution pay off at team scale and
  add infrastructure; adopt them when local caching is no longer enough,
  not up front.

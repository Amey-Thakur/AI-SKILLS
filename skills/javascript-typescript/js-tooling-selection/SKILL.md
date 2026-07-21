---
name: js-tooling-selection
description: Choose the JavaScript/TypeScript bundler, test runner, and linter for a project by its type, not by fashion. Use when setting up a toolchain or deciding whether to migrate an existing one.
---

# JS tooling selection

The JavaScript tooling landscape churns constantly, but the decisions are
stable: pick tools by what the project is (app, library, monorepo) and let
speed and defaults settle the rest. Chasing every new tool costs more than
the tools save.

## Method

1. **Choose the bundler/build by project type.** A web app: Vite (fast
   dev server, sensible defaults) is the modern default. A library: tsup
   or unbuild (dual-format output, types, minimal config; see
   npm-publishing). A backend: often no bundler (run TypeScript directly
   with tsx, or compile with tsc/tsup for prod; see node-backend-setup).
   Match the tool to the artifact, not to the trend.
2. **Let esbuild/SWC-based speed be the baseline.** Modern tools transpile
   with esbuild or SWC (Rust/Go-fast) rather than Babel; dev feedback in
   milliseconds is now the floor. If your toolchain has slow dev reloads,
   that alone can justify a migration.
3. **Pick one linter/formatter stack and stop debating it.** Biome (fast,
   lint+format in one, minimal config) or ESLint + Prettier (mature, huge
   plugin ecosystem, the incumbent). Both are fine; consistency and
   enforcement (see linting-setup, style-guides) matter far more than
   which. Enable the type-aware rules that catch real bugs
   (no-floating-promises, exhaustiveness).
4. **Choose the test runner to match the build.** Vitest for Vite
   projects (shared config, fast, Jest-compatible API); Jest where it is
   entrenched and working; the Node built-in test runner for
   dependency-light backends. Do not run a test runner whose module
   handling fights your bundler's (see testing-strategy).
5. **Weigh migrations by real payoff, not novelty.** A working toolchain
   has value; replace it when the new tool fixes a felt pain (slow builds,
   config sprawl, a capability gap), not because it trended. Estimate the
   migration cost (config, CI, every developer's setup) against the
   benefit honestly (see rewrite-vs-refactor).
6. **Prefer fewer tools with good defaults over a bespoke pipeline.**
   Every tool is a dependency to update, a config to maintain, and a thing
   new contributors must learn (see onboarding-docs). An all-in-one
   (Vite + Vitest + Biome) beats a hand-assembled ten-plugin chain for
   most projects.

## Boundaries

- Tooling choice does not change your code's correctness; it changes
  developer velocity and build output. Do not let a tooling migration
  masquerade as product progress.
- The specific winners shift year to year; the selection method (by
  project type, by felt pain, favor speed and defaults) is what remains
  stable. Re-check the current landscape when starting fresh.
- Framework meta-tools (Next, Remix, Nuxt, Astro) bundle these choices
  for you; when using one, adopt its toolchain rather than fighting it.

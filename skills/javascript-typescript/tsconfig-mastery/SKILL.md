---
name: tsconfig-mastery
description: Configure tsconfig.json deliberately: the flags that matter, module and target settings, and build vs typecheck configs. Use when setting up TypeScript compilation or debugging confusing module and output errors.
---

# tsconfig mastery

Most tsconfig confusion comes from treating it as boilerplate to copy.
The file makes a handful of decisions that shape how your code compiles,
resolves modules, and gets checked; understand those and the rest follows.

## Method

1. **Set strictness first, and mean it.** `"strict": true` plus the extra
   checks you want (`noUncheckedIndexedAccess`, `noImplicitOverride`):
   this is the flag group that determines whether TypeScript is helping
   you (see typescript-strictness). Everything else is plumbing by
   comparison.
2. **Match `module` and `moduleResolution` to your runtime and bundler.**
   This is where most errors come from. Modern setups use
   `"module": "ESNext"` (or `"NodeNext"` for Node without a bundler) with
   `"moduleResolution": "Bundler"` or `"NodeNext"` accordingly. A mismatch
   produces the "cannot find module" and extension-required errors that
   waste hours (see js-modules for the ESM/CJS reality underneath).
3. **Set `target` and `lib` to your real environment.** `target`
   determines the JS features downleveled; `lib` determines which APIs
   the compiler believes exist. Targeting too low bloats output with
   polyfilled helpers; too high ships syntax the runtime cannot run. Set
   both to what you actually deploy to (a modern Node version, or via the
   bundler for browsers).
4. **Separate typecheck from build.** Bundlers (Vite, esbuild, tsup) do
   the transpilation; `tsc` does the typechecking. A common clean setup:
   `"noEmit": true` for the check config, and let the bundler emit. Run
   `tsc --noEmit` in CI as the type gate (see linting-setup) even when it
   never produces output.
5. **Use project references for monorepos.** In a workspace,
   `"references"` plus `"composite": true` let packages typecheck and
   build incrementally in dependency order (see monorepo-workspaces).
   Without them, a large monorepo re-checks everything on every change.
6. **Enable the ergonomic flags.** `"esModuleInterop": true` and
   `"skipLibCheck": true` (skip checking `.d.ts` of dependencies: faster
   builds, and their type errors are not yours to fix),
   `"forceConsistentCasingInFileNames": true` (catches the case-mismatch
   bug that only bites on Linux CI), and `"paths"` for import aliases
   (kept in sync with the bundler's aliases).

## Boundaries

- tsconfig controls type checking and, optionally, emit; it does not
  bundle, minify, or run your code (that is the bundler and runtime's
  job; see js-tooling-selection).
- Copied configs from tutorials mix settings for different runtimes and
  eras; a `module`/`moduleResolution` pair from a 2019 blog post is the
  usual root of module-resolution pain. Set them for your stack.
- `skipLibCheck` trades some safety (it skips your dependencies' type
  correctness) for build speed and sanity; it is the pragmatic default,
  but know that it is a tradeoff.

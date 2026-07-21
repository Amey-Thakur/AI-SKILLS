---
name: js-modules
description: Navigate ESM and CommonJS, interop between them, and structure imports so bundlers can tree-shake. Use when hitting module-resolution errors, mixing ESM and CJS, or shrinking a bundle.
---

# JS modules

The JavaScript module story is two systems (ESM and CommonJS) that mostly
interoperate and occasionally do not, and most "cannot use import outside
a module" and "require is not defined" errors come from a mismatch nobody
configured on purpose. Get the model straight and the errors resolve.

## Method

1. **Default to ESM (`import`/`export`).** It is the standard, statically
   analyzable (which enables tree-shaking), and what the ecosystem is
   converging on. Signal it with `"type": "module"` in package.json (or
   `.mjs` files). Reserve CommonJS (`require`/`module.exports`) for
   legacy code and tools that still need it.
2. **Understand the interop asymmetry.** ESM can import CommonJS (the
   `module.exports` becomes the default import), but CommonJS cannot
   `require` an ESM module synchronously (it needs dynamic `import()`).
   This one-way friction is behind most dual-system pain; know which
   direction you are crossing (see tsconfig-mastery for making the
   compiler agree).
3. **Match module settings across the toolchain.** package.json `type`,
   tsconfig `module`/`moduleResolution`, and the bundler must agree. A
   `.ts` file compiled as CJS but run in an ESM package, or `import`s
   without extensions under `NodeNext`, produce the classic resolution
   errors. Set them once, consistently, for your runtime.
4. **Structure imports for tree-shaking.** Import named exports from
   modules that have no side effects at import time, and mark your package
   `"sideEffects": false` (or list the files that do) so bundlers can drop
   unused code (see bundle-size). Deep-import from large libraries
   (`import x from "lib/x"`) or use ones with proper ESM exports; a
   barrel file that re-exports everything can defeat tree-shaking and slow
   cold starts.
5. **Use dynamic `import()` for code-splitting and lazy loading.**
   `await import("./heavy")` loads a module on demand, splitting it into
   its own chunk: the mechanism behind route-level and feature-level lazy
   loading (see lazy-loading, frontend-build-tooling). It also bridges CJS
   to ESM where needed.
6. **Publish libraries dual-format deliberately.** If others consume your
   package, provide both ESM and CJS builds via the `exports` map
   (conditional `import`/`require` entries) so both kinds of consumer
   work, and pin the types entry (see npm-publishing). Getting the
   `exports` map wrong is the top reason a published package "cannot be
   imported".

## Boundaries

- Module format is a build and runtime concern; it does not change your
  code's logic, only whether the toolchain can resolve and optimize it.
- Barrel files (`index.ts` re-exporting a directory) trade import
  convenience for bundler and cold-start cost; use them at true public
  API boundaries, not for every internal folder (see
  python-project-structure's analogous `__init__` rule).
- The ESM/CJS transition is ongoing; some dependencies are ESM-only or
  CJS-only, occasionally forcing dynamic import or a build step: check a
  dependency's format before adopting it in a mismatched project.

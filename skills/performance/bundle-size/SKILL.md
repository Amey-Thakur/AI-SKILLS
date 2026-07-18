---
name: bundle-size
description: Shrink JavaScript bundles by analyzing what ships, enabling real tree shaking, splitting heavy code, and putting the dependency list on a diet. Use when the initial JS payload is large, slow to parse, or growing unchecked.
---

# Bundle size

A JavaScript bundle is code the browser must download, parse, and execute before
the page becomes usable, and it accretes weight silently as dependencies pile up.
Nobody adds a megabyte on purpose: it arrives one convenient import at a time.
Shrink it by seeing what is inside, removing what is dead, and choosing lighter
dependencies.

## Method

1. **Visualize what is in the bundle.** Run `source-map-explorer`,
   `webpack-bundle-analyzer`, or Rollup's visualizer plugin. Find the biggest
   modules and the surprises: a date library, an entire icon set, the same
   package bundled twice.
2. **Enable and verify tree shaking.** Ship ES modules rather than CommonJS, mark
   `"sideEffects": false` where it holds, and build in production mode. Import
   named exports (`import { debounce }`) instead of the whole namespace so the
   bundler can drop what you do not use.
3. **Put heavy, rarely used code behind a dynamic import.** Code-split routes and
   large widgets, a charting library or a rich-text editor, with `import()` so
   they load on demand instead of riding in the initial bundle.
4. **Put the dependencies on a diet.** Replace `moment` with `date-fns` or
   `Temporal`, swap all of `lodash` for per-method imports or native equivalents,
   and pull only the components you use from a large UI library. Check the cost on
   Bundlephobia before adding anything.
5. **Dedupe transitive bloat.** Several versions of one package inflate the
   bundle. Run `npm dedupe`, inspect the lockfile, and collapse to a single copy
   with `resolutions` or `overrides`.
6. **Set a budget and enforce it in CI.** Add a `size-limit` or `bundlesize`
   check that fails the build when the payload crosses a threshold. Without a
   gate, the weight you removed creeps back every sprint.

## Signals

- Does a bundle-analyzer report exist, or is the size a mystery?
- Does importing one function pull in an entire library?
- Is heavy, optional code split out of the initial download?
- Does CI fail when the bundle exceeds its budget?

## Boundaries

The one-time cost of a server or CLI process booting is startup-time; the
main-thread cost during interaction is web-vitals' INP. This skill covers what
ships in the JavaScript payload. Framework-specific splitting defers to the
framework's build configuration.

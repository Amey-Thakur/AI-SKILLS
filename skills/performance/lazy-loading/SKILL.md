---
name: lazy-loading
description: Defer expensive work until the moment it is actually needed, so startup stays fast and unused paths cost nothing. Use when initialization is slow, a page ships code it never runs, or a list renders far more rows than the screen shows.
---

# Lazy loading

Most programs do work up front that a given run never uses: constructing objects
nobody touches, parsing config for a path not taken, rendering list rows
off-screen, shipping a bundle for a route never visited. Deferring that work
trades a tiny check at use-time for a large saving at start-time. The craft is
deferring without turning it into a stall on the first call.

## Method

1. **Measure where startup and first paint go.** Profile boot and cold render: a
   flame graph of initialization, a bundle analyzer (`webpack-bundle-analyzer`,
   `source-map-explorer`), a Lighthouse trace. Defer the biggest unconditional
   cost, not whatever is easiest to wrap.
2. **Lazily initialize expensive singletons.** Build a heavy client, connection,
   or parsed table on first access, not at import. Use a memoized getter
   (`functools.cached_property`, a `lazy` holder, `sync.Once`) so the cost is
   paid once, only if something uses it, and never at module load.
3. **Split code along route and interaction seams.** Dynamic-import a route's
   bundle, a modal, or a heavy widget so the initial download carries only what
   the first screen needs. In React that is `React.lazy` with `Suspense`; in a
   bundler, a dynamic `import()` marks the split point.
4. **Virtualize long lists.** Render only the rows in and near the viewport with
   `react-window`, `react-virtualized`, or a `<virtual-scroller>`, recycling DOM
   nodes as the user scrolls. A 10,000-row table then costs the twenty-odd
   visible rows, not all of them.
5. **Defer off-screen media and data.** Add `loading="lazy"` to below-the-fold
   images and iframes, and fetch a tab or panel's data when it opens, not on page
   load. Prefetch on hover or intent so the deferred cost lands before the user
   notices it.
6. **Guard against the lazy stall and the waterfall.** A defer that runs a heavy
   synchronous load on first interaction just relocates the jank. Show a
   placeholder, load in the background, and avoid chains where each lazy step
   waits on the previous one before it even starts fetching.

## Litmus tests

- Does deferred work stay uncomputed on a run that never triggers it?
- Did the initial bundle or startup cost fall by the deferred amount?
- On first use of a lazy path, is there a placeholder rather than a freeze?
- Does a virtualized list's cost stay flat as the row count grows?

## Boundaries

This defers work until it is needed. Deciding what to precompute and keep warm
instead is caching-strategy; coalescing many deferred triggers into one is
batching-and-debouncing. Framework-specific suspense and hydration rules follow
that framework's own contract.

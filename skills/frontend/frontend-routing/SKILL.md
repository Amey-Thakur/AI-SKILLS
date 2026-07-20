---
name: frontend-routing
description: Structure client routes so the URL is the source of truth, data loads per route, and back/scroll behave. Use when adding routes, wiring route data loading, or fixing lost-filter or scroll-jump bugs.
---

# Frontend routing

The URL is shared, addressable, restorable state. Every piece of navigational
state kept only in memory is a thing that breaks refresh, back, and paste-a-
link. Route design is deciding what the URL owns.

## Method

1. **Put addressable state in the URL.** Current page, open record, active tab,
   filters, sort, and search query belong in the path or query string, so
   refresh restores them and a copied link reproduces the view. Ephemeral state
   (a hover, an unsaved draft, a transient toast) stays in memory. The test:
   if losing it on refresh would annoy the user, it is URL state.
2. **Match nesting of routes to nesting of layout.** Use nested routes so a
   parent route renders persistent chrome (sidebar, tabs) and child routes
   render into its outlet. Shared layout stays mounted across child navigation,
   preserving scroll and state in the chrome while the panel swaps.
3. **Load each route's data at the route, in parallel.** Attach data
   requirements to the route (loaders in React Router / TanStack Router,
   `load` in SvelteKit) so navigation and fetching start together and parent
   plus child data load in parallel, not in a request waterfall triggered by
   nested `useEffect`s. Read URL params as the query inputs.
4. **Render pending, error, and not-found per route.** Every route defines its
   loading state (a skeleton, or a pending bar for fast transitions), an error
   boundary for load failure with a retry, and a 404 for bad params. A route
   that only handles the happy path shows a blank screen on any hiccup.
5. **Restore scroll deliberately.** Reset scroll to top on a forward navigation
   to a new page; restore the previous scroll position on back/forward. Most
   routers do this by default but break it when you scroll a nested container
   instead of the window; then you own restoration for that container by key.
6. **Encode query state with typed, minimal params.** Parse and validate query
   params into typed values at the route boundary, default missing ones, and
   omit params at their default so URLs stay clean. Debounce writes from a
   fast-changing input (a search box) so you do not flood history entries.

## Boundaries

- SSR, streaming, and server-component routing add hydration and data-
  serialization concerns beyond this client-focused method.
- Auth guards and redirects need their own flow; this covers route structure
  and data, not session enforcement.
- Deep-link and native-app routing schemes differ from web history and are
  out of scope.

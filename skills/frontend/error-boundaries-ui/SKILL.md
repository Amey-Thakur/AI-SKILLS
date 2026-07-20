---
name: error-boundaries-ui
description: Isolate render failures behind boundaries with useful fallbacks, retry, and reporting so one broken component does not blank the app. Use when adding error boundaries, designing failure UI, or a crash takes down a whole page.
---

# Error boundaries UI

An unhandled render error unmounts the entire React tree to a white screen.
Boundaries contain the blast radius so a failing widget degrades to a small
fallback while the rest of the page keeps working.

## Method

1. **Place boundaries at blast-radius seams, not one at the root.** Wrap each
   independent region: the shell, each route, each self-contained widget (a
   chart, a comment list, a sidebar panel). A single top-level boundary turns
   any error into a full-page failure; nested boundaries let the header survive
   a broken chart. Put the coarsest boundary at the route level as the floor.
2. **Design the fallback to fit the hole it fills.** A widget-level fallback is
   a small inline message sized like the widget, not a full-page error card
   that reflows the layout. State plainly what failed ("Couldn't load
   activity"), keep surrounding chrome intact, and never leak stack traces or
   raw error text to end users.
3. **Give a retry affordance that actually re-attempts.** Provide a Try again
   button that resets the boundary and re-mounts the subtree so a transient
   failure recovers without a full reload. In React, reset via the boundary's
   `resetErrorBoundary` (react-error-boundary) or a changing `key`; ensure the
   retry re-runs the failed data load, not just the render.
4. **Report the error before showing the fallback.** In the boundary's error
   handler, send the error, component stack, route, and user-safe context to
   your monitoring service (Sentry, etc.). A fallback with no reporting hides
   failures from you while showing them to users. Deduplicate to avoid flooding
   on a render loop.
5. **Handle async and event errors separately.** Error boundaries catch errors
   thrown during render, not in event handlers, promises, or `setTimeout`.
   Catch those where they occur and route them into state that renders the same
   failure UI, or into your data layer's error state, so the two paths look
   consistent to the user.
6. **Distinguish expected failures from crashes.** A 404 or a validation
   rejection is an expected state to render as designed content, not a thrown
   error to catch in a boundary. Reserve boundaries for the unexpected: null
   dereferences, bad shapes, code bugs. Overusing them to model normal states
   hides real problems.

## Boundaries

- Boundaries do not catch errors in event handlers, async code, or SSR; those
  need explicit try/catch and error state.
- This does not replace input validation or typed data contracts; it is the
  last line, not the first.
- Network and data-fetch errors are better modeled as query error states; see
  frontend-data-fetching.

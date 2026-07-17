---
name: frontend-state
description: Decide where frontend state lives and how it flows, so UIs stay predictable as they grow. Use when structuring components, adding state, or untangling prop-drilling and sync bugs.
---

# Frontend state

Most frontend bugs are state bugs: two copies of one truth disagreeing.
The craft is holding each piece of state in exactly one place, at the
lowest level that needs it.

## Method

1. **Classify the state before placing it:**
   - Server state (data fetched from an API): belongs in a query cache
     layer with staleness rules, not copied into local variables that
     drift from the server.
   - UI state (open panel, selected tab, draft text): belongs in the
     component that owns the interaction, lifted only when a real second
     consumer appears.
   - Shared app state (current user, theme, active workspace): a small
     global store, kept small; a store that mirrors half the server is a
     second, worse database.
   - URL state (page, filters, selected item): belongs in the URL, so
     refresh, back, and share all work. If losing it on refresh would
     annoy the user, it is URL state.
2. **Derive, never duplicate.** Anything computable from existing state
   (counts, filtered lists, validity) is computed at render, memoized only
   when measured as hot. The moment a derived value is stored, it can
   disagree with its source.
3. **Make flows one-directional:** state flows down as props or context,
   changes flow up as events or actions. A child mutating a parent's data
   directly, or two components writing one value, is where "sometimes it
   doesn't update" is born.
4. **Handle the async truthfully.** Every fetch renders all three of
   loading, error, and empty as designed states, not afterthoughts. Show
   stale data with a refresh indicator over a spinner wall where the data
   allows; block interaction only where acting on stale data would be
   wrong.
5. **Keep effects for synchronization with the outside world** (network,
   subscriptions, DOM APIs), not for transforming state into other state;
   the transform belongs in render. An effect chain that sets state which
   triggers another effect is a loop with extra steps.

## Litmus tests

- For each piece of state: who owns it, and could a second copy of it
  exist anywhere? Every yes is a bug scheduled.
- Refresh mid-flow: does the UI restore sensibly?
- Kill the network in the middle of every mutation: does the UI tell the
  truth about what happened?

## Boundaries

Framework conventions (React, Vue, Svelte, or the project's chosen store)
override this document's vocabulary; the ownership principles transfer.

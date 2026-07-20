---
name: react-hooks-discipline
description: Write React hooks with correct dependencies and minimal effects so renders stay predictable. Use when adding useEffect, debugging stale closures or render loops, or extracting a custom hook.
---

# React hooks discipline

Most hook bugs are one of two mistakes: lying to the dependency array, or
using an effect to compute state that render could compute. Fix those two and
the render graph becomes readable.

## Method

1. **List every reactive value the effect reads as a dependency.** Props,
   state, and values derived from them all belong in the array. Do not
   silence `react-hooks/exhaustive-deps`; if a dependency causes a loop, the
   fix is to remove the dependency's reactivity (memoize it, move it into a
   ref, or lift it), not to hide it from the linter.
2. **Derive during render instead of syncing with an effect.** If a value is
   computable from props or state, compute it inline: `const full = first + " "
   + last`. An effect that watches state to `setState` another value is a
   double render and a drift bug waiting for the day the effect misses. Reserve
   `useMemo` for derivations proven expensive by measurement.
3. **Use effects only to synchronize with systems outside React.** Network
   subscriptions, event listeners, timers, imperative DOM APIs, and analytics
   are effects. Transforming data, filtering lists, and formatting are not.
   Every effect needs a cleanup that reverses its setup, or it leaks across
   remounts and Strict Mode double-invokes.
4. **Reset derived-from-props state with a key, not an effect.** When a
   component must clear internal state because an id changed, pass `key={id}`
   from the parent to remount it. An effect that watches `id` to reset state
   runs one render late and flashes stale content.
5. **Stabilize identities that feed dependency arrays.** Wrap callbacks passed
   to memoized children or effect deps in `useCallback`, and stabilize objects
   with `useMemo`, only where an unstable identity actually causes a re-run or
   re-render you measured. Blanket memoization adds noise without payoff.
6. **Extract a custom hook when logic is stateful and reused, or gnarly and
   named.** The trigger is a repeated stateful pattern (a `useDebounce`, a
   `usePagination`) or one effect-plus-state cluster complex enough to deserve
   a name and a test. Do not extract a hook that is called once and only wraps
   a single `useState`; that is indirection without reuse.

## Boundaries

- Server-state caching (dedup, staleness, invalidation) belongs in a query
  library; see frontend-data-fetching, not hand-rolled effects.
- Concurrent-mode edge cases (`useSyncExternalStore`, transitions) need the
  React docs; this covers everyday discipline.
- Class-component lifecycles are out of scope.

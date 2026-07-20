---
name: ui-state-machines
description: Model UI as explicit finite states so impossible combinations cannot render. Use when a component juggles interacting booleans, shows contradictory states, or a flow has grown too many flags to reason about.
---

# UI state machines

Four booleans encode sixteen states, but a real screen has maybe five valid
ones. Modeling the valid states explicitly deletes the other eleven and the
bugs that live in them.

## Method

1. **Count the states before writing flags.** List the distinct situations the
   UI can be in: idle, loading, success, error, empty. If you find yourself
   writing `isLoading && !isError && data`, you are reconstructing a state that
   should have a name. Replace the boolean cluster with one `status` union.
2. **Make illegal states unrepresentable in the type.** Model the state as a
   discriminated union where each variant carries only the data valid in it:
   `{ status: 'loading' }`, `{ status: 'error', error }`, `{ status: 'success',
   data }`. Now `data` cannot be read while loading because the type has no
   `data` there. This is the core payoff; enforce it with TypeScript.
3. **Define transitions, not just states.** Write which events move which state
   to which next state. `idle --submit--> loading`, `loading --resolve-->
   success`, `loading --reject--> error`. A transition table is the spec; any
   event arriving in a state with no defined transition is ignored, which kills
   the double-submit and the resolve-after-unmount races.
4. **Reach for a statechart when states nest or run in parallel.** When a flow
   has sub-states (a form that is `editing` with nested `pristine`/`dirty`, or
   `submitting` overlapping a `validating`), use a library like XState or a
   hand-written reducer with a chart. Flat unions handle most components;
   hierarchy and parallelism are the signal to escalate.
5. **Drive rendering off the state, exhaustively.** Switch on the discriminant
   and render one branch per variant. Make the switch exhaustive so adding a
   state is a compile error until every render site handles it. A default
   branch that renders "nothing" is where new states go to hide.
6. **Keep the machine pure; run effects on transition.** The reducer computes
   next state from event and current state with no side effects. Fire network
   calls and DOM work in response to entering a state, not inside the reducer,
   so the machine stays testable as a plain function.

## Boundaries

- Overkill for a lone toggle or a single dropdown; a boolean is fine when
  there is genuinely one axis.
- This models one component's or flow's states, not application-wide data
  flow; see frontend-state for where state lives.
- A statechart does not replace server-state caching; pair it with a data
  layer for fetched data.

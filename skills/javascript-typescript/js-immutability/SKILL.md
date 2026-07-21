---
name: js-immutability
description: Work with immutable data in JavaScript through structural updates, readonly types, and freeze where it earns its cost. Use when managing shared or reactive state, or debugging bugs from unexpected mutation.
---

# JS immutability

Shared mutable objects are where "something changed it and I do not know
what" bugs live, and where reactive frameworks silently fail to update.
Immutability, applied where it matters, makes state changes explicit and
traceable. The cost is copying, so apply it deliberately.

## Method

1. **Update by producing new values, not mutating.** Spread for shallow
   copies (`{ ...obj, field: next }`, `[...arr, item]`), and the
   non-mutating array methods (`map`, `filter`, `concat`, `slice`,
   `toSorted`/`toReversed`/`with`) over the mutating ones (`push`,
   `splice`, `sort`, which change in place). A `sort()` on a prop you did
   not own is a classic shared-state bug.
2. **Copy at the depth you actually change.** Spread is shallow: nested
   objects are still shared references, so mutating a nested field of a
   "copy" mutates the original too. Update the path you change
   (`{ ...s, user: { ...s.user, name } }`) or use a structural-sharing
   helper (immer's `produce` writes mutable-looking code that yields an
   immutable result) for deep updates without deep-copy cost.
3. **Encode intent in the type.** `readonly` properties, `ReadonlyArray`,
   and `Readonly<T>` make "do not mutate this" a compile error, not a
   convention (see ts-api-types). Accept `readonly` inputs on functions
   that only read; return frozen or readonly data from getters so callers
   cannot corrupt your state.
4. **Reserve `Object.freeze` for enforcement where it pays.** Freeze
   catches accidental mutation at runtime (throwing in strict mode), but
   it is shallow and has a cost; use it on config, constants, and
   development-mode state guards, not on every object in a hot path (see
   performance-optimization).
5. **Immutability is what makes reactivity and undo work.** Frameworks
   detect change by reference equality; mutating in place leaves the
   reference the same and the UI stale (see frontend-state). Immutable
   updates give you cheap change detection, time-travel/undo, and safe
   sharing across concurrent async work (the old response cannot mutate
   the new state).
6. **Do not fight it where mutation is local and clear.** Building an
   array in a tight loop with `push` before returning it, or mutating a
   freshly-created local object, is fine and faster; the discipline is
   about SHARED and reactive state, not a ban on all mutation.

## Boundaries

- Immutability trades allocation for safety; in hot paths over large data
  the copy cost is real, so measure and localize mutation there (see
  js-event-loop on not blocking the thread).
- `const` prevents reassignment, not mutation: `const obj = {}` still
  lets `obj.x = 1`. Immutability is about the value, `const` is about the
  binding.
- Deep-freezing or deep-cloning everything is over-application; target
  the state that is shared, reactive, or crosses async boundaries.

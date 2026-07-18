---
name: immutability-defaults
description: Make immutability the default so aliasing bugs turn into compile errors or no-ops instead of action at a distance. Use when designing data structures, state updates, or any value shared across threads or call sites.
---

# Immutability defaults

Shared mutable state is where bugs go to hide: a value changes under code
that assumed it was stable, and nothing in the type or the call site warned
you. Making immutability the default converts a whole class of aliasing
bugs into compile errors, and makes the ones that remain cheap to reason
about because a value you hold cannot change beneath you.

## Method

1. **Default every field to read-only.** Use `final` in Java, `val` in
   Kotlin, `readonly` in TypeScript, `const` bindings in JS, and
   `@dataclass(frozen=True)` in Python. Reach for a mutable field only when
   a profiler or a real hot loop demands it, and write the comment saying
   why.
2. **Copy on write, return the new value.** Instead of `list.sort()` in
   place, return a sorted copy; instead of mutating an argument, build and
   return a fresh object. Every caller keeps its original, so no distant
   reader breaks when you reorder or drop an element.
3. **Freeze at the boundary.** Data crossing into your module gets
   `Object.freeze`, `tuple(...)`, or a defensive copy, so a caller's later
   mutation cannot reach into your state. This is cheapest exactly where
   untrusted data first arrives.
4. **Prefer persistent structures over deep copies for large data.** Immer,
   Immutable.js, or pyrsistent share the unchanged structure and copy only
   the changed path, so a one-element update on a 10k map costs one small
   allocation, not 10k.
5. **Model updates as transformations.** A reducer that takes state and an
   event and returns new state is testable and replayable; an object that
   mutates itself in place is neither. Redux and event sourcing both stand
   on this shape.
6. **Watch the aliasing traps:** a default mutable argument
   (`def f(x=[])`), a getter that hands back the internal list, two names
   bound to one array. Each lets an edit in one place surface as a failure
   somewhere unrelated.

## Litmus tests

- Can two threads read this object with no lock and no surprise?
- If a caller holds a reference you returned, can their later edit change
  your state?
- Does any method named `copy` actually share the same underlying array or
  map?

## Boundaries

Hot paths with measured allocation pressure and large numeric buffers
(NumPy arrays, audio frames) are the honest exceptions: mutate them
locally, keep them un-shared, and document the ownership. Language idiom
wins too: fighting Go's value semantics or Rust's borrow checker to force a
foreign style costs more than the immutability buys.

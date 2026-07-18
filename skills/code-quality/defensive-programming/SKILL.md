---
name: defensive-programming
description: Validate untrusted data once at the boundary, then trust invariants inside and fail loudly if they ever break. Use when writing entry points, constructors, or any code that must not proceed on bad state.
---

# Defensive programming

Checking every argument in every function is not defense, it is noise that
buries the one check that matters and slows code that never sees bad input.
Real defense draws a line: validate untrusted data once at the boundary,
establish invariants, and let interior code trust them, then fail loudly if
one is ever violated.

## Method

1. **Validate all external input at the entry point.** HTTP handlers, CLI
   parsers, file readers, queue consumers: reject malformed data here with
   a clear error before it reaches a line of business logic. Use a schema
   (zod, pydantic, JSON Schema) so the check and the type stay in sync.
2. **Trust your own interior.** Once data has crossed a validated boundary,
   do not re-validate it in every private helper. Re-checking known-good
   data hides where the real contract lives and trains readers to skim past
   checks that do matter.
3. **Assert invariants, do not handle them.** `assert balance >= 0`
   documents a fact your code guarantees; if it fails, that is a bug, and
   the program should stop, not recover. Never assert on user input, only
   on conditions your own code promises.
4. **Fail fast at construction.** Reject an invalid object in its
   constructor or factory so an illegal instance never exists. A
   `Percentage` that refuses values outside 0 to 100 means no downstream
   code ever guards that range again.
5. **Guard the preconditions you cannot type.** When the type system
   cannot express "list must be non-empty" or "start before end", check it
   at the top of the function and throw with the offending values. Keep the
   check adjacent to the assumption it protects.
6. **Keep asserts in the build that matters.** Python strips `assert` under
   `-O`; C strips under `NDEBUG`. If an invariant must hold in production,
   use a real check that throws, not an assert that silently vanishes.

## Checks

- Is every field validated exactly once, at the boundary, and trusted
  after?
- Would a violated internal assumption crash immediately, or drift and
  corrupt data first?
- Can an object of this type exist in an invalid state at all?

## Boundaries

Security-critical trust boundaries (auth, deserialization of hostile
input) need validation even on paths you nominally own, because the threat
model, not the call graph, defines the boundary there. Where a framework
already validates at its edge, defer to it rather than building a redundant
second wall.

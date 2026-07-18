---
name: type-safety
description: Model data so illegal states will not compile, then turn the checker to strict and let it prove correctness for free. Use when designing types, modeling state machines, or hardening a loosely typed module.
---

# Type safety

A type is a proof the compiler rechecks for free on every build, but only
about the things you let it see. Model with loose types (everything a
string, every field optional, states tracked by scattered flags) and the
compiler cannot help; model tightly and whole categories of bug stop
compiling.

## Method

1. **Make illegal states unrepresentable.** Replace a `status: string` plus
   a nullable `error` with a tagged union: `{ kind: 'loading' } | { kind:
   'ok', data: T } | { kind: 'error', message: string }`. Now "ok with an
   error message" cannot be constructed, so no code has to guard against
   it.
2. **Parse, do not validate, at the edge.** Turn input into a precise type
   once (`Email`, `UserId`, `NonEmptyList`) with zod, io-ts, or pydantic,
   then pass that type inward. A function taking `Email` never re-checks the
   `@`, because the type already carries the proof.
3. **Wrap primitives that mean different things.** A `UserId` and an
   `OrderId` that are both bare `string` will get swapped eventually.
   Branded types, newtypes, or `NewType` in Python make the swap a compile
   error at no runtime cost.
4. **Keep required fields required.** Make a field optional only when
   absence is a real, handled case. Every `?` you add is a branch every
   caller inherits, so keep the mandatory fields mandatory and let the type
   document what must exist.
5. **Turn the checker to strict.** `strict: true` in tsconfig, mypy
   `--strict`, Kotlin explicit-API mode, the relevant `-Werror` analyses.
   Half-on type checking passes files a full pass would reject, which is
   worse than knowing they are unsound.
6. **Make exhaustiveness a compile error.** Switch on a union with a
   `never` default (TypeScript) or a sealed `when` (Kotlin) so adding a
   variant fails the build at every site that does not yet handle it. The
   compiler becomes your checklist for the change.

## Checks

- Can you construct a value that is in two contradictory states at once? If
  so, tighten the type.
- Does adding a new enum case break the build at every site that must
  change?
- Are `UserId` and `OrderId` distinguishable to the compiler, or both just
  `string`?

## Boundaries

Dynamic languages without gradual typing, and seams with untyped systems
(raw JSON, FFI, reflection), cap how much the compiler can prove: validate
at those seams instead. Type modeling has a cost, and past a point the
ceremony outweighs the bugs prevented, so stop tightening when the next
constraint costs more than the mistake it would block.

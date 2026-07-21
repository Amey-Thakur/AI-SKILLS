---
name: typescript-generics
description: Write TypeScript generics that infer well and stay readable, and know when a generic is not worth it. Use when designing typed reusable functions or APIs, or untangling generic signatures nobody can read.
---

# TypeScript generics

Generics let a function or type work over many types while preserving the
relationships between them. Used well, they make a signature both flexible
and precise; used for their own sake, they turn a readable function into
an unreadable puzzle of type parameters.

## Method

1. **Reach for a generic when the output type depends on the input
   type.** `identity<T>(x: T): T`, `first<T>(arr: T[]): T | undefined`:
   the caller's type flows through. If the function returns a fixed type
   regardless of input, it does not need a generic; a plain parameter
   type is clearer.
2. **Design for inference, not annotation.** The best generics are ones
   callers never have to specify: TypeScript infers `T` from the
   arguments. Order and shape parameters so inference works
   (`map<T, U>(arr: T[], fn: (x: T) => U): U[]` infers both from usage).
   If callers constantly write `fn<SomeType>(...)`, the design is
   fighting inference.
3. **Constrain with `extends` to say what T must support.**
   `<T extends { id: string }>` lets the body use `.id` and rejects types
   that lack it. Constraints turn a generic from "any type" into "any
   type that fits", which is both safer and better-documented. Use
   `keyof`, conditional types, and mapped types where the relationship
   genuinely needs them.
4. **Stop before the type gymnastics.** Deeply nested conditional and
   mapped types that take an afternoon to read are a cost every future
   maintainer pays. If a generic signature needs a comment to explain
   what it does, consider whether a simpler type, an overload, or just
   `unknown` at the boundary would serve better (see cognitive-load).
5. **Prefer `unknown` over `any` at the untyped edges.** When a value's
   type truly is not known (parsed JSON, external input), `unknown`
   forces a check before use, where `any` disables the compiler
   silently. Narrow it explicitly (see typescript-narrowing).
6. **Name type parameters meaningfully past the trivial case.** `T` and
   `U` are fine for a generic `map`; `TData`, `TError`, `TKey` read far
   better in a real API's multi-parameter signature.

## Boundaries

- Generics are a design tool for library and shared-utility code; most
  application code needs few of them. Do not genericize a function used
  in one place.
- Type-level cleverness has zero runtime effect and real readability
  cost; it is worth it for a widely-used API's ergonomics, rarely for
  internal code.
- When inference produces a wrong or too-wide type, a targeted overload
  or an explicit return type often beats escalating the generic's
  complexity (see ts-api-types).

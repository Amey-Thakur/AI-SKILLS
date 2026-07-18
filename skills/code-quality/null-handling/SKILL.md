---
name: null-handling
description: Make absence explicit in the type and resolve it at the edges so the interior never dereferences a surprise null. Use when designing return types, parsing external input, or chasing null-reference crashes.
---

# Null handling

A null that reaches code expecting a value is the most common runtime crash
there is, and the stack trace points at the dereference, not the place the
null was born. The fix is to make absence explicit in the type and to
convert or reject nulls at the edges, so interior code never has to ask.

## Method

1. **Make absence a type, not a value.** Use `Optional<T>`, `T | null`
   under strict null checks, Rust's `Option`, Kotlin's `T?`, or Swift
   optionals, and turn on enforcement: TypeScript `strictNullChecks`,
   Kotlin null safety, mypy strict. The type now forces every caller to
   handle the empty case.
2. **Convert at the boundary, once.** Parse external input (JSON, DB rows,
   env vars) into a type where every field is present or explicitly
   optional. After that line, interior code never re-checks, because the
   boundary already decided.
3. **Use a null object where a neutral default is correct.** An empty
   collection, a `NullLogger`, a `Guest` user with no permissions: callers
   run the same path with no branch. Reserve this for cases where doing
   nothing is right, not where absence is a genuine error.
4. **Return empty collections, never null collections.** `return []`, not
   `return null`, from anything that yields a list, so callers iterate
   without guarding. A null list is a guard every caller must remember, and
   one eventually will not.
5. **Unwrap deliberately.** Thread through absence with `?.` and `??` (or
   `map`, `getOrElse`, `if let`); reserve force-unwrap (`!`, `.unwrap()`,
   `.get()`) for cases you have already proven non-null, and leave the
   comment with the proof.
6. **Distinguish normal absence from error absence.** `findUser` returning
   empty is routine; a required config key being absent is an error that
   deserves a thrown exception naming the key, not a silent `None` that
   surfaces three layers away.

## Signals

- Does the type of every field and return state whether null is possible?
- Is there a single place where external data becomes null-safe, or are the
  checks scattered through the interior?
- Does any public method return null where an empty list or a null object
  would let callers drop a branch?

## Boundaries

Languages without a real optional type (older Java, C) lean on annotations
(`@Nullable`, `@NonNull`) with tools like the Checker Framework or Infer;
the discipline holds even when the compiler is weaker. Database columns
that are genuinely nullable stay nullable: model the real domain, do not
paper a required field over an optional one.

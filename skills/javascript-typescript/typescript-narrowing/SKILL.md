---
name: typescript-narrowing
description: Narrow union types safely with guards, discriminated unions, and exhaustiveness checks. Use when working with values that could be several types, or when the compiler will not let you access a property you know is there.
---

# TypeScript narrowing

Narrowing is how you go from "this could be several types" to "here it is
this one" in a way the compiler trusts. Done well, it makes union types
ergonomic and catches the case you forgot; done with casts, it throws away
the safety you turned strict mode on for.

## Method

1. **Narrow with the checks the compiler understands.** `typeof x ===
   "string"`, `x instanceof Date`, `"id" in x`, and truthiness checks all
   narrow the type in the branch that follows. Prefer these built-in
   narrowings; they need no maintenance and cannot lie.
2. **Model alternatives as discriminated unions.** Give each variant a
   common literal tag (`type Result = { status: "ok"; data: T } |
   { status: "error"; message: string }`) and switch on the tag: the
   compiler narrows each branch to the right variant and knows which
   fields exist. This is the single most useful TypeScript pattern for
   states, results, and events (see ui-state-machines).
3. **Make switches exhaustive.** In the `default` case, assign the value
   to `const _exhaustive: never = x`: if a new variant is added and not
   handled, the compiler errors here, turning a forgotten case into a
   build failure (see exhaustive-switches). This is how you find every
   place to update when a union grows.
4. **Write custom type guards for reusable narrowing.** A function
   returning `x is Foo` (`function isFoo(x: unknown): x is Foo`) narrows
   at every call site. Make the guard's body actually verify the shape it
   claims; a guard that lies is worse than a cast because it looks safe.
5. **Use assertion functions for invariants.** `function assert(cond):
   asserts cond` and `assertIsUser(x): asserts x is User` narrow by
   throwing on failure, useful at boundaries where absence is a bug, not
   a branch (see defensive-programming).
6. **Cast only as a last resort, and narrowly.** `as` overrides the
   compiler and is a promise you might be breaking; `as any` and `!`
   (non-null assertion) discard safety entirely. When unavoidable
   (interfacing with weak library types), isolate the cast at the
   boundary with a comment, and prefer a validated guard over a bare
   assertion (see request-validation for parsing untrusted input).

## Boundaries

- Narrowing reflects what the compiler can prove from your checks; a cast
  or a lying guard makes it prove the wrong thing, and the runtime error
  returns.
- Control-flow narrowing resets across function calls and awaits (the
  compiler cannot assume a value is unchanged); re-narrow after an
  `await` or extract to a local.
- Runtime data (API responses, JSON) is `unknown` until validated;
  narrowing a bare `any` gives false confidence, so parse at the edge
  (see ts-api-types, structured-output for the LLM analog).

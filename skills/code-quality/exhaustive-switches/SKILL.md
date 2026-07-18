---
name: exhaustive-switches
description: Make switch and match statements provably total so adding a case forces every site to handle it, with no default that hides the gap. Use when branching over an enum, union, or sealed type.
---

# Exhaustive switches

A switch over a fixed set of cases is a promise to handle all of them, and a
`default` branch quietly voids that promise: add a new enum member and every
switch keeps compiling while silently doing the wrong thing. The goal is to make
the compiler, not a runtime log, tell you which sites need the new case. That
converts a whole category of "forgot to update" bugs into build errors.

## Method

1. **Delete the catch-all default on closed sets.** When the type is an enum or
   sealed union you own, drop `default:` so the compiler must verify every member
   is handled. A default belongs only to genuinely open input like a raw int.
2. **Turn on the exhaustiveness check your language offers.** TypeScript narrows
   a `switch` and lets you assign the leftover to `never`. Rust `match` is
   exhaustive already: do not add `_ =>`. Use `-Wswitch-enum` in Clang or GCC,
   and sealed classes with `when` in Kotlin.
3. **Add a `never`-typed floor.** In TypeScript, end the switch with
   `const _exhaustive: never = value;`. When someone adds a variant, this line
   stops compiling at exactly the switches that failed to handle it.
4. **Model the domain as a closed union.** Prefer a discriminated union or sealed
   hierarchy over loose strings so the type system knows the full case list.
   Exhaustiveness checking has nothing to verify against an open `string`.
5. **Return from each branch instead of mutating one shared variable.** A switch
   expression that yields a value forces every arm to produce one; a statement
   that assigns can silently leave a case unassigned. Prefer switch expressions.
6. **When a default is unavoidable, make it loud.** For open input, throw in the
   fallthrough, `throw new Error('unhandled: ' + x)`, rather than returning a
   default value. Failing fast beats returning a plausible wrong answer.

## Checks

- Add a throwaway enum member and compile: do the switches error, or stay green?
- Search `default:` and `_ =>`: does each guard truly open input, not a closed enum?
- Does every branch return a value, or can one path fall through assigning nothing?

## Boundaries

Open-ended input such as network payloads, user strings, or version-skewed data
from another service legitimately needs a default for the unknown: exhaustiveness
is for sets you fully own. Languages without sealed types or `never` can only
approximate this, so lean on lint rules and tests there.

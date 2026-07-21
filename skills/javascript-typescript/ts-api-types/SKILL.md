---
name: ts-api-types
description: Type the boundaries of a TypeScript codebase: public API surfaces, branded types, and runtime validation of untyped input. Use when designing types others consume, or when external data enters your program.
---

# TS API types

Types inside your program are checked by the compiler; types at the edges
(what callers pass in, what the network returns) are promises the compiler
cannot verify. The discipline is making public types precise and
validating untyped input where it enters, so the guarantees inside are
real.

## Method

1. **Design public types for the consumer, not the implementation.** An
   exported function's parameter and return types are its contract:
   precise, minimal, and stable (see api-surface-minimalism). Prefer
   specific types over `any`/`object`; use unions and literals to make
   illegal arguments unrepresentable ("size": "sm" | "md" | "lg" beats
   `string`).
2. **Validate untrusted input at the boundary, then trust it inside.**
   Data from the network, files, env, or user is `unknown`, not the type
   you hope. Parse it with a schema validator (zod, valibot, or
   hand-written guards) at the entry point into a typed value; downstream
   code then works with a real type, not a hope (see request-validation,
   typescript-narrowing). A cast (`as User`) on network data is a lie the
   compiler believes.
3. **Derive types from the source of truth.** Infer types from schemas
   (`z.infer<typeof UserSchema>`), from data (`as const` plus `typeof`),
   or from the API contract (generated from OpenAPI): so the type and the
   runtime shape cannot drift. Hand-maintaining a type beside a schema
   guarantees they diverge (see openapi-contracts).
4. **Use branded types for values that are more than their shape.** A
   `UserId` and an `OrderId` are both `string` but must not be swapped:
   brand them (`type UserId = string & { readonly __brand: "UserId" }`)
   so the compiler catches passing one where the other belongs. Reserve
   this for identifiers and values where the mix-up is costly.
5. **Prefer `readonly` and precise object types at boundaries.**
   `readonly` arrays and properties on inputs signal you will not mutate
   them and let callers pass frozen data (see js-immutability); exact
   object types reject typo'd extra properties on public inputs.
6. **Version and evolve public types additively.** Adding optional fields
   is safe; removing, renaming, or narrowing a published type breaks
   consumers (see api-change-management). Treat exported types like any
   API surface.

## Boundaries

- Types vanish at runtime; a `User` type does nothing to a malformed
  object at the boundary. Only runtime validation makes the boundary
  safe, and the type should be derived from that validation, not
  asserted alongside it.
- Branded types and heavy schema inference add ceremony; apply them at
  the edges and the identifiers that matter, not to every internal
  object.
- Generated types from a backend contract are only as honest as the
  contract; a lying OpenAPI spec produces confidently-wrong types (see
  openapi-contracts).

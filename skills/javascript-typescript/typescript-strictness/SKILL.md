---
name: typescript-strictness
description: Turn on and migrate to TypeScript's strict flags incrementally so the compiler catches real bugs. Use when configuring TypeScript strictness or tightening a loose codebase without a big-bang rewrite.
---

# TypeScript strictness

TypeScript's value is proportional to how strict you let it be. A loose
config with implicit `any` everywhere is JavaScript with extra syntax;
strict mode is where the compiler starts catching the null-deref and
type-mismatch bugs before they ship.

## Method

1. **Turn on `strict` for new projects, full stop.** It enables the
   flags that matter together (`strictNullChecks`, `noImplicitAny`,
   `strictFunctionTypes`, and the rest). Everything below is about
   getting an existing loose codebase there without a rewrite.
2. **Migrate flag by flag, not all at once.** Enabling `strict` on a
   large loose codebase surfaces thousands of errors and stalls. Turn on
   one flag at a time, fix its errors, commit, repeat. `noImplicitAny`
   and `strictNullChecks` are the two that find the most bugs and cause
   the most work; schedule them deliberately.
3. **Add `strictNullChecks` early and take it seriously.** It separates
   `T` from `T | null | undefined`, forcing you to handle absence at
   every boundary. This is the single flag that prevents the most runtime
   errors (the "cannot read property of undefined" class; see
   null-handling). Expect it to touch a lot of code; the errors are real
   bugs, not noise.
4. **Reach for `noUncheckedIndexedAccess` once strict is stable.** It
   makes `arr[i]` return `T | undefined`, catching the off-by-one and
   missing-key access that `strict` alone misses. High value, moderate
   friction; add it after the baseline is clean.
5. **Contain the migration debt visibly.** Where you must defer fixes,
   use explicit `// @ts-expect-error` with a reason (it fails the build
   when the underlying issue is fixed, unlike `@ts-ignore` which rots
   silently), and track the count downward. Never widen types to `any`
   to silence errors; that spreads the looseness (see ts-api-types).
6. **Enforce in CI and forbid backsliding.** `tsc --noEmit` in CI (see
   linting-setup); lint rules against `any` and non-null assertions
   (`!`) except where justified. A strict config that any PR can quietly
   loosen is not strict.

## Boundaries

- Strictness catches type bugs, not logic bugs; a fully-typed program can
  still be wrong (see testing-strategy).
- Third-party libraries with weak or wrong types leak looseness in;
  isolate them behind typed wrappers at the boundary rather than
  weakening your own config (see ts-api-types).
- `strict` is a floor, not the ceiling: `noUncheckedIndexedAccess`,
  `exactOptionalPropertyTypes`, and lint rules add more, each with its
  own friction-to-value tradeoff to weigh per project.

---
name: python-typing
description: Add type hints where they catch real errors and document contracts, choosing Protocol, generics, or TypedDict deliberately and setting a checker strictness you can actually hold. Use when introducing or tightening types on a Python codebase.
---

# Python typing

Types are a gradual tool, not a moral obligation. Annotate the boundaries
where wrong shapes cause real bugs, pick the construct that states the
contract, and set a checker strictness the team can keep green.

## Method

1. **Type the edges first.** Public function signatures, module boundaries,
   and data crossing I/O earn annotations because callers rely on them and
   the checker verifies both sides. Local variables mostly infer; annotate a
   local only when inference is wrong or the intent is unclear.
2. **Choose Protocol for behavior, ABC for a class family.** A `Protocol`
   describes "anything with these methods" and needs no inheritance, so it
   fits duck-typed seams and third-party objects you cannot subclass. An ABC
   fits a closed hierarchy you own and want to share implementation or force
   registration. Prefer Protocol for function parameters.
3. **Reach for generics when a container or function preserves a type.**
   `def first(xs: Sequence[T]) -> T` and `class Box(Generic[T])` keep the
   caller's type flowing through. Use `TypeVar` bounds (`T: Comparable`) to
   constrain, and modern `class Box[T]:` syntax on 3.12+. Do not add a
   generic where a concrete type would do.
4. **Model structured dicts with TypedDict, not `dict[str, Any]`.** JSON
   payloads and config records get a `TypedDict` so the checker catches
   missing keys and wrong value types. Mark optional keys with
   `NotRequired`. When the shape is a real object with methods, use a
   dataclass instead; see python-dataclasses.
5. **Set strictness explicitly and ratchet it.** Start mypy or pyright in a
   lenient mode on legacy code, then raise the floor: enable
   `disallow_untyped_defs`, `warn_return_any`, and `strict` per package as
   coverage grows. Pin the checker version in the lockfile so CI and local
   agree. Treat new errors as build failures, not warnings.
6. **Use escape hatches sparingly and visibly.** `cast`, `# type: ignore`
   with a specific error code, and `Any` are admissions of a gap; each needs
   a reason nearby. `Any` is contagious, so isolate it at the boundary and
   convert to a precise type immediately.

## Boundaries

- Type hints are not enforced at runtime. For runtime validation of external
  data use a validating library, not annotations alone.
- Do not chase 100 percent coverage on throwaway scripts or fast-moving
  prototypes; the annotation cost outruns the payoff there.
- Overloads and deep generic gymnastics can make a signature unreadable. If
  the types are harder to follow than the code, simplify the API instead.

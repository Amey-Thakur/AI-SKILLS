---
name: pythonic-idioms
description: Apply Python idioms where they cut bookkeeping and clarify intent, and refuse them where the clever form hides control flow. Use when writing loops, resource handling, or unpacking and deciding how idiomatic to make it.
---

# Pythonic idioms

Idioms earn their place by making intent legible, not by proving fluency. A
comprehension, an unpack, or a context manager is right when it removes
noise; a plain loop is right when the compact form buries what happens.

## Method

1. **Use a comprehension when the whole point is to build one collection.**
   `[transform(x) for x in xs if keep(x)]` beats an append loop because the
   result type and shape are stated up front. The moment the body needs a
   side effect, a `try`, or two statements, switch back to a `for` loop; a
   comprehension run for effect is a misuse.
2. **Unpack instead of indexing.** `first, *rest = seq`, `for key, value in
   d.items()`, `a, b = b, a`. Named targets document what each slot means;
   `row[0]` and `row[3]` force the reader to reconstruct it. Use `_` for
   values you deliberately drop.
3. **Pair every acquire with a context manager.** `with open(...)`, locks,
   database sessions, `tempfile`, and any resource you `close`. If the
   library gives no context manager, wrap it in `contextlib.contextmanager`
   or `closing`. Manual try/finally is a smell that a `with` is missing.
4. **Prefer EAFP when the happy path dominates.** Attempt the operation and
   catch the specific failure (`try: d[k] except KeyError`) rather than
   pre-checking (`if k in d`). EAFP avoids the time-of-check/time-of-use
   race and reads as one intention. Use LBYL only when the check is cheap
   and the failure is expensive or unrecoverable.
5. **Reach for the standard idiom before hand-rolling.** `enumerate` not a
   manual counter, `zip` not parallel indexing, `dict.get`/`setdefault` and
   `collections.defaultdict` not existence dances, `any`/`all` not flag
   loops, f-strings not `%` or `+`.
6. **Stop when nesting or density hurts.** One `if` filter and one loop in a
   comprehension is fine; a second `for` or a ternary inside a nested
   comprehension is a loop trying to escape. Optimize for the reader who
   arrives at 3 a.m., not for line count.

## Boundaries

- Idioms are about clarity, not speed. A comprehension is not automatically
  faster than a loop; profile before rewriting for performance.
- Do not chain generator expressions and comprehensions so deeply that a
  debugger cannot step into them; extract a named function instead.
- EAFP needs a narrow `except`. Catching broad `Exception` to avoid a check
  hides bugs and belongs to python-error-handling, not to idiom.

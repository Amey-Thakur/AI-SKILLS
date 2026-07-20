---
name: python-decorators
description: Write decorators that preserve signatures and compose cleanly, including parameterized and class-applied forms. Use when adding cross-cutting behavior to Python functions or fixing decorator-related introspection breakage.
---

# Python decorators

A decorator is a function transformer. The craft is transforming behavior
without destroying the function's identity: name, docstring, signature,
type hints.

## Method

1. **Always apply functools.wraps.** Without it, `help()`, tracebacks,
   pickling, and any framework that inspects `__name__` or `__doc__` see
   the wrapper, not the function. `@functools.wraps(fn)` on the inner
   wrapper is line one of every decorator.
2. **Keep the wrapper signature generic and forward everything.**
   `def wrapper(*args, **kwargs)` then `return fn(*args, **kwargs)`.
   Dropping the return value is the most common decorator bug; the second
   is swallowing exceptions meant for the caller.
3. **Parameterize with a factory.** `@retry(times=3)` means `retry` is a
   function returning a decorator: three nested defs. If you want both
   `@retry` and `@retry(times=3)` to work, detect the single-callable-arg
   case explicitly; document which form you support.
4. **Preserve types for checkers.** Annotate with ParamSpec:
   `def deco(fn: Callable[P, R]) -> Callable[P, R]`. Without it, every
   decorated function degrades to `Any` and the type checker goes blind
   downstream.
5. **Decide state placement.** Per-call state lives in the wrapper's
   locals; cross-call state (counters, caches) belongs in a closure
   variable or attribute on the wrapper, and needs a lock if threads call
   it. For stdlib cases use `functools.lru_cache` / `cache` instead of
   rolling your own.
6. **Class decorators transform the class, not instances.** They run once
   at definition: registering the class, injecting methods, wrapping
   selected callables from `vars(cls)`. For per-instance behavior use
   `__init_subclass__` or a metaclass only as a last resort.
7. **Support async when callers need it.** A sync wrapper around a
   coroutine function returns an un-awaited coroutine and "works" until
   nothing runs. Branch on `inspect.iscoroutinefunction(fn)` and provide
   an async wrapper path.

## Boundaries

- If the behavior needs configuration at call time rather than definition
  time, a plain higher-order function call is clearer than a decorator.
- Stacked decorators execute bottom-up; ordering-sensitive stacks
  (auth before cache before retry) deserve a comment stating the order.
- Do not use decorators to mutate global registries at import time in
  libraries; imports become side effects the user cannot control.

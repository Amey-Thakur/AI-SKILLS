---
name: python-error-handling
description: Design exception hierarchies, catch narrowly, and preserve error context so failures stay diagnosable. Use when structuring errors in a Python library or application, or cleaning up broad except blocks.
---

# Python error handling

An exception is part of your API. Callers can only handle what you raise
deliberately and document; everything else is a bug report.

## Method

1. **Define one root exception per package.** `class AppError(Exception)`,
   then a small tree of specific subclasses (`ConfigError`, `RetryableError`).
   Callers catch your root to shield themselves from your internals, or a
   leaf to handle one case. Never raise bare `Exception`.
2. **Catch the narrowest type that you can act on.** `except OSError` when
   you handle missing files; never `except Exception` except at a top-level
   boundary that logs and exits or returns a 500. An unhandled exception with
   a clean traceback beats a swallowed one every time.
3. **Preserve context when translating.** Re-raise with
   `raise ConfigError("bad port") from exc` so the original traceback chains.
   `from None` is only for deliberately hiding an implementation detail, and
   deserves a comment.
4. **Keep try blocks one line where possible.** Wrap only the statement that
   can fail, not the whole function; a broad block hides which call raised
   and catches errors you never meant to.
5. **Put cleanup in finally or a context manager.** Resource release must not
   depend on success. If you write the same try/finally twice, write a
   `contextlib.contextmanager` instead.
6. **Use ExceptionGroup for concurrent failures.** On 3.11+, TaskGroup and
   your own fan-out code raise groups; handle them with `except*` per type
   rather than flattening to the first error and losing the rest.
7. **Decide retryable vs fatal at raise time.** Encode it in the type
   (`RetryableError`) or an attribute, not by string-matching messages at the
   call site.

## Boundaries

- Exceptions are for exceptional paths. An expected absent value is a `None`
  return or a sentinel, not a raise; parsing user input that often fails may
  deserve a result object instead.
- Do not log and re-raise at every level; one log at the boundary where the
  exception is finally handled, or you flood logs with duplicates.
- Never use exceptions for flow control across module boundaries; that is an
  API contract disguised as an accident.

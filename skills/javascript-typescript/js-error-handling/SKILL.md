---
name: js-error-handling
description: Handle errors in JavaScript and TypeScript with proper Error subclasses, cause chains, and a policy for async and unhandled failures. Use when designing error handling or debugging lost stack traces and swallowed errors.
---

# JS error handling

JavaScript lets you throw anything and catch it as unknown, which is
exactly how error handling goes wrong: strings thrown instead of Errors,
`catch (e)` where `e` is `any`, and rejections that vanish. A deliberate
policy makes failures visible and diagnosable.

## Method

1. **Throw Errors, never strings or objects.** Only `Error` instances
   carry a stack trace and work with tooling. `throw new Error("...")`,
   never `throw "failed"`. Subclass for distinct handling: `class
   NotFoundError extends Error` with a set `name`, so callers can branch
   on the type (`instanceof`) rather than string-matching messages.
2. **Type the catch as unknown and narrow.** In TypeScript, `catch (e)`
   gives `unknown` (with `useUnknownInCatchVariables`): you cannot assume
   `e.message` exists (someone threw a string). Narrow with
   `e instanceof Error` before touching properties, and have a fallback
   for the non-Error case (see typescript-narrowing).
3. **Preserve context with the `cause` chain.** When catching and
   re-throwing at a boundary, pass the original: `throw new
   ConfigError("bad port", { cause: err })`. The chain keeps the root
   cause and its stack, so the final log tells the whole story instead of
   a bare high-level message (see rust-error-handling for the same
   principle typed).
4. **Catch narrowly, at the right level.** Wrap the specific operation
   that can fail, not a whole function; catch where you can actually do
   something (retry, default, user message). A broad `try` around
   everything hides which call failed and catches errors you never meant
   to. Let genuinely unexpected errors propagate to a top-level handler.
5. **Set a policy for async and unhandled failures.** Every async entry
   point (route, event handler, job) has one place that catches and
   reports (see js-async-patterns). Register `unhandledRejection` /
   `uncaughtException` (Node) and `window.onerror` /
   `unhandledrejection` (browser) as backstops that log to your error
   tracker (see error-tracking): they should be near-empty in a healthy
   app, so treat hits as bugs.
6. **Decide errors-vs-results deliberately.** For expected failure that
   callers routinely handle (validation, "not found"), a result type
   (`{ ok: true, value } | { ok: false, error }`) or returning
   `null`/`undefined` can be clearer than throwing; reserve exceptions
   for the exceptional. Whatever you choose, be consistent within a
   module.

## Boundaries

- Error messages are user- and developer-facing text; route user-facing
  ones through a formatter and keep internal detail (stacks, causes) in
  logs, not in the UI (see error-messages).
- `try/catch` does not catch errors in async callbacks that ran after the
  try block exited; only `await`ed rejections and synchronous throws are
  caught (see js-event-loop, js-async-patterns).
- Swallowing errors to "keep the app running" trades a visible failure
  for a silent-corruption one; log before any deliberate suppression, and
  suppress only with a documented reason.

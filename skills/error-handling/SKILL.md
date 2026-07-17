---
name: error-handling
description: Design error handling that fails loudly, recovers deliberately, and tells the person exactly what to do. Use when writing failure paths, retries, or user-facing errors.
---

# Error handling

Every operation that can fail will. The design question is never whether to
handle it but who needs what when it happens: the user needs a next step,
the operator needs a cause, and the program needs a defined state.

## Method

1. **Sort failures into the three kinds first:**
   - Expected and recoverable (file missing, validation failed, network
     blip): handle at the call site with a specific response.
   - Expected and not recoverable here (config invalid, dependency down):
     propagate with context added; let the layer that can decide, decide.
   - Bugs (violated invariants, impossible states): fail fast and loud.
     Catching a bug and continuing corrupts data quietly, which is the
     worst outcome available.
2. **Never swallow.** An empty catch block, an ignored error return, a
   fallback that hides the cause: each converts a five-minute fix into a
   week of "it sometimes doesn't work". If a failure is genuinely fine,
   write the comment saying why it is fine; that comment is the difference
   between a decision and a leak.
3. **Add context at each boundary, once.** Wrap errors with what the layer
   was doing ("importing invoice.pdf: page 3 unreadable"), not with a
   restatement of the message below it. Log at the top where the error is
   finally handled, not at every hop; double-logged errors bury the real
   sequence.
4. **Retry only what deserves it:** transient failures (timeouts,
   temporary unavailability), with a small capped count, backoff with
   jitter, and only around idempotent operations. Retrying a non-idempotent
   write on timeout can duplicate the write; that needs an idempotency key,
   not optimism. Never retry validation failures or bugs.
5. **Write the user's message as instructions, not internals.** What
   happened in their terms, and what to do next: "This file is larger than
   50 MB. Split it or compress it." Keep stack traces and ids in logs;
   correlate with a reference the user can quote.
6. **Leave state defined.** A failed operation either rolled back, or its
   partial effects are recorded and resumable. "Failed somewhere in the
   middle" is a data bug wearing an error message.

## Litmus tests

- Can the operator find the cause from logs alone, at 3 a.m., without
  reproducing?
- Does any code path ignore an error without a comment defending it?
- If this operation runs twice, is anything corrupted?

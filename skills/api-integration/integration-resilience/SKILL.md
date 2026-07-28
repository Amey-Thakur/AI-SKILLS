---
name: integration-resilience
description: Keep your service healthy when a dependency is slow or failing, through timeouts, retries, circuit breakers, and fallbacks. Use when an external call sits in a request path.
---

# Integration resilience

The dangerous dependency failure is not the fast error but the slow
response, which ties up your resources until the whole service degrades.
Resilience means bounding every call and failing deliberately.

## Method

1. **Set a timeout on every call, always.** A missing timeout means a
   hung dependency consumes a connection indefinitely, which is how one
   slow provider takes down a service.
2. **Make the timeout shorter than your own.** Budget the call within
   the request's total allowance rather than inheriting a library
   default of a minute.
3. **Retry only what is safe and transient.** Timeouts and server errors
   with backoff and jitter; never retry a non-idempotent write without a
   key (see timeouts-and-retries, payment-idempotency).
4. **Break the circuit on sustained failure.** Stop calling a dependency
   that is clearly down, which protects both your resources and their
   recovery (see graceful-degradation).
5. **Define the fallback per call site.** Cached data, a default, or a
   clear error, decided by what the user needs rather than uniformly.
6. **Isolate the resources each integration uses.** Separate pools mean
   one failing dependency cannot starve the others (see bulkheads).
7. **Test the failure paths deliberately.** Inject latency and errors,
   because the fallback path is the one never exercised until it matters
   (see chaos-engineering).

## Boundaries

Resilience limits blast radius; it cannot deliver a function that
genuinely depends on an unavailable service. Aggressive retries can
worsen a provider's outage and breach their terms. Every mechanism adds
complexity and needs to be justified per integration.

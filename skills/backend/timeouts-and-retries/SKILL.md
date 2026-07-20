---
name: timeouts-and-retries
description: Set timeout budgets per hop and retry policies that cannot amplify an outage, with circuit breakers where they pay. Use when calling downstream services or diagnosing cascading latency and retry storms.
---

# Timeouts and retries

Every network call needs three decisions made on purpose: how long to
wait, whether to try again, and when to stop trying at all. Defaults
(infinite, always, never) cause most cascade outages.

## Method

1. **Budget top-down.** The user-facing SLO (say 2s) is the budget; each
   hop gets a slice, and a caller's timeout must exceed the sum of its
   downstream's timeout-times-retries. Propagate the remaining budget
   (deadline header) so deep services stop working on requests the edge
   has already abandoned.
2. **Set both connect and request timeouts.** Connect short (1s: the
   host is there or it is not), request from the dependency's p99 plus
   margin, not from hope. An unset client timeout inherits "forever"
   from most HTTP libraries; audit every client for it.
3. **Retry only what is safe and useful.** Idempotent operations
   (GET/PUT/DELETE, POSTs with idempotency keys) on connect errors,
   timeouts, 429 and 5xx. Never on 4xx (except 429), never on business
   failures, never blind-retry a POST that may have committed.
4. **Cap retries hard and jitter the backoff.** 2-3 attempts total,
   exponential backoff with full jitter
   (`sleep(random(0, base * 2^attempt))`). Retry storms are self-DDoS:
   at 3 layers each retrying 3 times, one slow query receives 27x
   traffic. Retry at one layer (usually the edge), not every layer.
5. **Add a retry budget.** Site-wide cap (retries <= 10-20% of
   requests); when exceeded, stop retrying and fail fast. This converts
   a brownout into degraded-but-alive instead of amplified-to-death.
6. **Circuit-break chronic failures.** After N consecutive failures (or
   failure-rate threshold), open the circuit: fail immediately without
   calling, half-open probe after a cooldown. Pair with a fallback
   (cached value, degraded response) decided per call site; a breaker
   with no fallback is just a faster error.
7. **Hedge only read-heavy, latency-critical paths.** Send a second
   request after p95 latency elapses, take the first response, cancel
   the loser. It buys tail latency at the price of extra load; cap
   hedged traffic explicitly.

## Boundaries

- Retrying cannot fix overload; it worsens it. Load problems need
  shedding and backpressure, not persistence.
- These policies live in config, observable in metrics (retry count,
  breaker state), not scattered inline constants.
- Distributed transactions across hops are not solved by retries; see
  saga-pattern and transactional-outbox.

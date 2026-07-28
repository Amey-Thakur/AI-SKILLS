---
name: rate-limit-handling
description: Stay within a provider's limits and respond correctly when you exceed them, without hammering or stalling. Use when calling any API at volume.
---

# Rate limit handling

Rate limits are a contract, and hitting them repeatedly can escalate
from throttling to suspension. Handling them well means staying under
proactively rather than reacting to rejections.

## Method

1. **Read the limit headers, not just the errors.** Providers report
   remaining quota and reset time, which allows slowing down before
   being rejected.
2. **Honour the retry-after value.** It is the provider telling you
   exactly when to return, and ignoring it is what turns throttling into
   a block.
3. **Throttle client-side to stay under.** A token bucket sized below
   the limit prevents most rejections entirely (see rate-limiting).
4. **Back off exponentially with jitter.** Synchronised retries from
   many workers reproduce the burst that caused the limit (see
   timeouts-and-retries).
5. **Queue rather than drop where the work matters.** Deferring work to
   stay within quota is usually better than failing it, provided the
   queue is bounded.
6. **Batch where the API supports it.** One request for fifty records
   uses one unit of quota rather than fifty, which is often the whole
   solution.
7. **Monitor quota consumption as a metric.** Approaching the limit is a
   capacity signal that needs action before it becomes errors (see
   alerting-design).

## Boundaries

Limits vary by endpoint, plan, and time, and are sometimes undocumented.
Client-side throttling requires coordination across instances to be
accurate. Persistent limit pressure is a capacity problem needing a plan
change or an architectural one.

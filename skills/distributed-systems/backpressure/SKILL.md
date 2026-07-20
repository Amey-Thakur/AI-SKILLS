---
name: backpressure
description: Bound every queue and propagate overload upstream so systems degrade by shedding instead of collapsing. Use when designing high-throughput paths or diagnosing latency spirals under load.
---

# Backpressure

A system without backpressure absorbs overload into queues until
latency, memory, or retries kill it. The fix is structural: bound every
buffer, and make "slow down" flow from the bottleneck to the source.

## Method

1. **Bound every queue, explicitly.** Thread pools, channel buffers,
   connection pools, inbox queues: each gets a size chosen from latency
   math (Little's law: queue depth = throughput x tolerable wait), not
   "unbounded because it crashed once at 1000". An unbounded queue
   converts overload into an out-of-memory crash with extra latency
   first.
2. **Choose the full-queue policy per stage.** Block the producer
   (natural backpressure inside one process), shed newest with an error
   (edges, user requests: fail fast beats fail slow), or drop oldest
   (real-time data where stale is worthless). Deciding is the design;
   defaulting is the outage.
3. **Propagate pressure to the true source.** Reactive-streams demand,
   TCP flow control, gRPC/HTTP2 window sizes, or plain bounded-pull
   (consumers pull work at their pace: queues with prefetch limits do
   this; see message-queues). A tier that absorbs pressure without
   passing it upstream becomes the next unbounded buffer.
4. **Shed load at admission, by priority.** When saturated, reject at
   the front door (429 + Retry-After) before spending work on requests
   you will time out anyway. Shed low-value traffic first (crawlers,
   prefetches, retries) and protect high-value flows; a small reserved
   capacity for health checks and admin keeps you operable while
   shedding (see health-checks on saturation-based unreadiness).
5. **Detect saturation from queue age, not CPU.** Sustained queue
   growth and rising oldest-item age are the signal; CPU can sit at
   60% while a lock or downstream caps throughput. Watch utilization of
   each bounded pool; the one pinned at its bound is the bottleneck the
   pressure should be propagating from.
6. **Pair with load-source discipline.** Clients respect Retry-After
   with jittered backoff and retry budgets (see timeouts-and-retries);
   batch producers use adaptive concurrency (AIMD: increase until
   latency rises, back off on rejection). Shedding without cooperative
   sources just relocates the stampede.

## Boundaries

- Backpressure manages transient overload; sustained demand above
  capacity is a provisioning problem (see capacity-planning), and
  shedding is the bridge, not the fix.
- Blocking as backpressure inside event loops deadlocks them; async
  stages need bounded channels with explicit reject/drop, never a
  blocking put on the loop thread.
- End-to-end pressure across company boundaries (webhooks in) is
  rate-limit contracts, not flow control; see rate-limiting.

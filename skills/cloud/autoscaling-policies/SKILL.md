---
name: autoscaling-policies
description: Design autoscaling on the right metric with velocity controls, warm capacity, and flap prevention. Use when configuring autoscaling or diagnosing oscillation, lag, and cost spikes in scaled fleets.
---

# Autoscaling policies

Autoscaling is a control loop: metric, target, actuation delay. Tune it
like one; most failures are the wrong metric (measure of busyness that
does not track your bottleneck) or ignored actuation lag (scaling
that arrives after the spike).

## Method

1. **Scale on the constraint, not the habit.** CPU-bound services:
   CPU target 50-70% (headroom = the buffer that absorbs spikes during
   scale-out lag). Concurrency-bound (most request services):
   in-flight requests or RPS per instance against a measured
   per-instance capacity. Queue workers: backlog age or
   depth-per-worker (see message-queues), never CPU: an idle worker
   fleet with a growing queue is the classic mis-metric outage.
2. **Measure the actuation delay, then buy headroom for it.** Time
   from scale decision to serving instance (image pull, boot, warmup,
   registration): if it is 3 minutes, your target utilization must
   leave 3 minutes of spike absorption. Shrink the delay itself:
   smaller images, prebaked AMIs/warm pools, provisioned concurrency
   on function paths (see serverless-tradeoffs), and startup probes
   that report ready honestly (see health-checks).
3. **Make scale-out eager, scale-in reluctant.** Short evaluation
   windows and generous steps up (add 20-50% when breaching); long
   stabilization windows (5-15 min) and small steps down. The
   asymmetry prevents flapping, and over-capacity for ten minutes
   costs less than under-capacity for one.
4. **Set floors and ceilings deliberately.** Min = capacity that
   serves baseline with one instance/zone lost, never zero for
   latency-sensitive paths; max = what the downstream (DB connections,
   third-party rate limits; see backpressure) tolerates, not infinity:
   a runaway scale-out can DDoS your own database and your budget.
   Alert when pinned at max: that is capacity-planning telling you
   something (see capacity-planning).
5. **Pre-scale the known peaks.** Scheduled scaling for the 9am login
   wave, the marketing send, the batch window; reactive scaling then
   handles the residual surprise. Predictable load handled reactively
   pays the actuation lag every single day.
6. **Test the policy like code.** Load-test the scale-out (does
   capacity arrive before SLO breach?), the scale-in (do drains drop
   requests? see graceful-shutdown), and a zone loss at peak. Watch
   the loop's own signals: scaling event frequency, time-at-max,
   utilization variance; oscillation means windows too short or steps
   too big.

## Boundaries

- Autoscaling smooths demand variance; it cannot fix per-request
  inefficiency (see performance-optimization) or a saturated
  downstream that does not scale with you.
- Stateful systems (databases, brokers) rarely autoscale safely;
  their "scaling" is capacity planning plus deliberate resharding
  (see sharding-partitioning).
- Cost controls via aggressive scale-in trade tail latency for money;
  make that trade visible in SLO terms, not silently in the config.

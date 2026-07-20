---
name: graceful-shutdown
description: Drain servers on SIGTERM so deploys and scale-downs drop zero requests and corrupt no jobs. Use when implementing shutdown handling or chasing errors that spike during every deploy.
---

# Graceful shutdown

Every deploy kills your processes. Errors that spike at deploy time are
not bad luck; they are an unimplemented shutdown sequence.

## Method

1. **Trap SIGTERM and flip readiness first.** On signal: mark the
   readiness/health endpoint unready so the load balancer stops sending
   new work, but keep serving in-flight requests. Liveness stays green;
   you are draining, not dead.
2. **Wait out the routing lag.** There is a gap between "unready" and
   "traffic actually stops" (LB health-check interval, k8s endpoint
   propagation). Sleep a few seconds before closing listeners; closing
   immediately resets connections the balancer already routed.
3. **Drain in dependency order.** Stop accepting new HTTP connections,
   finish in-flight requests, stop pulling new jobs from queues, finish
   or checkpoint running jobs, flush buffers (logs, metrics, producer
   queues), then close DB pools and connections last; everything above
   needs them.
4. **Bound the drain with a deadline.** Grace budget minus routing-lag
   sleep is your drain window (k8s `terminationGracePeriodSeconds`
   default 30s; set it above your request timeout). At the deadline,
   log what was abandoned and exit nonzero context: requests longer than
   the grace period must be redesigned as jobs.
5. **Make workers stop between units.** Job loops check a shutdown flag
   between items; long items heartbeat and checkpoint so the next worker
   resumes instead of restarting (see background-jobs). Un-acked messages
   returning to the queue is the mechanism working, provided jobs are
   idempotent.
6. **Verify under fire.** Rolling deploy while a load test runs: zero
   5xx and zero connection resets is the pass bar. Also send SIGTERM
   locally and watch the ordered log lines; shutdown code that never
   runs in dev does not exist.

## Boundaries

- SIGKILL cannot be handled; crash-safety (idempotent jobs, transactional
  writes, WAL) is the layer below this one, and you need it anyway.
- In-process caches and sticky sessions make every shutdown lossy by
  design; externalize session state rather than extending grace periods.
- Do not block shutdown on flushing to a dependency that is itself down;
  bound each flush and prefer losing telemetry to hanging the deploy.

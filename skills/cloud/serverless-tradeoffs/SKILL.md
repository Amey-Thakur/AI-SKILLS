---
name: serverless-tradeoffs
description: Decide where functions-as-a-service fit using cold-start, limit, and cost-crossover math. Use when choosing between serverless and containers, or rescuing a serverless design that hit its limits.
---

# Serverless tradeoffs

Functions trade control for elasticity: zero idle cost and instant
scale, priced in cold starts, execution limits, and a per-invocation
premium at sustained load. The decision is arithmetic, not fashion.

## Method

1. **Match the workload shape.** Great fits: event handlers (queue,
   storage, webhook triggers), spiky or unpredictable traffic, cron
   jobs, glue between managed services, low-traffic APIs. Poor fits:
   sustained high-throughput services, long-running work past the
   execution cap, WebSockets/streaming, latency-critical paths that
   cannot absorb cold starts.
2. **Do the cost crossover.** Functions bill per request + GB-second;
   containers bill for provisioned time. Compute your monthly invocation
   volume both ways: steady load above roughly 30-50% utilization of a
   small container fleet usually favors containers; bursty load with
   idle valleys favors functions. Include the NAT, egress, and
   per-request API gateway charges that quotes omit.
3. **Engineer cold starts down, then accept the floor.** Keep packages
   small (tree-shaken, no dev deps), prefer lighter runtimes, avoid
   VPC-attachment where not needed, and pay for provisioned/warm
   concurrency only on the paths where p99 latency is a contract.
   If every path needs warm capacity, you are renting containers with
   extra steps.
4. **Design within the limits, not against them.** Execution time,
   memory, payload size, and concurrency quotas are hard walls: chunk
   long work into steps (queue-chained or state-machine orchestrated),
   stream large payloads via object storage handles, and set reserved
   concurrency so one function's burst cannot starve the account.
5. **Guard the downstream.** Serverless scales faster than your
   database: cap concurrency to what the connection pool and downstream
   SLAs tolerate, use HTTP-based data APIs or pooled proxies, and put
   queues between functions and fragile dependencies (see backpressure).
6. **Keep functions testable and portable.** Handler = thin adapter
   over ordinary code (hexagonal-architecture); business logic runs in
   local tests without emulators. That same separation is your exit
   ramp if the workload outgrows functions.

## Boundaries

- Statelessness is mandatory; anything needing local state between
  invocations (in-memory sessions, warm caches as correctness) belongs
  in containers or a store.
- Observability defaults are per-invocation logs; without tracing and
  structured logging (see distributed-tracing) a function web becomes
  undebuggable confetti.
- Lock-in concentrates in the triggers and orchestration, not the
  compute; weigh rewriting those when estimating exit cost (see
  managed-vs-selfhosted).

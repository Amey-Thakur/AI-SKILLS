---
name: load-balancing
description: Distribute traffic across instances with the right algorithm, health checks, and draining so capacity is used and failures are absorbed. Use when scaling a service horizontally or diagnosing uneven load.
---

# Load balancing

A load balancer turns a pool of instances into one address and keeps
traffic away from the ones that are unwell. The interesting choices
are less about the algorithm than about what counts as healthy, what
happens to in-flight work, and whether requests may be sticky.

## Method

1. **Pick an algorithm that matches request cost.** Round robin suits
   uniform, cheap requests; least-connections handles varied durations
   far better; consistent hashing keeps a key on one instance for
   cache locality. Uneven load under round robin usually means the
   requests were never uniform.
2. **Make health checks mean readiness, not liveness.** A check should
   fail when the instance cannot serve real traffic, including when
   its dependencies are unreachable, and pass only once warm. A check
   that returns OK from a process that cannot serve is worse than no
   check at all (see health-checks).
3. **Drain before removing.** On deploy or scale-in, stop sending new
   requests, let in-flight ones finish, then terminate. Skipping the
   drain turns every routine deploy into a small pile of user-visible
   errors (see graceful-shutdown, blue-green-deployments).
4. **Avoid stickiness unless state forces it.** Sticky sessions
   concentrate load, defeat rebalancing, and turn one instance loss
   into one cohort's outage. Externalise session state so any instance
   can serve anyone (see session-management).
5. **Balance across failure domains.** Spreading instances across
   zones helps only if the balancer keeps sending traffic to the
   survivors when a zone goes dark, so verify that failover path
   rather than assuming it.
6. **Watch per-instance metrics, not just totals.** Aggregate latency
   hides one sick instance returning errors quickly. Compare instances
   against each other to find the outlier (see alerting-design).

## Boundaries

- Balancing spreads load; it does not create capacity. A saturated
  pool needs more instances or less work per request (see
  capacity-planning).
- Layer 4 balancing cannot see paths, headers, or cookies; content
  routing needs layer 7, at some CPU and latency cost.
- Retrying past a balancer can amplify an overload into a stampede, so
  pair retries with budgets and backoff (see retry-strategies).

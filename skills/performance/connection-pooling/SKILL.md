---
name: connection-pooling
description: Size connection pools from throughput and latency math, then monitor for saturation and set timeout policy so a slow dependency fails fast instead of hanging. Use when a service exhausts database connections, requests queue for a connection, or pool size was picked by guess.
---

# Connection pooling

A connection pool trades a fixed set of expensive, reusable connections
against unbounded on-demand ones. Size it too small and requests starve
waiting for a slot; too large and the database drowns in connections it cannot
schedule. The size is not a vibe: it follows from throughput, hold time, and
the backend's own connection ceiling.

## Method

1. **Size from Little's Law, not intuition.** Concurrent connections needed
   equals throughput times hold time: 500 requests per second each holding a
   connection for 20ms needs 500 x 0.02 = 10 connections. Add headroom for
   spikes, but a bigger pool cannot beat the database's core and disk limits.
2. **Cap against the backend's real limit.** Postgres `max_connections` is
   often 100 to 200, shared across every service and every app instance. Ten
   app pods at 20 connections each is 200, and the database is full. Sum pools
   across all clients before setting any one, and put PgBouncer in front when
   the count outgrows the server.
3. **Set acquisition timeout so waiters fail fast.** Configure the pool's
   connection-wait timeout (HikariCP `connectionTimeout`, typically a few
   seconds) so a request that cannot get a connection returns an error instead
   of hanging forever. A slow acquire should surface as a fast failure, not a
   thread parked indefinitely.
4. **Bound connection lifetime and validation.** Set `maxLifetime` below the
   database's and any proxy's idle timeout so the pool retires connections
   before the server kills them mid-query. Enable a lightweight validation
   query or keepalive so dead connections are dropped, not handed to a request.
5. **Monitor saturation, not just averages.** Track active vs idle connections,
   connections waiting to acquire, and acquire wait time at p99. The signal of
   an undersized pool is nonzero and growing wait time, not high average
   utilization. Alert on sustained waiters.
6. **Separate pools for unlike workloads.** Give slow analytics or batch jobs
   their own smaller pool so a long-running report cannot drain every
   connection out from under latency-sensitive request traffic.

## Signals

- Does the pool size match throughput times hold time with modest headroom?
- Does the sum of all client pools stay under the backend's max_connections?
- Under load, is connection-acquire wait time at p99 near zero?
- Does `maxLifetime` sit below every upstream idle and connection timeout?

## Boundaries

This sizes and guards the pool. If queries are slow enough that hold time
itself is the problem, that is sql-optimization or n-plus-one-queries; a
shorter query shrinks the pool you need. Cross-region and serverless
connection models add reconnection costs this in-process math does not capture.

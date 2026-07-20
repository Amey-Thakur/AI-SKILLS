---
name: health-checks
description: Design liveness, readiness, and startup probes that heal real failures without amplifying outages. Use when wiring health endpoints or debugging restart loops and drained fleets.
---

# Health checks

Three different questions, three different answers: should you restart me
(liveness), should you send me traffic (readiness), am I still booting
(startup). Conflating them turns partial outages into total ones.

## Method

1. **Liveness checks only the process.** Event loop responsive, not
   deadlocked: return 200 if the handler runs at all. Never include
   dependencies: if the database blips and liveness checks it, the
   orchestrator restart-loops your entire healthy fleet during the one
   moment it needs stability.
2. **Readiness checks ability to serve.** Required dependencies
   (DB pool has a connection, config loaded, migrations current) with
   short per-check timeouts, cached for a few seconds. Unready is
   recoverable and expected: during startup, shutdown drain (see
   graceful-shutdown), and dependency outages.
3. **Distinguish required from degradable dependencies.** The database
   is required; the recommendation service is not. Degradable
   dependencies never fail readiness; they flip feature flags and show
   up in metrics. Otherwise one optional system's outage drains every
   pod that could have served 90% of traffic.
4. **Startup probe covers slow boots.** Cache warming, model loading,
   migration waits: a startup probe with a generous budget keeps
   liveness (tight thresholds) from killing pods mid-boot. Without it
   you either boot-loop or loosen liveness for everyone.
5. **Fail readiness on saturation, carefully.** Rejecting at
   queue-full/backpressure is legitimate load shedding; base it on
   sustained saturation, not instantaneous spikes, and alert loudly:
   a fleet breathing in and out of readiness is an outage with extra
   steps.
6. **Make deep health a diagnostic, not a probe.** A `/healthz/deep`
   listing each dependency's status and latency is for humans and
   dashboards. Orchestrators get the cheap, boolean answers.

## Boundaries

- Health endpoints are unauthenticated infrastructure surface: no
  version strings, hostnames, or dependency details on the probe paths;
  keep the deep endpoint internal.
- Cross-region and end-to-end synthetic checks are monitoring, not
  probes; do not wire them to restart or drain machinery.
- An LB health check pointed at liveness instead of readiness undoes the
  entire drain sequence; audit which endpoint each layer actually calls.

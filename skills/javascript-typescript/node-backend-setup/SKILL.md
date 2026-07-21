---
name: node-backend-setup
description: Bootstrap a Node.js backend with ESM, typed config, graceful shutdown, and structured logging from the start. Use when starting a Node service or hardening one that grew without foundations.
---

# Node backend setup

A Node backend that starts as a quick `index.js` and grows accretes the
same missing foundations every time: no config discipline, no graceful
shutdown, console.log everywhere. Putting the foundations in at the start
costs an hour and saves a rewrite.

## Method

1. **Start with ESM and TypeScript.** `"type": "module"`, a tsconfig
   targeting your Node version (see tsconfig-mastery), and a runner
   (`tsx`/`ts-node` for dev, compiled output or a bundler like `tsup` for
   prod). Modern Node runs TypeScript-adjacent setups cleanly; pick one
   and stay consistent to avoid the module-resolution pain (see
   js-modules).
2. **Load and validate config once, typed.** Read environment variables
   at startup into a validated, typed config object (a schema validator:
   zod/envalid), failing fast with a clear message if a required var is
   missing or malformed (see environment-config, request-validation). No
   `process.env.FOO` scattered through the code; one config module every
   file imports.
3. **Implement graceful shutdown from day one.** Trap `SIGTERM`/`SIGINT`:
   stop accepting new connections, finish in-flight requests, close the
   DB pool and other resources, then exit; with a timeout that forces
   exit if drain hangs (see graceful-shutdown). Every deploy and scale-in
   sends SIGTERM; without this, each one drops requests.
4. **Use structured logging, not console.log.** A logger (pino/winston)
   emitting JSON with levels, a request/correlation id, and no secrets
   (see structured-logging, log-levels). `console.log` gives you
   unsearchable, unleveled noise the moment the service sees real traffic.
5. **Add health and readiness endpoints.** A liveness check (process is
   up) and a readiness check (dependencies reachable) so orchestrators
   route and restart correctly (see health-checks); the difference
   matters the first time a dependency blips.
6. **Handle the process-level failures.** Register `unhandledRejection`
   and `uncaughtException` handlers that log and exit cleanly (a crashed
   process is better than a zombie in a bad state; let the orchestrator
   restart it), and never leave them unset (see js-error-handling).

## Boundaries

- This is the service skeleton; the framework choice (Express, Fastify,
  Hono, Nest) and the API design sit on top (see rest-endpoint-design,
  api-design). Pick the framework for the project, but the foundations
  above are framework-independent.
- Clustering and multi-core scaling (Node uses one core per process) is a
  deployment decision (a process manager or the orchestrator running N
  replicas), usually better than the in-process `cluster` module.
- Long CPU-bound work blocks the event loop and belongs in worker threads
  or a separate service, not the request path (see js-event-loop).

---
name: third-party-integration
description: Integrate an external service so its failures, changes, and limits do not become your outages. Use when adding a dependency on an API you do not control.
---

# Third-party integration

Every integration adds a system you cannot fix, deploy, or debug. The
design question is not how to call the API but what happens to your
product when it is slow, changed, or gone.

## Method

1. **Wrap it behind your own interface.** An adapter layer means a
   provider change touches one module rather than the codebase, and it
   makes testing possible without the provider.
2. **Decide what happens when it fails.** Degrade, queue, or fail the
   request. Deciding this at design time is what separates a degraded
   feature from an outage (see partial-failure-handling).
3. **Never call a third party synchronously in a critical path if you
   can avoid it.** Their latency becomes yours, and their outage becomes
   your downtime.
4. **Read the limits before building.** Rate limits, payload sizes,
   and quotas shape the design, and discovering them in production is
   expensive (see rate-limit-handling).
5. **Model their data into yours.** Storing their shape directly couples
   your schema to their versioning decisions (see data-mapping).
6. **Plan for their deprecations.** APIs change on their schedule, so
   subscribe to their changelog and know your upgrade path (see
   integration-migration).
7. **Keep credentials scoped and rotatable.** Integration credentials
   leak like any other and often have broad access (see
   api-credential-rotation).

## Boundaries

An integration inherits the provider's availability and security
posture, which becomes part of yours (see vendor-data-processing).
Building it yourself is occasionally cheaper than the integration's
lifetime maintenance. Contractual terms constrain usage in ways the API
does not enforce.

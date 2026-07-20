---
name: multi-tenancy
description: Isolate tenants in data, code, and capacity, choosing the right isolation model per tier. Use when designing SaaS data models or containing noisy-neighbor and cross-tenant risks.
---

# Multi-tenancy

Two failure classes define the design: a tenant seeing another's data
(catastrophic, reputational) and a tenant consuming another's capacity
(gradual, contractual). Address both explicitly.

## Method

1. **Choose the isolation model per tier, not ideologically.** Shared
   tables with tenant_id: cheapest, scales to millions of tenants.
   Schema-per-tenant: middling isolation, migration fan-out pain beyond
   hundreds. Database-per-tenant: strongest isolation and per-tenant
   restore, real cost; sell it as the enterprise tier. Mixing models
   (shared for small, dedicated for large) is normal.
2. **Enforce tenancy below the application when possible.** Postgres
   row-level security with `tenant_id = current_setting(...)`, set per
   request from the authenticated context, turns a forgotten WHERE
   clause from a breach into a bug. Without RLS: repository-layer
   scoping that raw queries cannot bypass, and no ORM escape hatches in
   handlers.
3. **Carry tenant context, never accept it.** Tenant comes from the
   auth token/session, flows through request context to queries, jobs,
   and logs. Any endpoint taking tenant_id as a parameter from the
   client is an IDOR generator (see authz-design).
4. **Scope everything tenant-shaped.** Object storage prefixes,
   cache keys, search indexes, queue messages (tenant in payload,
   re-asserted at consumption), rate limits, encryption keys where
   contracts demand it. Cross-tenant leaks love the secondary stores
   everyone forgets.
5. **Contain noisy neighbors with per-tenant budgets.** Rate limits and
   concurrency caps per tenant at the edge; fair-share scheduling in job
   queues (round-robin across tenants, not FIFO); statement timeouts so
   one tenant's pathological query cannot hold the pool. Track cost per
   tenant; the top one is always a surprise.
6. **Test isolation adversarially.** A standing test suite that
   authenticates as tenant A and attempts every endpoint against tenant
   B's IDs; run it in CI. One passing cross-tenant read is a sev-1, not
   a ticket.

## Boundaries

- Per-tenant schema or database migration fan-out needs orchestration
  (batching, canary tenants, stragglers report); do not adopt those
  models without building it.
- Tenant deletion and export are legal obligations (GDPR); shared-table
  models must prove complete deletion across all stores, which is a
  feature you build, not a script you improvise.
- In-process caches shared across requests are where tenant bleed hides;
  key them by tenant or scope them per request.

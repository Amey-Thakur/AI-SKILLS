---
name: environment-provisioning
description: Create development, preview, and staging environments that resemble production closely enough to be useful, and clean them up automatically. Use when environments drift, cost too much, or block testing.
---

# Environment provisioning

Environments that differ from production produce false confidence, and
environments that never expire produce large bills. Both problems are
solved by treating environments as disposable and generated rather than
maintained.

## Method

1. **Generate from the same definition as production.** Divergence
   accumulates in hand-maintained environments until testing means
   nothing (see infrastructure-as-code).
2. **Create ephemeral environments per change.** A preview environment
   per pull request tests the actual change in isolation (see
   pr-automation).
3. **Expire automatically.** Time-to-live on every non-production
   environment, since manual cleanup does not happen (see
   cloud-cost-optimization).
4. **Use realistic but safe data.** Anonymised or synthetic data that
   resembles production without carrying its obligations (see
   data-anonymization).
5. **Isolate environments properly.** Shared databases and queues
   between environments produce interference that presents as flaky
   tests (see flaky-test-management).
6. **Keep the local environment close too.** Developers running
   something meaningfully different from production find problems late
   (see local-development-setup).
7. **Make provisioning fast.** An environment taking an hour is one
   people avoid using, which defeats the purpose.

## Boundaries

Environments approximate production and never match it, particularly in
scale and data volume. Full-fidelity environments are expensive enough
that the trade is deliberate. Some behaviour only appears in production
and needs safe production testing (see canary-analysis).

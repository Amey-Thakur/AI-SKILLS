---
name: self-service-infrastructure
description: Let teams provision what they need within guardrails, without waiting for an infrastructure team to act. Use when provisioning requests queue and infrastructure work is reactive.
---

# Self-service infrastructure

Every ticket to provision something is a queue with a person at the end
of it. Self-service replaces the queue with automation and the approval
with policy, which is faster and, done properly, safer.

## Method

1. **Define guardrails as code.** Allowed regions, sizes, and
   configurations enforced automatically, so approval becomes policy
   evaluation rather than judgement (see policy-as-code).
2. **Make cost visible at the point of request.** Teams make different
   choices when the monthly figure appears beside the option (see
   cloud-cost-optimization).
3. **Provision with sensible defaults.** Encryption, backups, tagging,
   and network placement correct without the requester specifying them
   (see data-encryption).
4. **Require ownership metadata to provision.** Owner, purpose, and
   environment attached at creation, since untagged resources are
   unattributable later (see repository-permissions).
5. **Automate cleanup and expiry.** Temporary environments that expire
   by default prevent the accumulation that dominates cloud waste.
6. **Keep an approval path for the exceptional.** Requests outside the
   guardrails go to a human rather than being refused outright.
7. **Log every provisioning action.** Who created what, when, and why is
   the audit trail that self-service otherwise loses (see
   audit-logging).

## Boundaries

Self-service moves decisions to teams, which requires those teams to
understand the cost and security consequences. Guardrails encode current
policy and need maintenance. Some infrastructure is genuinely too
consequential to self-serve.

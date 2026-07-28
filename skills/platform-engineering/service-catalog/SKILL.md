---
name: service-catalog
description: Maintain an inventory of services with owners, dependencies, and operational metadata so questions about who owns what are answerable. Use when nobody can say who owns a service or what depends on it.
---

# Service catalog

Beyond a handful of services, the questions who owns this, what depends
on it, and who to page become unanswerable without a catalog. The
failure mode is a catalog that is manually maintained and therefore
wrong.

## Method

1. **Record ownership as the primary field.** A team, not an individual,
   since individuals leave and ownership must survive them (see
   code-owners).
2. **Generate from source where possible.** Metadata living with the
   code stays current, while a separately maintained registry drifts
   immediately.
3. **Capture dependencies in both directions.** What a service calls and
   what calls it, which is what makes impact analysis possible (see
   agent-dependency-manager).
4. **Include the operational essentials.** Runbook, dashboard, alerting
   destination, and tier, so an incident responder finds them in one
   place (see runbook-writing).
5. **Record lifecycle state.** Active, deprecated, or retired, because
   an unmarked dead service consumes attention indefinitely (see
   feature-sunsetting).
6. **Enforce registration at creation.** Provisioning that requires
   catalog entry is the only reliable way to keep coverage complete (see
   self-service-infrastructure).
7. **Audit against reality periodically.** Compare the catalog to
   running services, since the gap is where surprises live.

## Boundaries

A catalog records structure and does not enforce it. Manually maintained
catalogs are wrong within months, which is why generation matters.
Dependency data captured statically misses runtime coupling that only
observability reveals (see distributed-tracing).

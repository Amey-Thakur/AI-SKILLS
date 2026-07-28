---
name: integration-migration
description: Move between API versions or providers without downtime, using parallel running and staged cutover. Use when a provider deprecates a version or you are replacing a service.
---

# Integration migration

Provider deprecations arrive on their schedule regardless of your
roadmap. Migration is manageable when the integration was abstracted and
painful when their model leaked through your codebase.

## Method

1. **Start from the abstraction boundary.** A well-wrapped integration
   confines the change; a leaked one means touching everything (see
   third-party-integration).
2. **Compare behaviour, not just documentation.** Run both versions
   against the same inputs and diff the results, since undocumented
   behaviour differences are where migrations break.
3. **Run in parallel before cutting over.** Shadow the new integration
   without acting on its results to build confidence with real traffic
   (see canary-analysis).
4. **Migrate behind a flag with a rollback.** Percentage cutover with an
   immediate revert path, because the problems appear at volume (see
   feature-flags-hygiene).
5. **Plan data migration separately.** Identifiers, historical records,
   and stored references need their own migration and often outlive the
   API cutover (see data-mapping).
6. **Keep the old path until the new one is proven.** Deleting the
   fallback on cutover day removes the option you most need.
7. **Start early relative to the deadline.** Deprecation dates are firm
   and discovering a blocking incompatibility late leaves no options.

## Boundaries

Migration effort scales with how deeply the provider's model penetrated
your system. Some changes have no equivalent and force product changes.
Provider deadlines are not negotiable for most customers.

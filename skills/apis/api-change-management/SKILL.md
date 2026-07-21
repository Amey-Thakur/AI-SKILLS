---
name: api-change-management
description: Classify API changes as breaking or compatible, evolve additively, and gate breaking changes with compatibility tests. Use when changing an API and needing to know whether it breaks consumers.
---

# API change management

Every API change is either safe (compatible: consumers keep working)
or breaking (consumers break), and the single most valuable skill is
telling them apart reliably. Get the taxonomy right, default to
additive evolution, and enforce the classification with tests so a
breaking change cannot ship by accident.

## Method

1. **Know the breaking-change taxonomy cold.** Breaking:
   removing or renaming a field/endpoint/parameter,
   changing a type, making an optional parameter required,
   tightening validation, changing a default, changing error
   codes or response structure, and (the sneakiest)
   changing semantics without changing the shape (a field
   that now means something different). Compatible: adding
   optional fields, adding endpoints, adding enum values
   (if consumers treat enums as open), relaxing validation
   (see schema-evolution: the same taxonomy across data and
   APIs). When unsure, treat it as breaking.
2. **Default to additive evolution.** Add new fields,
   endpoints, and optional parameters rather than changing
   existing ones; this covers the large majority of API
   growth without breaking anyone and without needing a new
   version (see api-versioning: additive is how you avoid
   versioning most of the time). The discipline is finding
   the additive way to make a change.
3. **Beware the semantic breaking change.** The dangerous
   one passes every structural compatibility check: the
   field is the same type and name, but now includes
   refunds in the total, or returns local time instead of
   UTC. No automated check catches this; it requires human
   awareness and, when unavoidable, a new field or a
   version, never a silent redefinition (see schema-
   evolution's identical warning). This one causes the most
   surprising outages.
4. **Enforce the classification with compatibility tests.**
   Contract tests (see contract-testing, pact-verification)
   and schema-diff checks in CI that flag breaking changes
   before merge (a removed field in the OpenAPI spec fails
   the build: see openapi-contracts): so a breaking change
   is a deliberate, reviewed decision, not an accident
   someone discovers in production. The tooling makes the
   taxonomy enforceable.
5. **When you must break, version and migrate.** A genuine
   breaking change goes through versioning (see api-
   versioning) and deprecation (see api-deprecation): new
   version alongside old, migration path, usage tracking,
   timeline. Never break in place on a stable API; the
   compatibility promise is what lets consumers depend on
   you.
6. **Communicate every change at the right volume.**
   Compatible changes: changelog (see changelog-writing).
   Breaking changes: prominent notice, migration guide,
   direct contact for major consumers (see api-deprecation,
   roadmap-communication). The change's blast radius
   determines the communication effort; a quiet breaking
   change is an ambush.

## Boundaries

- The compatible/breaking line depends partly on how
  consumers are built: strict consumers break on additions
  they did not expect (a reason to publish consumer
  guidance: "ignore unknown fields", "treat enums as
  open"). Tolerant readers (see the robustness principle)
  make more changes safe.
- Internal APIs with coordinated deploys can make breaking
  changes by updating all consumers together (see api-
  versioning's internal-vs-external); the taxonomy still
  tells you *that* it is breaking, which is what you need
  to know to coordinate.
- This governs the API contract; the implementation behind
  it can change freely as long as the contract holds
  (that is the point of the contract: see openapi-
  contracts). Confusing internal refactors with API
  changes causes needless caution or needless breakage.

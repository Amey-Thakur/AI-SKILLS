---
name: schema-evolution
description: Evolve data schemas with compatibility rules, producer contracts, and registries so downstream never breaks silently. Use when changing event or table schemas that other teams consume.
---

# Schema evolution

A schema shared between producer and consumers is an API. The rules are
the same as any API: additive changes flow freely, breaking changes get
versions and migration windows, and enforcement beats etiquette.

## Method

1. **Classify every change before making it.** Compatible: adding
   optional/nullable fields with defaults, widening types
   (int to long), adding enum values consumers treat as open sets.
   Breaking: removing or renaming fields, retyping, tightening
   nullability, changing semantics without changing the name (the
   worst one, because nothing catches it). When unsure, treat it as
   breaking.
2. **Enforce compatibility mechanically.** A schema registry
   (Avro/Protobuf/JSON Schema) with backward-compatibility checks in
   the producer's CI: incompatible publishes fail the build, not the
   consumers at 3am. For warehouse tables, schema tests on staging
   models serve the same role (see data-quality-checks).
3. **Write the contract down with owners.** Each shared schema has:
   owning team, consumers list (or a registry that tracks them),
   guaranteed fields vs internal ones, and the deprecation process.
   Data contracts formalize what "you broke our dashboard" arguments
   litigate after the fact.
4. **Break with a version and a bridge.** New schema version published
   alongside the old (v2 topic, versioned event type, new table),
   producer dual-writes or a pipeline translates old-to-new during the
   migration window, consumers migrate on their schedule with a
   deadline, usage measured before the old version dies (the
   api-versioning sunset playbook, applied to data).
5. **Make consumers evolution-tolerant.** Read by field name, ignore
   unknown fields, treat enums as open, and never `SELECT *` into
   downstream tables (column order and additions become your problem).
   Tolerant readers turn most producer changes into non-events.
6. **Propagate deliberately through the stack.** A source change flows
   raw, staging, marts: land new fields in raw automatically, add to
   staging explicitly, expose in marts as a reviewed change. Lineage
   (see data-lineage) answers "who is affected"; the impact list turns
   a schema change from a surprise into a checklist.

## Boundaries

- Semantic drift (same field, new meaning: "revenue" now includes
  refunds) passes every compatibility check and corrupts every
  consumer; it requires a new field name or a coordinated restatement,
  never a silent redefinition.
- OLTP migrations inside one service own their tables
  (see database-migrations); this skill governs schemas that cross
  team boundaries.
- Registries and contracts do not replace talking to your top
  consumers before a big change; the tooling enforces the floor, not
  the courtesy.

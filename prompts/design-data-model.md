---
name: design-data-model
description: Design a data model from access patterns and invariants, with the constraints that keep it correct.
variables:
  - "{domain}: the entities, their relationships, and the rules that must always hold"
  - "{access}: how the data will be read and written, and at what volume"
settings: "Temperature 0.3."
---

Design a data model for:

{domain}

Access patterns: {access}

Use schema-design, database-normalization, and indexing-strategy.

Produce:
- Entities, attributes, and relationships with cardinality.
- Keys, and what makes each row unique.
- Constraints that enforce the invariants in the database rather than in
  application code.
- Indexes derived from the stated access patterns.
- Where you would denormalise and what that costs.
- What this model makes hard, so the trade is visible.

Rules: enforce invariants in the schema where the database can. State the
nullability of every column deliberately. Do not add indexes speculatively.
Name what future requirement would force a restructure.

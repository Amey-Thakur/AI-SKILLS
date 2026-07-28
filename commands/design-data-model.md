---
description: "Design a data model from access patterns and invariants, with the constraints that keep it correct."
argument-hint: "[domain]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

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

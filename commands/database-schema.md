---
description: "Design a database schema from requirements with sensible tables, keys, relationships, indexes, and constraints."
argument-hint: "[requirements]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Design a database schema for: {requirements}

Database and context: {database}

Produce:
1. The tables (or collections), each with columns, types, and a primary key.
   Model the entities and their relationships from the domain.
2. The relationships: foreign keys and cardinality (one-to-many, many-to-many
   with a join table), with the referential-integrity constraints.
3. Constraints that enforce correctness at the data layer: NOT NULL, UNIQUE,
   CHECK, defaults, enums. Let the database protect its own invariants.
4. Indexes for the queries this schema will actually serve: index the columns
   used in WHERE, JOIN, and ORDER BY for the common access patterns (say what
   they are), and note the write cost so you do not over-index.
5. The DDL (CREATE TABLE statements) for the chosen database, ready to run or
   adapt.

Rules: normalize to avoid update anomalies, then denormalize deliberately only
where a real read pattern justifies it (say why). Design from the access
patterns, not just the entities: the queries you must serve shape the indexes
and sometimes the tables. Choose types precisely (right integer size, timestamp
with time zone, decimal for money not float). For NoSQL, design around the
access patterns first (single-table/denormalized as the store demands). Flag
scale concerns (a column that will need partitioning, a hot table) and where
requirements are ambiguous.

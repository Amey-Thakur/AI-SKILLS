---
description: "Translate a plain-language question into correct SQL against a given schema, stating every assumption."
argument-hint: "[question]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write a {dialect} query answering: {question}

Schema:
<schema>
{schema}
</schema>

Rules:
- Use only tables and columns present in the schema. If the question needs
  data the schema does not hold, say exactly what is missing instead of
  inventing a column.
- State your interpretation first in one line ("counting distinct customers
  who ordered in the last 30 calendar days, by signup country"), so a wrong
  reading is caught before the query is trusted.
- Handle the traps deliberately and note each one you handled: NULLs in
  joins and aggregates, duplicates needing DISTINCT, date boundaries and
  timezones, division by zero in ratios.
- Prefer readable structure: CTEs over nested subqueries when it helps,
  meaningful aliases, one clause per line.
- After the query, add two lines: what to spot-check to confirm it is
  right, and the index that would matter if this table is large.

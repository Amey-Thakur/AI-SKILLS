---
name: sql-injection-defense
description: Eliminate SQL injection by sending data as bound parameters instead of concatenated query text, and auditing every raw-SQL escape hatch. Use when writing or reviewing code that builds database queries from variables.
---

# SQL injection defense

SQL injection persists because building a query with string concatenation
feels natural and works in every demo. The fix is not smarter escaping: it
is refusing to put data in the query string at all. Send the query and the
data on separate channels and the whole class disappears.

## Method

1. **Use parameterized queries for every value, always.** Write
   `WHERE email = ?` or `WHERE email = %s` / `:email` and pass the value as
   a bound parameter. The driver sends SQL and data separately, so input can
   never change the query's structure. This is the entire defense; the rest
   is enforcing it.
2. **Never concatenate or interpolate user data into SQL.**
   `f"... WHERE id = {id}"`, `"... = '" + name + "'"`, and template literals
   into a query are the bug. Ban them in review. Manual escaping and quoting
   are not a substitute: you will miss a code path or an encoding.
3. **Parameterize through the ORM, and audit its escape hatches.** Prefer
   the query builder (`User.objects.filter(email=x)`,
   `session.query(...).filter(User.email == x)`). Then grep the raw doors:
   `.raw(`, `execute(`, `text(`, `.extra(`, `sequelize.query`, `knex.raw`.
   Each raw call must still bind parameters, not format a string.
4. **Parameterize identifiers differently from values.** Placeholders bind
   values, not table or column names or `ASC`/`DESC`. When a column or sort
   direction comes from input, match it against a hardcoded allowlist of
   legal names; never interpolate it raw.
5. **Grant the app database account least privilege.** The runtime user
   needs `SELECT/INSERT/UPDATE/DELETE` on its own tables, not `DROP`,
   `GRANT`, or other schemas. Least privilege caps the blast radius when a
   query is compromised through some other flaw.
6. **Add a lint gate against string-built SQL.** Turn on a rule (Bandit
   B608, a Semgrep sql-injection pattern, CodeQL) in CI that flags formatted
   query strings. A rule catches the regression a reviewer skims past at
   5 p.m.

## Litmus tests

- Does every query send user data as a bound parameter, with zero values in
  the SQL text?
- Have you grepped for raw-query methods and confirmed each still binds?
- Are dynamic column and sort inputs checked against an allowlist rather
  than interpolated?

## Boundaries

This skill covers relational SQL. NoSQL query injection (MongoDB `$where`,
JSON operators) follows the same principle with different mechanics. Stored
procedures help only if they use parameters internally; dynamic SQL built
inside a procedure is just as vulnerable.

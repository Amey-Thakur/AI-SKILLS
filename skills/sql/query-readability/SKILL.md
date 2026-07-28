---
name: query-readability
description: Write SQL other people can review, modify, and trust, with clear structure, meaningful aliases, and stated assumptions. Use when a query will be read again by anyone, including you.
---

# Query readability

SQL is read far more than written, and unreadable SQL is where wrong
results hide. Readability is not decoration here: the reason a bug
survives review is usually that nobody could hold the query in their
head long enough to see it.

## Method

1. **State the grain in a comment at the top.** One line saying what one
   row of the result represents orients every later reader and catches
   errors during review.
2. **Alias tables meaningfully.** Short is fine, cryptic is not:
   customers c reads well, t1 does not, and single letters collapse once
   a query joins six tables.
3. **Format for scanning.** One clause per line, joins with their ON
   conditions together, and consistent capitalisation. The point is that
   a reviewer can see the shape without parsing it.
4. **Name intermediate steps with CTEs.** A staged query reads
   top-down and each stage can be run alone, which is what makes review
   and debugging possible (see common-table-expressions).
5. **Comment the non-obvious filter, not the syntax.** Explain why a
   status is excluded or a date is shifted, since that is the knowledge
   that leaves with whoever wrote it.
6. **Prefer explicit over clever.** An extra join that reads plainly
   beats a nested correlated subquery that saves three lines, because
   the next change is made by someone in a hurry.

## Boundaries

- Readability serves review and maintenance; it does not substitute for
  verifying results against the source (see sql-joins).
- Formatting preferences differ, and consistency inside a codebase
  matters more than which style won.
- The clearest form is occasionally not the fastest, and a deliberate
  performance rewrite deserves a comment explaining why (see
  sql-optimization).

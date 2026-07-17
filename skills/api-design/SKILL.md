---
name: api-design
description: Design HTTP and library APIs that are predictable, hard to misuse, and stable under growth. Use when creating or reviewing endpoints, public functions, or wire formats.
---

# API design

An API is a promise you keep for years. Design for the caller you cannot
see, then keep the promise boring.

## Method

1. **Start from the caller's sentence.** Write the code or request the
   caller *wants* to make, before any implementation exists: `POST
   /notebooks/{id}/share` or `client.notebooks.share(id)`. If the ideal call
   is awkward to say, the design is wrong at the root.
2. **Name by domain, shape by convention.** Nouns for resources, verbs for
   actions that are not CRUD. Same word for the same concept everywhere —
   an API where "document", "file", and "source" mean one thing teaches
   distrust of every name.
3. **Make the common case one call** with obvious defaults, and the rare
   case possible with explicit options. Never make every caller pay a
   configuration tax for flexibility one caller needs.
4. **Errors are API.** Every failure a caller can cause gets a distinct,
   documented, stable error with: what went wrong, on which input, and what
   to do. A caller should distinguish "you sent garbage" (4xx / typed
   error), "we broke" (5xx), and "try later" without parsing prose.
5. **Design for the invalid states not to exist.** Required pairs travel in
   one object; mutually exclusive options are one enum, not three booleans;
   ids that must belong together are validated together. If misuse compiles
   or returns 200, it will ship.
6. **Version from day one, break never.** Additive change is free (new
   optional field, new endpoint). Breaking change (rename, meaning change,
   removal) needs a version and a deprecation window. Before renaming a
   field, remember: someone wrote a cron job against it.
7. **Paginate every list, bound every input.** Unbounded responses and
   unbounded request sizes are outages on a delay.

## Litmus tests

- Can a caller learn the API from one example call plus type/shape
  signatures, without reading your source?
- Is every operation idempotent that safely can be, and documented where it
  cannot?
- Could you delete the docs page for defaults and have callers unaffected?

## Boundaries

Consistency with the existing API's conventions beats abstract elegance —
one surprising-but-uniform surface is kinder than a half-migrated ideal.
Note the inconsistency you would fix, then follow the house style.
